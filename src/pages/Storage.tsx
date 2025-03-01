import { useState, useEffect } from "react";
import { Search, MapPin, Thermometer, Droplets, Clock, ArrowRight, Leaf, Zap, AlertCircle, Share2, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "../integrations/supabase/types";

type StorageFacility = Database['public']['Tables']['storage_facilities']['Row'];

const Storage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("recommendations");
  const [cropType, setCropType] = useState("");
  const [cropVariety, setCropVariety] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pesticidesUsed, setPesticidesUsed] = useState<string[]>([]);
  const [harvestDate, setHarvestDate] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [showSharingOptions, setShowSharingOptions] = useState(false);
  const [storageFacilities, setStorageFacilities] = useState<StorageFacility[]>([]);
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();

  useEffect(() => {
    setIsLoaded(true);
    fetchStorageFacilities();
  }, []);

  const fetchStorageFacilities = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('storage_facilities')
        .select('*');
      
      if (error) throw error;
      
      if (data) {
        setStorageFacilities(data);
      }
    } catch (error: any) {
      toast.error(`Error fetching storage facilities: ${error.message}`);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPesticide = (pesticide: string) => {
    if (pesticide && !pesticidesUsed.includes(pesticide)) {
      setPesticidesUsed([...pesticidesUsed, pesticide]);
    }
  };

  const handleRemovePesticide = (index: number) => {
    const newPesticides = [...pesticidesUsed];
    newPesticides.splice(index, 1);
    setPesticidesUsed(newPesticides);
  };

  const analyzeCrop = () => {
    // Simulating AI analysis based on inputs
    const parsedQuantity = parseInt(quantity);
    const result = {
      recommendedStorageType: cropType === "fruits" || cropType === "vegetables" ? "Cold Storage" : "Dry Warehouse",
      temperatureRange: cropType === "fruits" ? "2-4°C" : cropType === "vegetables" ? "5-10°C" : "15-25°C",
      humidityRange: cropType === "fruits" || cropType === "vegetables" ? "85-95%" : "50-70%",
      transportationMethod: parsedQuantity > 5000 ? "Refrigerated Truck" : "Standard Truck",
      storageWarnings: pesticidesUsed.length > 2 ? "High pesticide concentration detected - special ventilation required" : null,
      estimatedShelfLife: cropType === "fruits" ? "2-4 weeks" : cropType === "vegetables" ? "1-3 weeks" : "3-6 months"
    };
    
    setAnalysisResult(result);
    setShowAnalysis(true);
  };

  // Map storage facilities to UI display format
  const storageOptionsFromDB = storageFacilities.map((facility, index) => {
    // Generate synthetic data for each facility
    const randomDistance = (Math.random() * 10).toFixed(1);
    const randomTemperature = facility.name.includes('Cold') ? "2-4°C" : "15-25°C";
    const randomHumidity = facility.name.includes('Cold') ? "85-90%" : "50-60%";
    const randomCapacity = Math.floor(Math.random() * 100) + "%";
    const randomPrice = `₹${Math.floor(Math.random() * 5) + 3}-${Math.floor(Math.random() * 5) + 5} per kg/month`;
    const randomRating = (Math.random() * 1 + 4).toFixed(1);
    const cropTypes = facility.name.includes('Cold') 
      ? ["fruits", "vegetables"] 
      : ["grains", "cereals", "pulses"];
    
    return {
      id: facility.id,
      name: facility.name,
      distance: `${randomDistance} km`,
      temperature: randomTemperature,
      humidity: randomHumidity,
      capacity: `${randomCapacity} available`,
      priceRange: randomPrice,
      image: "/placeholder.svg",
      rating: parseFloat(randomRating),
      cropTypes: cropTypes,
      sharingAvailable: index % 2 === 0, // Alternate facilities have sharing
      location: facility.location,
      contactInfo: facility.contact_info || 'Contact information not available',
      description: facility.description || 'No description available'
    };
  });

  const pesticideOptions = [
    "Cypermethrin", "Chlorpyrifos", "Imidacloprid", "Glyphosate", 
    "Mancozeb", "Carbendazim", "Profenofos", "Organic Neem Extract"
  ];

  const processingTips = [
    {
      id: 1,
      title: "Proper Sorting and Grading",
      description: "Sort and grade your produce based on size, color, and quality to fetch better prices in the market.",
      icon: <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">1</div>
    },
    {
      id: 2,
      title: "Pre-cooling Techniques",
      description: "Use pre-cooling to remove field heat from freshly harvested crops, extending shelf life significantly.",
      icon: <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">2</div>
    },
    {
      id: 3,
      title: "Proper Packaging Methods",
      description: "Use appropriate packaging materials like plastic crates, corrugated boxes, or mesh bags based on crop type.",
      icon: <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">3</div>
    },
    {
      id: 4,
      title: "Moisture Management",
      description: "Maintain optimal moisture levels for different crop types to prevent spoilage during storage.",
      icon: <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">4</div>
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-primary/5 to-background hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Storage Solutions
            </div>
            <h1 className="text-4xl md:text-5xl font-medium mb-4 text-balance text-gradient">
              Smart Storage for Longer Shelf Life
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
              Find the perfect storage solution for your crops with our AI-powered recommendations
              based on crop type, location, and specific requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 bg-background border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-none gap-2 pb-2">
            <button
              onClick={() => setActiveTab("recommendations")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "recommendations" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Storage Recommendations
            </button>
            <button
              onClick={() => setActiveTab("map")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "map" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Find Nearby Storage
            </button>
            <button
              onClick={() => setActiveTab("processing")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "processing" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Processing Techniques
            </button>
            <button
              onClick={() => setActiveTab("analysis")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "analysis" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Crop Analysis
            </button>
            <button
              onClick={() => setActiveTab("sharing")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "sharing" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Storage Sharing
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-16 bg-background flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* AI Recommendations Tab */}
          {activeTab === "recommendations" && (
            <div className="animate-fade-in">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-medium mb-6">AI-Powered Storage Recommendations</h2>
                <p className="text-muted-foreground mb-8">
                  Get personalized storage recommendations based on your crop type, quantity, and location.
                  Our AI system analyzes optimal temperature, humidity, and storage duration for maximum shelf life.
                </p>

                <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm card-gradient">
                  <h3 className="text-xl font-medium mb-4">Find Optimal Storage Conditions</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Crop Type</label>
                      <select
                        value={cropType}
                        onChange={(e) => setCropType(e.target.value)}
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      >
                        <option value="">Select crop type</option>
                        <option value="grains">Grains</option>
                        <option value="cereals">Cereals</option>
                        <option value="pulses">Pulses</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="fruits">Fruits</option>
                        <option value="flowers">Flowers</option>
                        <option value="spices">Spices</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Crop Variety/Name</label>
                      <input
                        type="text"
                        value={cropVariety}
                        onChange={(e) => setCropVariety(e.target.value)}
                        placeholder="E.g. Basmati Rice, Alphonso Mango"
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Location</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Enter your location"
                          className="w-full py-2 pl-10 pr-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Harvest Date</label>
                      <input
                        type="date"
                        value={harvestDate}
                        onChange={(e) => setHarvestDate(e.target.value)}
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Quantity (kg)</label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Storage Duration</label>
                      <select
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      >
                        <option value="">Select duration</option>
                        <option value="short">Short-term (1-4 weeks)</option>
                        <option value="medium">Medium-term (1-3 months)</option>
                        <option value="long">Long-term (3+ months)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Maximum Budget (₹/kg/month)</label>
                      <input
                        type="number"
                        placeholder="Enter max budget"
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Pesticides Used (if any)</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {pesticidesUsed.map((pesticide, index) => (
                        <div key={index} className="bg-muted px-3 py-1 rounded-lg flex items-center">
                          <span className="text-sm">{pesticide}</span>
                          <button 
                            onClick={() => handleRemovePesticide(index)}
                            className="ml-2 text-muted-foreground hover:text-destructive"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <select
                        className="flex-grow py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        onChange={(e) => {
                          if (e.target.value) {
                            handleAddPesticide(e.target.value);
                            e.target.value = "";
                          }
                        }}
                      >
                        <option value="">Select pesticide</option>
                        {pesticideOptions.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                      <button 
                        onClick={() => {
                          const select = document.querySelector('select[aria-label="pesticide-select"]') as HTMLSelectElement;
                          if (select && select.value) {
                            handleAddPesticide(select.value);
                            select.value = "";
                          }
                        }}
                        className="px-4 py-2 bg-muted text-foreground font-medium rounded-lg hover:bg-muted/80 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button 
                      onClick={analyzeCrop}
                      className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors hover-lift"
                    >
                      <Search className="inline-block mr-2 h-5 w-5" />
                      Get Recommendations
                    </button>
                  </div>
                </div>
              </div>

              {/* Storage Options */}
              <div>
                <h3 className="text-xl font-medium mb-4">Available Storage Options Near You</h3>
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {storageOptionsFromDB.map((option) => (
                      <div key={option.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all hover-lift">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={option.image} 
                            alt={option.name} 
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-lg font-medium">{option.name}</h4>
                            <div className="bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-md text-sm font-medium">
                              {option.rating} ★
                            </div>
                          </div>
                          
                          <div className="flex items-center text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{option.location} ({option.distance} away)</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center">
                              <Thermometer className="h-4 w-4 text-primary mr-2" />
                              <span className="text-sm">{option.temperature}</span>
                            </div>
                            <div className="flex items-center">
                              <Droplets className="h-4 w-4 text-primary mr-2" />
                              <span className="text-sm">{option.humidity}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-primary mr-2" />
                              <span className="text-sm">{option.capacity}</span>
                            </div>
                            <div className="text-sm">
                              {option.priceRange}
                            </div>
                          </div>
                          
                          {option.sharingAvailable && (
                            <div className="mb-3 bg-indigo-50 dark:bg-indigo-950/30 px-3 py-2 rounded-lg flex items-center">
                              <Users className="h-4 w-4 text-indigo-500 mr-2" />
                              <span className="text-sm text-indigo-700 dark:text-indigo-300">Sharing Available</span>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <button className="flex-1 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-colors">
                              View Details
                            </button>
                            {option.sharingAvailable && (
                              <button className="p-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
                                <Share2 className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Map View Tab */}
          {activeTab === "map" && (
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-medium mb-6">Find Nearby Storage Facilities</h2>
              <p className="text-muted-foreground mb-8">
                Use our interactive map to locate cold storage facilities and warehouses near you.
                Filter by distance, price, and availability.
              </p>

              <div className="bg-muted rounded-xl overflow-hidden h-96 mb-8">
                {/* This would be replaced with an actual map component */}
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-muted-foreground">Interactive map would be displayed here</p>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm card-gradient">
                <h3 className="text-xl font-medium mb-4">Search Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Distance</label>
                    <select
                      className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="5">Within 5 km</option>
                      <option value="10">Within 10 km</option>
                      <option value="20">Within 20 km</option>
                      <option value="50">Within 50 km</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Storage Type</label>
                    <select
                      className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="all">All Types</option>
                      <option value="cold">Cold Storage</option>
                      <option value="warehouse">Warehouse</option>
                      <option value="silo">Grain Silo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Availability</label>
                    <select
                      className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="any">Any Availability</option>
                      <option value="high">High (&gt;70%)</option>
                      <option value="medium">Medium (30-70%)</option>
                      <option value="low">Low (&lt;30%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Sharing Options</label>
                    <select
                      className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="all">Show All</option>
                      <option value="sharing-only">Only Sharing Available</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors hover-lift">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Processing Techniques Tab */}
          {activeTab === "processing" && (
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-medium mb-6">Processing Techniques & Tips</h2>
              <p className="text-muted-foreground mb-8">
                Learn about best practices and techniques for processing different types of crops
                to extend shelf life and maintain quality.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {processingTips.map((tip) => (
                  <div key={tip.id} className="bg-card rounded-xl border border-border p-6 shadow-sm hover-lift card-gradient">
                    <div className="flex items-start">
                      <div className="mr-4">{tip.icon}</div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">{tip.title}</h3>
                        <p className="text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-primary/5 rounded-xl p-6 md:p-8 success-gradient">
                <h3 className="text-xl font-medium mb-4">Crop-Specific Processing Guides</h3>
                <p className="text-muted-foreground mb-6">
                  Download our detailed guides for specific crops to learn about the optimal processing methods:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {["Wheat & Grains", "Fruits & Vegetables", "Pulses & Lentils", "Oilseeds", "Spices"].map((crop, index) => (
                    <div key={index} className="bg-card rounded-lg border border-border p-4 flex justify-between items-center hover-lift">
                      <span>{crop}</span>
                      <button className="text-primary hover:underline flex items-center">
                        <span className="mr-1">Download</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Crop Analysis Tab */}
          {activeTab === "analysis" && (
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-medium mb-6">AI-Powered Crop Analysis</h2>
              <p className="text-muted-foreground mb-8">
                Get detailed recommendations for storage and transportation based on your specific crop details.
                Our AI system analyzes multiple factors to provide the most suitable solutions.
              </p>

              {!showAnalysis ? (
                <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm card-gradient">
                  <h3 className="text-xl font-medium mb-4">Enter Crop Details for Analysis</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Crop Type</label>
                      <select
                        value={cropType}
                        onChange={(e) => setCropType(e.target.value)}
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      >
                        <option value="">Select crop type</option>
                        <option value="grains">Grains</option>
                        <option value="cereals">Cereals</option>
                        <option value="pulses">Pulses</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="fruits">Fruits</option>
                        <option value="flowers">Flowers</option>
                        <option value="spices">Spices</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Crop Variety/Name</label>
                      <input
                        type="text"
                        value={cropVariety}
                        onChange={(e) => setCropVariety(e.target.value)}
                        placeholder="E.g. Basmati Rice, Alphonso Mango"
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Quantity (kg)</label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Harvest Date</label>
                      <input
                        type="date"
                        value={harvestDate}
                        onChange={(e) => setHarvestDate(e.target.value)}
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Pesticides Used (if any)</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {pesticidesUsed.map((pesticide, index) => (
                        <div key={index} className="bg-muted px-3 py-1 rounded-lg flex items-center">
                          <span className="text-sm">{pesticide}</span>
                          <button 
                            onClick={() => handleRemovePesticide(index)}
                            className="ml-2 text-muted-foreground hover:text-destructive"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <select
                        aria-label="pesticide-select"
                        className="flex-grow py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        onChange={(e) => {
                          if (e.target.value) {
                            handleAddPesticide(e.target.value);
                            e.target.value = "";
                          }
                        }}
                      >
                        <option value="">Select pesticide</option>
                        {pesticideOptions.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                      <button 
                        onClick={() => {
                          const select = document.querySelector('select[aria-label="pesticide-select"]') as HTMLSelectElement;
                          if (select && select.value) {
                            handleAddPesticide(select.value);
                            select.value = "";
                          }
                        }}
                        className="px-4 py-2 bg-muted text-foreground font-medium rounded-lg hover:bg-muted/80 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button 
                      onClick={analyzeCrop}
                      className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors hover-lift"
                    >
                      <Zap className="inline-block mr-2 h-5 w-5" />
                      Analyze Crop
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm success-gradient">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-medium mb-6">Analysis Results for {cropVariety || cropType}</h3>
                      <button 
                        onClick={() => setShowAnalysis(false)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Back to Analysis
                      </button>
                    </div>
                    
                    {
