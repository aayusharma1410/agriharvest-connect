
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransportationForm from '@/components/TransportationForm';
import TransportationProviderCard from '@/components/TransportationProviderCard';
import BookTransportationModal from '@/components/BookTransportationModal';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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
  
  const handleFormSuccess = (data: any) => {
    setResults(data);
    window.scrollTo({ top: document.getElementById('results')?.offsetTop || 0, behavior: 'smooth' });
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

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
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
        
        {results && results.providers.length > 0 && (
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
        
        <BookTransportationModal
          isOpen={bookingModal.isOpen}
          onClose={closeBookingModal}
          provider={bookingModal.provider}
          formData={results?.formData || null}
        />
      </div>
    </div>
  );
};

export default Transportation;
