
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import StorageFacilityCard from '@/components/StorageFacilityCard';
import StorageFacilityDetails from '@/components/StorageFacilityDetails';
import BookStorageModal from '@/components/BookStorageModal';
import GovernmentSchemeRecommendations from '@/components/GovernmentSchemeRecommendations';

const Storage = () => {
  const navigate = useNavigate();
  
  // State for form
  const [cropType, setCropType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  // State for results
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [facilities, setFacilities] = useState<any[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<any[]>([]);
  const [schemes, setSchemes] = useState<any[]>([]);
  
  // State for facility details modal
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  
  // State for booking modal
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [facilityToBook, setFacilityToBook] = useState<any>(null);
  
  // State for filtering and search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCapacity, setFilterCapacity] = useState('');
  
  // Load all storage facilities on component mount
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const { data, error } = await supabase
          .from('storage_facilities')
          .select('*');
          
        if (error) throw error;
        
        if (data) {
          setFacilities(data);
        }
      } catch (error: any) {
        console.error('Error fetching storage facilities:', error.message);
      }
    };
    
    fetchFacilities();
  }, []);
  
  const handleSearch = async () => {
    if (!cropType || !quantity || !location || !startDate || !endDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (parseFloat(quantity) <= 0) {
      toast.error('Quantity must be greater than 0');
      return;
    }
    
    if (endDate < startDate) {
      toast.error('End date cannot be before start date');
      return;
    }
    
    setLoading(true);
    
    try {
      // Fetch storage facilities matching criteria
      const { data: facilitiesData, error: facilitiesError } = await supabase
        .from('storage_facilities')
        .select('*');
        
      if (facilitiesError) throw facilitiesError;
      
      if (!facilitiesData || facilitiesData.length === 0) {
        throw new Error('No storage facilities found');
      }
      
      // Filter facilities based on location and capacity
      const quantityValue = parseFloat(quantity);
      const matchingFacilities = facilitiesData.filter(facility => {
        // Check if location matches
        const locationMatch = facility.location.toLowerCase().includes(location.toLowerCase());
        
        // Check if capacity is sufficient (if specified)
        const capacityMatch = !facility.capacity || facility.capacity >= quantityValue;
        
        return locationMatch && capacityMatch;
      });
      
      // Sort facilities by best match
      const sortedFacilities = matchingFacilities.sort((a, b) => {
        // Prioritize exact location matches
        const aLocationScore = a.location.toLowerCase() === location.toLowerCase() ? 2 : 
                              a.location.toLowerCase().includes(location.toLowerCase()) ? 1 : 0;
        const bLocationScore = b.location.toLowerCase() === location.toLowerCase() ? 2 : 
                              b.location.toLowerCase().includes(location.toLowerCase()) ? 1 : 0;
        
        if (aLocationScore !== bLocationScore) {
          return bLocationScore - aLocationScore;
        }
        
        // Then prioritize capacity closest to required quantity
        const aCapacityDiff = a.capacity ? Math.abs(a.capacity - quantityValue) : Number.MAX_VALUE;
        const bCapacityDiff = b.capacity ? Math.abs(b.capacity - quantityValue) : Number.MAX_VALUE;
        
        return aCapacityDiff - bCapacityDiff;
      });
      
      setFilteredFacilities(sortedFacilities);
      
      // Fetch relevant government schemes based on crop type and location
      const { data: schemesData, error: schemesError } = await supabase
        .from('government_schemes')
        .select('*')
        .or(`state.eq.All India,state.ilike.%${location}%`)
        .order('category');
        
      if (schemesError) throw schemesError;
      
      // Filter schemes by relevance to crop type and storage
      const relevantSchemes = schemesData.filter(scheme => {
        const isStorageScheme = 
          scheme.category.toLowerCase().includes('storage') || 
          scheme.description.toLowerCase().includes('storage') ||
          scheme.description.toLowerCase().includes('warehouse') ||
          scheme.description.toLowerCase().includes('infrastructure');
          
        const matchesCropType = 
          scheme.description.toLowerCase().includes(cropType.toLowerCase()) ||
          scheme.category.toLowerCase().includes(cropType.toLowerCase());
          
        return isStorageScheme && (matchesCropType || !cropType);
      });
      
      setSchemes(relevantSchemes);
      setSearchPerformed(true);
      
      // Scroll to results
      setTimeout(() => {
        window.scrollTo({ top: document.getElementById('results')?.offsetTop || 0, behavior: 'smooth' });
      }, 100);
      
    } catch (error: any) {
      console.error('Error searching storage facilities:', error);
      toast.error(`Error searching storage facilities: ${error.message}`);
      
      // Set default data if search fails
      setFilteredFacilities(facilities);
      setSearchPerformed(true);
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewDetails = (facilityId: string) => {
    const facility = facilities.find(f => f.id === facilityId);
    if (facility) {
      setSelectedFacility(facility);
      setDetailsModalOpen(true);
    }
  };
  
  const handleBookStorage = (facilityId: string) => {
    const facility = facilities.find(f => f.id === facilityId);
    if (facility) {
      setFacilityToBook(facility);
      setBookingModalOpen(true);
    }
  };
  
  const applyFilters = () => {
    if (!searchPerformed) return;
    
    let results = [...facilities];
    
    // Filter by location/name search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        facility => 
          facility.name.toLowerCase().includes(query) || 
          facility.location.toLowerCase().includes(query) ||
          (facility.description && facility.description.toLowerCase().includes(query))
      );
    }
    
    // Filter by capacity
    if (filterCapacity) {
      const capacityValue = parseFloat(filterCapacity);
      results = results.filter(
        facility => !facility.capacity || facility.capacity >= capacityValue
      );
    }
    
    // Apply the main search filter parameters if search was performed
    if (location) {
      results = results.filter(
        facility => facility.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (quantity) {
      const quantityValue = parseFloat(quantity);
      results = results.filter(
        facility => !facility.capacity || facility.capacity >= quantityValue
      );
    }
    
    setFilteredFacilities(results);
  };
  
  // Apply filters when search query or filter capacity changes
  useEffect(() => {
    applyFilters();
  }, [searchQuery, filterCapacity]);
  
  const handleGoBack = () => {
    navigate('/');
  };
  
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
            <h1 className="text-3xl font-bold tracking-tight mb-2">Agricultural Storage Solutions</h1>
            <p className="text-muted-foreground">
              Find and book the right storage facilities for your agricultural produce
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Find Storage</CardTitle>
              <CardDescription>
                Enter your storage requirements to find suitable facilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <div className="space-y-2">
                  <label htmlFor="crop-type" className="text-sm font-medium">
                    Crop Type
                  </label>
                  <Select 
                    value={cropType} 
                    onValueChange={setCropType}
                  >
                    <SelectTrigger id="crop-type">
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grains">Grains</SelectItem>
                      <SelectItem value="Fruits">Fruits</SelectItem>
                      <SelectItem value="Vegetables">Vegetables</SelectItem>
                      <SelectItem value="Pulses">Pulses</SelectItem>
                      <SelectItem value="Oilseeds">Oilseeds</SelectItem>
                      <SelectItem value="Spices">Spices</SelectItem>
                      <SelectItem value="Cotton">Cotton</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-sm font-medium">
                    Quantity (in tons)
                  </label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="0"
                    step="0.1"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>
                  <Input
                    id="location"
                    placeholder="Enter city or state"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          disabled={(date) => 
                            date < new Date() || 
                            (startDate ? date < startDate : false)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Searching...
                      </span>
                    ) : (
                      'Find Storage Facilities'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {searchPerformed && (
            <div id="results" className="animate-fade-in">
              {schemes.length > 0 && (
                <GovernmentSchemeRecommendations schemes={schemes} />
              )}
              
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">Storage Facilities</h2>
                <p className="text-muted-foreground mb-6">
                  {filteredFacilities.length} storage facilities found matching your requirements
                </p>
                
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or location"
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 md:w-72">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select 
                      value={filterCapacity} 
                      onValueChange={setFilterCapacity}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by capacity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any capacity</SelectItem>
                        <SelectItem value="5">At least 5 tons</SelectItem>
                        <SelectItem value="10">At least 10 tons</SelectItem>
                        <SelectItem value="25">At least 25 tons</SelectItem>
                        <SelectItem value="50">At least 50 tons</SelectItem>
                        <SelectItem value="100">At least 100 tons</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {filteredFacilities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFacilities.map((facility) => (
                      <StorageFacilityCard 
                        key={facility.id}
                        facility={facility}
                        onViewDetails={handleViewDetails}
                        onBook={handleBookStorage}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">No storage facilities found</h3>
                    <p className="text-muted-foreground mt-2">
                      Try adjusting your search criteria or location
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Facility Details Modal */}
        {selectedFacility && (
          <StorageFacilityDetails
            isOpen={detailsModalOpen}
            onClose={() => setDetailsModalOpen(false)}
            facility={selectedFacility}
            onBook={handleBookStorage}
          />
        )}
        
        {/* Booking Modal */}
        {facilityToBook && (
          <BookStorageModal
            isOpen={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
            facility={facilityToBook}
            storageDetails={searchPerformed ? {
              cropType,
              quantity,
              startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
              endDate: endDate ? format(endDate, 'yyyy-MM-dd') : ''
            } : null}
            recommendedSchemes={schemes.map(scheme => ({
              id: scheme.id,
              name: scheme.name
            }))}
          />
        )}
      </div>
    </>
  );
};

export default Storage;
