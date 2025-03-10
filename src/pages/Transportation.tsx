
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TransportationForm from '@/components/TransportationForm';
import TransportationProviderCard from '@/components/TransportationProviderCard';
import BookTransportationModal from '@/components/BookTransportationModal';
import GovernmentSchemeRecommendations from '@/components/GovernmentSchemeRecommendations';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Transportation = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<{
    formData: any;
    providers: any[];
  } | null>(null);
  
  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    provider: null as any,
  });
  
  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState<any[]>([]);
  
  const handleFormSuccess = async (formData: any) => {
    // Show loading state
    setLoading(true);
    console.log("Form success data:", formData);
    
    try {
      // Fetch transportation providers from Supabase
      const { data: providers, error } = await supabase
        .from('transportation_providers')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (!providers || providers.length === 0) {
        throw new Error("No transportation providers found");
      }
      
      console.log("Fetched providers:", providers);
      
      // Extract relevant locations for filtering
      const pickupLocation = formData.pickupLocation.toLowerCase();
      const deliveryLocation = formData.deliveryLocation.toLowerCase();
      const cropType = formData.cropType.toLowerCase();
      const quantityValue = parseFloat(formData.quantity) || 0;
      
      // Filter and score providers based on multiple criteria
      const scoredProviders = providers.map(provider => {
        let score = 0;
        const serviceArea = (provider.service_area || "").toLowerCase();
        
        // Location match scoring
        if (serviceArea.includes(pickupLocation)) score += 10;
        if (serviceArea.includes(deliveryLocation)) score += 10;
        
        // Capacity match scoring
        const capacityDiff = provider.capacity ? Math.abs(provider.capacity - quantityValue) : 1000;
        score += (1000 - capacityDiff) / 100; // Higher score for closer capacity match
        
        // Vehicle type scoring for crop type
        const vehicleType = (provider.vehicle_type || "").toLowerCase();
        if ((cropType === "fruits" || cropType === "vegetables") && 
            (vehicleType.includes("refrigerated") || vehicleType.includes("cold"))) {
          score += 15; // Refrigerated vehicles are better for perishables
        }
        
        if ((cropType === "grains" || cropType === "cereals" || cropType === "pulses") && 
            (vehicleType.includes("heavy") || vehicleType.includes("large"))) {
          score += 10; // Heavy duty vehicles are better for grains
        }
        
        return {
          ...provider,
          score,
          // Add fields for UI display
          isSuitable: score > 10,
        };
      });
      
      // Sort by score (highest first)
      const sortedProviders = scoredProviders.sort((a, b) => b.score - a.score);
      
      // Fetch relevant government schemes for transportation
      const { data: schemesData, error: schemesError } = await supabase
        .from('government_schemes')
        .select('*')
        .or(`state.eq.All India,state.ilike.%${pickupLocation}%,state.ilike.%${deliveryLocation}%`)
        .order('category');
        
      if (schemesError) {
        console.error("Error fetching schemes:", schemesError);
      } else {
        // Filter schemes by relevance to transportation and crop type
        const relevantSchemes = schemesData.filter(scheme => {
          const isTransportScheme = 
            scheme.category.toLowerCase().includes('transport') || 
            scheme.description.toLowerCase().includes('transport') ||
            scheme.description.toLowerCase().includes('logistics') ||
            scheme.description.toLowerCase().includes('supply chain');
            
          const matchesCropType = 
            scheme.description.toLowerCase().includes(cropType) ||
            scheme.category.toLowerCase().includes(cropType);
            
          return isTransportScheme || matchesCropType;
        });
        
        setSchemes(relevantSchemes.slice(0, 6)); // Limit to top 6 most relevant schemes
      }
      
      // Set the results
      setResults({
        formData,
        providers: sortedProviders,
      });
      
      // Add a small delay before scrolling to ensure the results are rendered
      setTimeout(() => {
        window.scrollTo({ top: document.getElementById('results')?.offsetTop || 0, behavior: 'smooth' });
      }, 100);
      
    } catch (error: any) {
      console.error("Error finding transportation providers:", error);
      toast.error(`Error finding transportation providers: ${error.message}`);
      
      // Use sample data as fallback if database fetch fails
      const sampleProviders = [
        {
          id: "1",
          name: "FastTrack Logistics",
          contact_info: "+91 98765 43210",
          vehicle_type: "Refrigerated Truck",
          capacity: 10,
          rates: "₹20 per km",
          service_area: "Delhi, Punjab, Haryana",
          score: 25,
          isSuitable: true
        },
        {
          id: "2",
          name: "AgriTrans Solutions",
          contact_info: "+91 87654 32109",
          vehicle_type: "Heavy Duty Truck",
          capacity: 20,
          rates: "₹18 per km",
          service_area: "Maharashtra, Gujarat, Karnataka",
          score: 20,
          isSuitable: true
        },
        {
          id: "3",
          name: "Rural Route Carriers",
          contact_info: "+91 76543 21098",
          vehicle_type: "Medium Truck",
          capacity: 8,
          rates: "₹15 per km",
          service_area: "Uttar Pradesh, Bihar, Madhya Pradesh",
          score: 15,
          isSuitable: true
        }
      ];
      
      setResults({
        formData,
        providers: sampleProviders,
      });
      
      // Add a small delay before scrolling even with sample data
      setTimeout(() => {
        window.scrollTo({ top: document.getElementById('results')?.offsetTop || 0, behavior: 'smooth' });
      }, 100);
    } finally {
      setLoading(false);
    }
  };
  
  const handleBookTransport = (providerId: string) => {
    const provider = results?.providers.find(p => p.id === providerId);
    if (provider) {
      setBookingModal({
        isOpen: true,
        provider,
      });
    }
  };
  
  const closeBookingModal = () => {
    setBookingModal({
      isOpen: false,
      provider: null,
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Debug log to verify results are being set correctly
  useEffect(() => {
    if (results) {
      console.log("Results updated:", results);
    }
  }, [results]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-6 px-4 md:px-6 mt-16">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2" 
            onClick={handleGoBack}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Agricultural Transportation</h1>
            <p className="text-muted-foreground">
              Find reliable transportation services for your crops and agricultural products
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Find Transportation</h2>
            <TransportationForm onSuccess={handleFormSuccess} />
          </div>
          
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
            </div>
          )}
          
          {results && results.providers && results.providers.length > 0 && !loading && (
            <div id="results" className="animate-fade-in">
              {schemes.length > 0 && (
                <GovernmentSchemeRecommendations schemes={schemes} />
              )}
            
              <h2 className="text-xl font-semibold mb-4">Recommended Transportation Providers</h2>
              <p className="text-muted-foreground mb-6">
                Based on your requirements, here are the best transportation providers for your needs
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.providers.map((provider) => (
                  <TransportationProviderCard
                    key={provider.id}
                    provider={provider}
                    formData={results.formData}
                    onBook={handleBookTransport}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        <BookTransportationModal
          isOpen={bookingModal.isOpen}
          onClose={closeBookingModal}
          provider={bookingModal.provider}
          formData={results?.formData || null}
        />
      </div>
    </>
  );
};

export default Transportation;
