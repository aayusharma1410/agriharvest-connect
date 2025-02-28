
import { useState, useEffect } from "react";
import { Search, MapPin, Thermometer, Droplets, Clock, ArrowRight, Leaf, Zap, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

const Storage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("recommendations");
  const [cropType, setCropType] = useState("");
  const [cropVariety, setCropVariety] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pesticidesUsed, setPesticidesUsed] = useState([]);
  const [harvestDate, setHarvestDate] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleAddPesticide = (pesticide) => {
    if (pesticide && !pesticidesUsed.includes(pesticide)) {
      setPesticidesUsed([...pesticidesUsed, pesticide]);
    }
  };

  const handleRemovePesticide = (index) => {
    const newPesticides = [...pesticidesUsed];
    newPesticides.splice(index, 1);
    setPesticidesUsed(newPesticides);
  };

  const analyzeCrop = () => {
    // Simulating AI analysis based on inputs
    const result = {
      recommendedStorageType: cropType === "fruits" || cropType === "vegetables" ? "Cold Storage" : "Dry Warehouse",
      temperatureRange: cropType === "fruits" ? "2-4°C" : cropType === "vegetables" ? "5-10°C" : "15-25°C",
      humidityRange: cropType === "fruits" || cropType === "vegetables" ? "85-95%" : "50-70%",
      transportationMethod: quantity > 5000 ? "Refrigerated Truck" : "Standard Truck",
      storageWarnings: pesticidesUsed.length > 2 ? "High pesticide concentration detected - special ventilation required" : null,
      estimatedShelfLife: cropType === "fruits" ? "2-4 weeks" : cropType === "vegetables" ? "1-3 weeks" : "3-6 months"
    };
    
    setAnalysisResult(result);
    setShowAnalysis(true);
  };

  const storageOptions = [
    {
      id: 1,
      name: "Krishak Cold Storage",
      distance: "2.5 km",
      temperature: "2-4°C",
      humidity: "85-90%",
      capacity: "75% available",
      priceRange: "₹5-7 per kg/month",
      image: "/placeholder.svg",
      rating: 4.7,
      cropTypes: ["fruits", "vegetables"]
    },
    {
      id: 2,
      name: "AgriCool Warehouse",
      distance: "3.8 km",
      temperature: "0-2°C",
      humidity: "90-95%",
      capacity: "40% available",
      priceRange: "₹6-8 per kg/month",
      image: "/placeholder.svg",
      rating: 4.5,
      cropTypes: ["fruits", "dairy"]
    },
    {
      id: 3,
      name: "KisanSeva Storage Facility",
      distance: "5.1 km",
      temperature: "3-5°C",
      humidity: "80-85%",
      capacity: "90% available",
      priceRange: "₹4-6 per kg/month",
      image: "/placeholder.svg",
      rating: 4.2,
      cropTypes: ["fruits", "vegetables", "flowers"]
    },
    {
      id: 4,
      name: "Bharat Grain Storage",
      distance: "4.2 km",
      temperature: "18-22°C",
      humidity: "50-60%",
      capacity: "65% available",
      priceRange: "₹3-5 per kg/month",
      image: "/placeholder.svg",
      rating: 4.3,
      cropTypes: ["grains", "cereals", "pulses"]
    }
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

  const pesticideOptions = [
    "Cypermethrin", "Chlorpyrifos", "Imidacloprid", "Glyphosate", 
    "Mancozeb", "Carbendazim", "Profenofos", "Organic Neem Extract"
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
                        onChange={(e) => e.target.value && handleAddPesticide(e.target.value)}
                        value=""
                      >
                        <option value="">Select pesticide</option>
                        {pesticideOptions.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                      <button 
                        onClick={() => document.querySelector('select').value && handleAddPesticide(document.querySelector('select').value)}
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {storageOptions.map((option) => (
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
                          <span className="text-sm">{option.distance} away</span>
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
                        
                        <div className="mb-3">
                          <div className="text-xs text-muted-foreground mb-1">Suitable for:</div>
                          <div className="flex flex-wrap gap-1">
                            {option.cropTypes.map((crop, index) => (
                              <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                {crop}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <button className="w-full py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        className="flex-grow py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        onChange={(e) => e.target.value && handleAddPesticide(e.target.value)}
                        value=""
                      >
                        <option value="">Select pesticide</option>
                        {pesticideOptions.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                      <button 
                        onClick={() => document.querySelector('select[value=""]') && handleAddPesticide(document.querySelector('select[value=""]').value)}
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
                    
                    {analysisResult?.storageWarnings && (
                      <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 rounded-lg flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <p>{analysisResult.storageWarnings}</p>
                      </div>
                    )}
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-card rounded-lg border border-border p-5">
                        <h4 className="text-lg font-medium mb-4">Storage Recommendations</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Recommended Storage Type:</span>
                            <span className="font-medium">{analysisResult?.recommendedStorageType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Temperature Range:</span>
                            <span className="font-medium">{analysisResult?.temperatureRange}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Humidity Range:</span>
                            <span className="font-medium">{analysisResult?.humidityRange}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Estimated Shelf Life:</span>
                            <span className="font-medium">{analysisResult?.estimatedShelfLife}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-card rounded-lg border border-border p-5">
                        <h4 className="text-lg font-medium mb-4">Transportation Recommendations</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Recommended Vehicle:</span>
                            <span className="font-medium">{analysisResult?.transportationMethod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Additional Requirements:</span>
                            <span className="font-medium">
                              {cropType === "fruits" || cropType === "vegetables" 
                                ? "Temperature-controlled environment" 
                                : "Standard protection from elements"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Loading Precautions:</span>
                            <span className="font-medium">
                              {cropType === "fruits" 
                                ? "Handle with care, avoid stacking" 
                                : cropType === "vegetables" 
                                ? "Proper ventilation required"
                                : "Standard loading procedures"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-medium mb-4">Nearby Storage Facilities Matching Your Requirements</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        {storageOptions
                          .filter(option => option.cropTypes.includes(cropType))
                          .slice(0, 3)
                          .map(option => (
                            <div key={option.id} className="bg-card rounded-lg border border-border p-4 hover-lift">
                              <h5 className="font-medium mb-1">{option.name}</h5>
                              <div className="text-sm text-muted-foreground mb-2">{option.distance} away</div>
                              <div className="flex justify-between text-sm">
                                <span>{option.temperature}</span>
                                <span>{option.capacity}</span>
                              </div>
                              <button className="w-full mt-3 py-1.5 text-sm bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-colors">
                                Select
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </section>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Storage;
