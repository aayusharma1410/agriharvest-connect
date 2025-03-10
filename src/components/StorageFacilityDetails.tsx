
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { MapPin, Thermometer, Droplets, Clock, Phone, Info, Share2, Users } from "lucide-react";

interface StorageFacilityDetailsProps {
  facility: {
    id: string;
    name: string;
    location: string;
    distance?: string;
    temperature?: string;
    humidity?: string;
    capacity?: string;
    priceRange?: string;
    rating?: number;
    image?: string;
    description?: string;
    contactInfo?: string;
    sharingAvailable?: boolean;
    cropTypes?: string[];
  };
  isOpen: boolean;
  onClose: () => void;
  onBook?: (facilityId: string) => void;
}

const StorageFacilityDetails: React.FC<StorageFacilityDetailsProps> = ({
  facility,
  isOpen,
  onClose,
  onBook
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{facility.name}</DialogTitle>
          <DialogDescription className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {facility.location} {facility.distance && `(${facility.distance} away)`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {facility.image && (
            <div className="h-48 overflow-hidden rounded-md">
              <img 
                src={facility.image} 
                alt={facility.name} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {facility.temperature && (
              <div className="flex items-center">
                <Thermometer className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm font-medium">Temperature</p>
                  <p className="text-sm text-muted-foreground">{facility.temperature}</p>
                </div>
              </div>
            )}
            {facility.humidity && (
              <div className="flex items-center">
                <Droplets className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm text-muted-foreground">{facility.humidity}</p>
                </div>
              </div>
            )}
            {facility.capacity && (
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm font-medium">Capacity</p>
                  <p className="text-sm text-muted-foreground">{facility.capacity}</p>
                </div>
              </div>
            )}
            {facility.priceRange && (
              <div className="flex items-center">
                <Info className="h-5 w-5 text-primary mr-2" />
                <div>
                  <p className="text-sm font-medium">Price Range</p>
                  <p className="text-sm text-muted-foreground">{facility.priceRange}</p>
                </div>
              </div>
            )}
          </div>

          {facility.sharingAvailable && (
            <div className="bg-indigo-50 dark:bg-indigo-950/30 px-4 py-3 rounded-lg flex items-center">
              <Users className="h-5 w-5 text-indigo-500 mr-2" />
              <span className="text-indigo-700 dark:text-indigo-300">Sharing Available</span>
            </div>
          )}

          {facility.description && (
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-muted-foreground text-sm">{facility.description}</p>
            </div>
          )}

          {facility.cropTypes && facility.cropTypes.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Suitable For</h4>
              <div className="flex flex-wrap gap-2">
                {facility.cropTypes.map((crop, index) => (
                  <span key={index} className="bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-md text-xs">
                    {crop}
                  </span>
                ))}
              </div>
            </div>
          )}

          {facility.contactInfo && (
            <div>
              <h4 className="font-medium mb-2">Contact Information</h4>
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-4 w-4 mr-2" />
                <span>{facility.contactInfo}</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">Close</Button>
          {onBook && (
            <Button 
              className="flex-1"
              onClick={() => onBook(facility.id)}
            >
              Book Now
            </Button>
          )}
          {facility.sharingAvailable && (
            <Button variant="secondary" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StorageFacilityDetails;
