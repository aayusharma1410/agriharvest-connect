
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Store, Phone, Tag, Calendar, Info, Thermometer, Droplets, Check, BookOpen } from 'lucide-react';

interface StorageFacilityCardProps {
  facility: {
    id: string;
    name: string;
    location: string;
    description: string | null;
    contact_info: string | null;
    capacity: number | null;
    price_range?: string;
  };
  onViewDetails: (facilityId: string) => void;
  onBook: (facilityId: string) => void;
}

const StorageFacilityCard = ({ facility, onViewDetails, onBook }: StorageFacilityCardProps) => {
  // Determine facility type from name or description for badge
  const getFacilityType = () => {
    const name = facility.name.toLowerCase();
    const desc = (facility.description || '').toLowerCase();
    
    if (name.includes('cold') || desc.includes('cold') || name.includes('refrigerated') || desc.includes('refrigerated')) {
      return 'Cold Storage';
    }
    if (name.includes('warehouse') || desc.includes('warehouse')) {
      return 'Warehouse';
    }
    if (name.includes('silo') || desc.includes('silo')) {
      return 'Silo';
    }
    return 'General Storage';
  };

  // Format price range or provide default
  const getPriceRange = () => {
    return facility.price_range || "₹1,000 - ₹5,000 per ton/month";
  };
  
  // Determine if facility has high availability based on capacity
  const hasHighAvailability = () => {
    return facility.capacity && facility.capacity > 500;
  };
  
  // Check for amenities based on description and name
  const getAmenities = () => {
    const name = facility.name.toLowerCase();
    const desc = (facility.description || '').toLowerCase();
    const amenities = [];
    
    if (name.includes('cold') || desc.includes('cold') || 
        name.includes('refrigerated') || desc.includes('refrigerated')) {
      amenities.push('Temperature Control');
    }
    
    if (desc.includes('humidity') || desc.includes('moisture')) {
      amenities.push('Humidity Control');
    }
    
    if (desc.includes('pest') || desc.includes('fumigation')) {
      amenities.push('Pest Control');
    }
    
    if (desc.includes('security') || desc.includes('monitored') || desc.includes('safe')) {
      amenities.push('24/7 Security');
    }
    
    return amenities;
  };
  
  const amenities = getAmenities();

  return (
    <Card className="w-full h-full shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="line-clamp-2">{facility.name}</CardTitle>
            <div className="flex items-center mt-2">
              <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm text-muted-foreground">{facility.location}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge>{getFacilityType()}</Badge>
            {hasHighAvailability() && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                High Availability
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm line-clamp-3">
            {facility.description || "Storage facility offering safe storage solutions for agricultural products."}
          </p>
          
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Capacity: {facility.capacity ? `${facility.capacity} tons` : "Contact for details"}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Price: {getPriceRange()}</span>
          </div>
          
          {facility.contact_info && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{facility.contact_info}</span>
            </div>
          )}
          
          {amenities.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              <h4 className="text-sm font-medium mb-2">Amenities</h4>
              <div className="grid grid-cols-2 gap-2">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs">
                    <Check className="h-3 w-3 text-green-600" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => onViewDetails(facility.id)}
        >
          <Info className="h-4 w-4 mr-2" />
          Details
        </Button>
        <Button 
          className="flex-1 bg-primary hover:bg-primary/90" 
          onClick={() => onBook(facility.id)}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StorageFacilityCard;
