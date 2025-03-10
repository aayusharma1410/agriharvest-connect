
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Store, Phone, Thermometer, Tag, Calendar, Info } from 'lucide-react';

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
          <Badge>{getFacilityType()}</Badge>
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
          <Calendar className="h-4 w-4 mr-2" />
          Book
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StorageFacilityCard;
