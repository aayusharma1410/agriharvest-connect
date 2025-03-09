
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  cropType: z.string().min(2, { message: 'Crop type is required' }),
  quantity: z.string().min(1, { message: 'Quantity is required' }).refine((val) => !isNaN(Number(val)) && Number(val) > 0, { message: 'Must be a positive number' }),
  pickupLocation: z.string().min(2, { message: 'Pickup location is required' }),
  deliveryLocation: z.string().min(2, { message: 'Delivery location is required' }),
  pickupDate: z.string().min(2, { message: 'Pickup date is required' }),
});

const TransportationForm = ({ onSuccess }: { onSuccess: (data: any) => void }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropType: '',
      quantity: '',
      pickupLocation: '',
      deliveryLocation: '',
      pickupDate: '',
    },
  });
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const quantityValue = parseFloat(data.quantity);
      
      // Determine vehicle type needed based on quantity
      let requiredVehicleType = '';
      if (quantityValue <= 1.5) {
        requiredVehicleType = 'Pickup Truck';
      } else if (quantityValue <= 5) {
        requiredVehicleType = 'Medium Truck';
      } else if (quantityValue <= 10) {
        requiredVehicleType = 'Large Truck';
      } else {
        requiredVehicleType = 'Semi-Trailer';
      }
      
      // Fetch transportation providers
      const { data: providers, error } = await supabase
        .from('transportation_providers')
        .select('*')
        .order('capacity', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      // Check if data is an array and has items
      if (!Array.isArray(providers) || providers.length === 0) {
        throw new Error('No transportation providers found');
      }
      
      // Find the best matches based on capacity and vehicle type
      const suitableProviders = providers.filter(provider => {
        // If provider has capacity info, check if it's sufficient
        if (provider.capacity && provider.capacity >= quantityValue) {
          return true;
        }
        
        // If vehicle type matches what we need
        if (provider.vehicle_type && provider.vehicle_type.includes(requiredVehicleType)) {
          return true;
        }
        
        // For refrigerated crops
        if (data.cropType.toLowerCase().includes('fruit') || 
            data.cropType.toLowerCase().includes('vegetable') ||
            data.cropType.toLowerCase().includes('dairy')) {
          return provider.vehicle_type && provider.vehicle_type.includes('Refrigerated');
        }
        
        return false;
      });
      
      // Sort by suitability (based on capacity match and rates)
      const sortedProviders = suitableProviders.sort((a, b) => {
        // Prioritize providers with capacity close to what we need
        if (a.capacity && b.capacity) {
          const aDiff = Math.abs(a.capacity - quantityValue);
          const bDiff = Math.abs(b.capacity - quantityValue);
          return aDiff - bDiff;
        }
        return 0;
      });
      
      // Get top 5 providers or all if fewer
      const recommendedProviders = sortedProviders.slice(0, 5);
      
      // If we found suitable providers
      if (recommendedProviders.length > 0) {
        toast({
          title: "Found suitable transportation providers",
          description: `${recommendedProviders.length} providers match your requirements.`,
        });
        onSuccess({
          formData: data,
          providers: recommendedProviders,
        });
      } else {
        // If no suitable providers, return all providers
        toast({
          title: "No exact matches found",
          description: "Showing all available providers instead.",
        });
        onSuccess({
          formData: data,
          providers: providers.slice(0, 5),
        });
      }
    } catch (error) {
      console.error('Error finding transportation providers:', error);
      toast({
        title: "Error",
        description: "Failed to find transportation providers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Transportation Request</CardTitle>
        <CardDescription>Enter your crop and transportation details to find the best provider.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cropType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Rice, Wheat, Vegetables" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity (in tons)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder="5.0" {...field} />
                    </FormControl>
                    <FormDescription>How many tons need to be transported</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pickupLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jaipur, Rajasthan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="deliveryLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Delhi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="pickupDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full md:w-auto" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding providers...
                </>
              ) : (
                'Find Transportation Providers'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TransportationForm;
