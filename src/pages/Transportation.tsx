
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TransportationForm from '@/components/TransportationForm';
import TransportationProviderCard from '@/components/TransportationProviderCard';
import BookTransportationModal from '@/components/BookTransportationModal';
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
      
      // Filter and sort providers based on form data
      // This is a simple example - you can make this more sophisticated
      const filteredProviders = providers
        .filter(provider => {
          // If provider has a service area, check if it includes pickup or delivery location
          if (provider.service_area) {
            // Simple string match - could be improved with more sophisticated matching
            return provider.service_area.toLowerCase().includes(formData.pickupLocation.toLowerCase()) || 
                  provider.service_area.toLowerCase().includes(formData.deliveryLocation.toLowerCase());
          }
          return true; // If no service area specified, include in results
        })
        .sort((a, b) => {
          // Sort by capacity if we have quantity data
          const quantityValue = parseFloat(formData.quantity);
          const aCapDiff = a.capacity ? Math.abs(a.capacity - quantityValue) : 1000;
          const bCapDiff = b.capacity ? Math.abs(b.capacity - quantityValue) : 1000;
          return aCapDiff - bCapDiff;
        });
      
      // If we don't have any matches after filtering, show all providers
      const finalProviders = filteredProviders.length > 0 ? filteredProviders : providers;
      
      // Set the results
      setResults({
        formData,
        providers: finalProviders,
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
          service_area: "Delhi, Punjab, Haryana"
        },
        {
          id: "2",
          name: "AgriTrans Solutions",
          contact_info: "+91 87654 32109",
          vehicle_type: "Heavy Duty Truck",
          capacity: 20,
          rates: "₹18 per km",
          service_area: "Maharashtra, Gujarat, Karnataka"
        },
        {
          id: "3",
          name: "Rural Route Carriers",
          contact_info: "+91 76543 21098",
          vehicle_type: "Medium Truck",
          capacity: 8,
          rates: "₹15 per km",
          service_area: "Uttar Pradesh, Bihar, Madhya Pradesh"
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
