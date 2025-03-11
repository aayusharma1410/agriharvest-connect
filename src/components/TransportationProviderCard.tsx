
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
import { Calendar, Truck, MapPin, PhoneCall, Weight, Tag, Shield, Check } from 'lucide-react';

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
  recommendedSchemes?: Array<{id: string, name: string}>;
}

const TransportationProviderCard = ({ provider, formData, onBook, recommendedSchemes }: TransportationProviderProps) => {
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
  
  // Determine if provider specializes in certain crops
  const getSpecialization = () => {
    if (!provider.vehicle_type) return null;
    
    const vehicleType = provider.vehicle_type.toLowerCase();
    const cropType = formData.cropType.toLowerCase();
    
    if ((cropType === "fruits" || cropType === "vegetables") && 
        (vehicleType.includes("refrigerated") || vehicleType.includes("cold"))) {
      return "Perishable Goods";
    }
    
    if (cropType === "grains" && vehicleType.includes("heavy")) {
      return "Bulk Grains";
    }
    
    if (cropType === "spices" && vehicleType.includes("spice")) {
      return "Spice Transport";
    }
    
    return null;
  };
  
  const specialization = getSpecialization();
  
  // Check if any government schemes apply to this provider (based on location or vehicle type)
  const hasApplicableSchemes = recommendedSchemes && recommendedSchemes.length > 0;

  return (
    <Card className="w-full h-full shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{provider.name}</CardTitle>
            <CardDescription className="mt-1">
              {provider.vehicle_type || "Standard Transport"}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge variant={getBadgeVariant()}>
              {matchScore}% Match
            </Badge>
            {specialization && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                {specialization} Specialist
              </Badge>
            )}
          </div>
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
          
          {hasApplicableSchemes && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium">Eligible for subsidy schemes</span>
              </div>
              {recommendedSchemes && recommendedSchemes.length > 0 && (
                <div className="mt-1 text-xs text-muted-foreground">
                  Government support available through applicable schemes
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-primary hover:bg-primary/90" 
          onClick={() => onBook(provider.id)}
        >
          Book Transport
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransportationProviderCard;
