
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Calendar, User, Warehouse, Leaf, Scale } from 'lucide-react';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BookStorageModalProps {
  isOpen: boolean;
  onClose: () => void;
  facility: {
    id: string;
    name: string;
    location: string;
    capacity: number | null;
  } | null;
  storageDetails: {
    cropType: string;
    quantity: string;
    startDate: string;
    endDate: string;
  } | null;
  recommendedSchemes?: Array<{
    id: string;
    name: string;
  }>;
}

const BookStorageModal = ({ 
  isOpen, 
  onClose, 
  facility, 
  storageDetails,
  recommendedSchemes = []
}: BookStorageModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<string>('');
  
  const handleBooking = async () => {
    if (!facility || !storageDetails) return;
    
    setLoading(true);
    try {
      // Get user ID from session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('You must be logged in to book storage');
      }
      
      // Create booking record
      const { error } = await supabase
        .from('storage_bookings')
        .insert({
          user_id: session.user.id,
          storage_facility_id: facility.id,
          start_date: storageDetails.startDate,
          end_date: storageDetails.endDate,
          crop_type: storageDetails.cropType,
          quantity: parseFloat(storageDetails.quantity),
          government_scheme_id: selectedScheme || null
        });
        
      if (error) throw error;
      
      toast({
        title: "Booking successful",
        description: `Your storage booking with ${facility.name} has been confirmed.`,
      });
      
      onClose();
    } catch (error: any) {
      console.error('Error booking storage:', error);
      toast({
        title: "Booking failed",
        description: error.message || "Failed to book storage. Please try again.",
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
          <DialogTitle>Confirm Storage Booking</DialogTitle>
          <DialogDescription>
            Review your storage booking details before confirming.
          </DialogDescription>
        </DialogHeader>
        
        {facility && storageDetails && (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-semibold flex items-center gap-2">
                <Warehouse className="h-4 w-4 text-muted-foreground" />
                Facility:
              </div>
              <div>{facility.name}</div>
              
              <div className="font-semibold flex items-center gap-2">
                <Leaf className="h-4 w-4 text-muted-foreground" />
                Crop Type:
              </div>
              <div>{storageDetails.cropType}</div>
              
              <div className="font-semibold flex items-center gap-2">
                <Scale className="h-4 w-4 text-muted-foreground" />
                Quantity:
              </div>
              <div>{storageDetails.quantity} tons</div>
              
              <div className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Start Date:
              </div>
              <div>{format(new Date(storageDetails.startDate), 'PPP')}</div>
              
              <div className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                End Date:
              </div>
              <div>{format(new Date(storageDetails.endDate), 'PPP')}</div>
            </div>
            
            {recommendedSchemes.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="font-medium text-sm flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Apply with Government Scheme (Optional)
                </label>
                <Select value={selectedScheme} onValueChange={setSelectedScheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a government scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No scheme</SelectItem>
                    {recommendedSchemes.map(scheme => (
                      <SelectItem key={scheme.id} value={scheme.id}>
                        {scheme.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Applying with a government scheme may provide subsidies or benefits.
                </p>
              </div>
            )}
            
            <p className="text-sm text-muted-foreground pt-2">
              By confirming, you'll receive a booking confirmation and the facility will contact you with further details.
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

export default BookStorageModal;
