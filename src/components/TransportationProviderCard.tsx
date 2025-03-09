
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Truck, MapPin, PhoneCall, Weight, Tag } from 'lucide-react';

interface TransportationProviderProps {
  provider: {
    id: string;
    name: string;
    contact_info: string;
    vehicle_type: string | null;
    capacity: number | null;
    rates: string | null;
    service_area: string | null;
  };
  formData: {
    cropType: string;
    quantity: string;
    pickupLocation: string;
    deliveryLocation: string;
    pickupDate: string;
  };
  onBook: (providerId: string) => void;
}

const TransportationProviderCard = ({ provider, formData, onBook }: TransportationProviderProps) => {
  // Calculate a match score (just for UI purposes)
  const getMatchPercentage = () => {
    let score = 80; // Base score
    
    // Adjust based on capacity vs required quantity
    if (provider.capacity) {
      const quantityValue = parseFloat(formData.quantity);
      const capacityDifference = provider.capacity - quantityValue;
      
      // If capacity is just right (within 1 ton over what's needed)
      if (capacityDifference >= 0 && capacityDifference <= 1) {
        score += 15;
      } 
      // If capacity is way more than needed
      else if (capacityDifference > 1) {
        score -= Math.min(10, capacityDifference); // Decrease score for excessive capacity
      }
      // If capacity is less than needed
      else {
        score -= 20; // Major penalty for insufficient capacity
      }
    }
    
    // Boost score if service area includes pickup or delivery location
    if (provider.service_area) {
      if (provider.service_area.includes(formData.pickupLocation) ||
          provider.service_area.includes(formData.deliveryLocation)) {
        score += 10;
      }
    }
    
    // Cap the score between 60 and 98
    return Math.min(98, Math.max(60, score));
  };
  
  const matchScore = getMatchPercentage();
  
  // Determine badge color based on match score
  const getBadgeVariant = () => {
    if (matchScore >= 90) return "default";
    if (matchScore >= 80) return "secondary";
    return "outline";
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{provider.name}</CardTitle>
            <CardDescription className="mt-1">
              {provider.vehicle_type || "Standard Transport"}
            </CardDescription>
          </div>
          <Badge variant={getBadgeVariant()}>
            {matchScore}% Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-muted-foreground" />
            <span>
              {provider.vehicle_type || "Standard Vehicle"} - Capacity: {provider.capacity || "N/A"} tons
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span>{provider.rates || "Contact for rates"}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{provider.service_area || "National service"}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <PhoneCall className="h-4 w-4 text-muted-foreground" />
            <span>{provider.contact_info}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onBook(provider.id)}>
          Book Transport
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransportationProviderCard;
