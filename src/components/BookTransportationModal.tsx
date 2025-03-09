
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface BookTransportationModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: {
    id: string;
    name: string;
  } | null;
  formData: {
    cropType: string;
    quantity: string;
    pickupLocation: string;
    deliveryLocation: string;
    pickupDate: string;
  } | null;
}

const BookTransportationModal = ({ 
  isOpen, 
  onClose, 
  provider, 
  formData 
}: BookTransportationModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleBooking = async () => {
    if (!provider || !formData) return;
    
    setLoading(true);
    try {
      // Get user ID from session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('You must be logged in to book transportation');
      }
      
      // Create booking record
      const { error } = await supabase
        .from('transportation_bookings')
        .insert({
          user_id: session.user.id,
          transportation_provider_id: provider.id,
          pickup_location: formData.pickupLocation,
          delivery_location: formData.deliveryLocation,
          pickup_date: formData.pickupDate,
          crop_type: formData.cropType,
          quantity: parseFloat(formData.quantity),
          status: 'pending'
        });
        
      if (error) throw error;
      
      toast({
        title: "Booking successful",
        description: `Your booking with ${provider.name} has been confirmed.`,
      });
      
      onClose();
    } catch (error: any) {
      console.error('Error booking transportation:', error);
      toast({
        title: "Booking failed",
        description: error.message || "Failed to book transportation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Transportation Booking</DialogTitle>
          <DialogDescription>
            Review your transportation booking details before confirming.
          </DialogDescription>
        </DialogHeader>
        
        {provider && formData && (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-semibold">Provider:</div>
              <div>{provider.name}</div>
              
              <div className="font-semibold">Crop Type:</div>
              <div>{formData.cropType}</div>
              
              <div className="font-semibold">Quantity:</div>
              <div>{formData.quantity} tons</div>
              
              <div className="font-semibold">Pickup Location:</div>
              <div>{formData.pickupLocation}</div>
              
              <div className="font-semibold">Delivery Location:</div>
              <div>{formData.deliveryLocation}</div>
              
              <div className="font-semibold">Pickup Date:</div>
              <div>{formData.pickupDate}</div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              By confirming, you'll receive a booking confirmation and the provider will contact you with further details.
            </p>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleBooking} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm Booking'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookTransportationModal;
