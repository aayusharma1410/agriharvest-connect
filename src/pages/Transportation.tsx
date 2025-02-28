
import { useState, useEffect } from "react";
import { Truck, TrendingUp, MapPin, Calendar, Clock, Route, ArrowRight, Package, AlertCircle, Leaf, Zap } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

const Transportation = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("tracking");
  const [cropType, setCropType] = useState("");
  const [cropVariety, setCropVariety] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pesticidesUsed, setPesticidesUsed] = useState([]);
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  
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

  const analyzeCropTransport = () => {
    // This would be replaced by an actual API call in a real application
    console.log("Analyzing crop for transport:", {
      cropType,
      cropVariety,
      quantity,
      pesticidesUsed,
      destination,
      distance
    });
  };

  const shipmentData = [
    {
      id: "AGRI78945612",
      from: "Amritsar, Punjab",
      to: "Delhi NCR",
      status: "In Transit",
      vehicle: "Refrigerated Truck",
      departureDate: "15 May, 2023",
      estimatedArrival: "17 May, 2023",
      progress: 65,
      cropType: "Potatoes",
      quantity: "1.5 tonnes",
      image: "/placeholder.svg"
    },
    {
      id: "AGRI45619873",
      from: "Nashik, Maharashtra",
      to: "Mumbai",
      status: "Loading",
      vehicle: "Standard Truck",
      departureDate: "16 May, 2023",
      estimatedArrival: "17 May, 2023",
      progress: 20,
      cropType: "Onions",
      quantity: "2 tonnes",
      image: "/placeholder.svg"
    },
    {
      id: "AGRI12385674",
      from: "Coimbatore, Tamil Nadu",
      to: "Bengaluru, Karnataka",
      status: "Delivered",
      vehicle: "Refrigerated Truck",
      departureDate: "10 May, 2023",
      estimatedArrival: "12 May, 2023",
      progress: 100,
      cropType: "Tomatoes",
      quantity: "1 tonne",
      image: "/placeholder.svg"
    }
  ];

  const transportPartners = [
    {
      id: 1,
      name: "KisanYatra Logistics",
      rating: 4.8,
      specialization: "Refrigerated Transport",
      fleetSize: "45+ Vehicles",
      priceRange: "₹15-20 per km/tonne",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "AgriVahan Services",
      rating: 4.6,
      specialization: "Grain Transport",
      fleetSize: "30+ Vehicles",
      priceRange: "₹12-18 per km/tonne",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "FarmFreight Solutions",
      rating: 4.5,
      specialization: "All Agricultural Produce",
      fleetSize: "60+ Vehicles",
      priceRange: "₹14-22 per km/tonne",
      image: "/placeholder.svg"
    }
  ];
  
  const pesticideOptions = [
    "Cypermethrin", "Chlorpyrifos", "Imidacloprid", "Glyphosate", 
    "Mancozeb", "Carbendazim", "Profenofos", "Organic Neem Extract"
  ];
  
  // Simple status color mapper
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
      case "In Transit":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400";
      case "Loading":
        return "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-primary/5 to-background hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Smart Transportation
            </div>
            <h1 className="text-4xl md:text-5xl font-medium mb-4 text-balance text-gradient">
              Efficient & Reliable Crop Transportation
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
              Track your shipments in real-time, book verified logistics partners, and optimize routes
              for cost-effective and timely delivery of your agricultural produce.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 bg-background border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-none gap-2 pb-2">
            <button
              onClick={() => setActiveTab("tracking")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "tracking" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Shipment Tracking
            </button>
            <button
              onClick={() => setActiveTab("booking")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "booking" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Book Transport
            </button>
            <button
              onClick={() => setActiveTab("optimization")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "optimization" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Route Optimization
            </button>
            <button
              onClick={() => setActiveTab("cropTransport")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "cropTransport" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Crop Transport Analysis
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-16 bg-background flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Shipment Tracking Tab */}
          {activeTab === "tracking" && (
            <div className="animate-fade-in">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-medium mb-6">Real-time Shipment Tracking</h2>
                <p className="text-muted-foreground mb-8">
                  Track your agricultural shipments in real-time. Get updates on location, estimated arrival time,
                  and current status to ensure your produce reaches its destination safely.
                </p>

                <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm mb-8 card-gradient">
                  <h3 className="text-xl font-medium mb-4">Track Your Shipment</h3>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="text"
                      placeholder="Enter tracking ID (e.g., AGRI78945612)"
                      className="flex-grow py-3 px-4 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                    <button className="py-3 px-6 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors hover-lift">
                      Track Now
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-medium mb-4">Your Recent Shipments</h3>
                <div className="space-y-6">
                  {shipmentData.map((shipment) => (
                    <div key={shipment.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover-lift">
                      <div className="grid md:grid-cols-4">
                        {/* Left section with image */}
                        <div className="md:col-span-1 h-40 md:h-auto">
                          <img 
                            src={shipment.image} 
                            alt={`Shipment ${shipment.id}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Main content section */}
                        <div className="md:col-span-3 p-6">
                          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h4 className="text-lg font-medium">Shipment ID: {shipment.id}</h4>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                                  {shipment.status}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Package className="h-4 w-4 mr-1" />
                                  <span>{shipment.cropType} - {shipment.quantity}</span>
                                </div>
                                <div className="flex items-center">
                                  <Truck className="h-4 w-4 mr-1" />
                                  <span>{shipment.vehicle}</span>
                                </div>
                              </div>
                            </div>
                            <button className="text-primary hover:underline text-sm font-medium flex items-center">
                              View Details
                              <ArrowRight size={16} className="ml-1" />
                            </button>
                          </div>
                          
                          {/* Route info */}
                          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <div className="text-sm text-muted-foreground">From</div>
                                <div className="font-medium">{shipment.from}</div>
                              </div>
                            </div>
                            <div className="hidden md:block">
                              <Route className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <div className="text-sm text-muted-foreground">To</div>
                                <div className="font-medium">{shipment.to}</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Timeline */}
                          <div className="mb-4">
                            <div className="flex justify-between mb-2">
                              <div className="text-sm flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {shipment.departureDate}
                              </div>
                              <div className="text-sm flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {shipment.estimatedArrival}
                              </div>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${shipment.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {shipment.status === "In Transit" && (
                            <div className="flex items-center text-sm text-amber-600 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
                              <AlertCircle className="h-4 w-4 mr-2" />
                              <span>Potential 1-hour delay due to traffic conditions</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Book Transport Tab */}
          {activeTab === "booking" && (
            <div className="animate-fade-in">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-medium mb-6">Book Transport Services</h2>
                <p className="text-muted-foreground mb-8">
                  Connect with verified logistics partners to transport your agricultural produce safely and efficiently.
                  Choose from different vehicle types based on your specific requirements.
                </p>

                <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm mb-12 card-gradient">
                  <h3 className="text-xl font-medium mb-6">Transport Booking Form</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Pickup Location</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter pickup location"
                          className="w-full py-2 pl-10 pr-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Delivery Location</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter delivery location"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full py-2 pl-10 pr-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid md:grid-cols-3 gap-6">
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
                      <label className="block text-sm font-medium mb-2">Quantity (tonnes)</label>
                      <input
                        type="number"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Vehicle Type</label>
                      <select
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      >
                        <option value="">Select vehicle type</option>
                        <option value="refrigerated">Refrigerated Truck</option>
                        <option value="standard">Standard Truck</option>
                        <option value="small">Small Vehicle (≤ 1 tonne)</option>
                        <option value="large">Large Vehicle (≥ 5 tonnes)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Pickup Date</label>
                      <input
                        type="date"
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Special Requirements</label>
                      <select
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      >
                        <option value="none">None</option>
                        <option value="temperature">Temperature Control</option>
                        <option value="humidity">Humidity Control</option>
                        <option value="fragile">Fragile Handling</option>
                        <option value="express">Express Delivery</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center">
                    <button className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors hover-lift">
                      Find Transport Partners
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-medium mb-6">Verified Logistics Partners</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {transportPartners.map((partner) => (
                    <div key={partner.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all hover-lift">
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={partner.image} 
                          alt={partner.name} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-medium">{partner.name}</h4>
                          <div className="bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-md text-sm font-medium">
                            {partner.rating} ★
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Specialization:</span>
                            <span className="font-medium">{partner.specialization}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Fleet Size:</span>
                            <span className="font-medium">{partner.fleetSize}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Price Range:</span>
                            <span className="font-medium">{partner.priceRange}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
                            Book Now
                          </button>
                          <button className="flex-1 py-2 bg-muted text-muted-foreground font-medium rounded-lg hover:bg-muted/80 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Route Optimization Tab */}
          {activeTab === "optimization" && (
            <div className="animate-fade-in">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-medium mb-6">AI-Based Route Optimization</h2>
                <p className="text-muted-foreground mb-8">
                  Our AI algorithms analyze traffic patterns, weather conditions, and road quality to suggest
                  the most efficient routes for transporting your agricultural produce, saving time and fuel costs.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm card-gradient">
                    <div className="p-6">
                      <h3 className="text-xl font-medium mb-4">Route Planner</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Starting Point</label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Enter starting location"
                              className="w-full py-2 pl-10 pr-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Destination</label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Enter destination"
                              className="w-full py-2 pl-10 pr-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Vehicle Type</label>
                            <select
                              className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            >
                              <option value="standard">Standard Truck</option>
                              <option value="small">Small Vehicle</option>
                              <option value="refrigerated">Refrigerated Truck</option>
                              <option value="large">Large Vehicle</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Departure Time</label>
                            <input
                              type="time"
                              className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Optimization Priority</label>
                          <select
                            className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          >
                            <option value="balanced">Balanced (Time & Cost)</option>
                            <option value="time">Fastest Route</option>
                            <option value="cost">Most Economical</option>
                            <option value="quality">Best Road Quality</option>
                          </select>
                        </div>
                      </div>
                      
                      <button className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors hover-lift">
                        <Route className="inline-block mr-2 h-5 w-5" />
                        Calculate Optimal Route
                      </button>
                    </div>
                  </div>

                  <div className="bg-muted rounded-xl overflow-hidden h-auto">
                    {/* This would be replaced with an actual map/route visualization */}
                    <div className="w-full h-full min-h-[400px] flex items-center justify-center p-6">
                      <div className="text-center">
                        <TrendingUp className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
                        <p className="text-muted-foreground mb-2">Route visualization will appear here</p>
                        <p className="text-sm text-muted-foreground/70">Enter origin and destination to calculate the optimal route</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-6 md:p-8 success-gradient">
                  <h3 className="text-xl font-medium mb-4">Benefits of Route Optimization</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-card rounded-lg p-5 border border-border hover-lift">
                      <h4 className="text-lg font-medium mb-2">Reduced Fuel Costs</h4>
                      <p className="text-muted-foreground">Save up to 20% on fuel expenses with optimized routes that avoid traffic and unnecessary detours.</p>
                    </div>
                    <div className="bg-card rounded-lg p-5 border border-border hover-lift">
                      <h4 className="text-lg font-medium mb-2">Faster Deliveries</h4>
                      <p className="text-muted-foreground">Reduce transportation time by up to 30% with real-time traffic data and alternative route suggestions.</p>
                    </div>
                    <div className="bg-card rounded-lg p-5 border border-border hover-lift">
                      <h4 className="text-lg font-medium mb-2">Less Produce Damage</h4>
                      <p className="text-muted-foreground">Better routes mean less time in transit and better road conditions, reducing damage to sensitive crops.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Crop Transport Analysis Tab */}
          {activeTab === "cropTransport" && (
            <div className="animate-fade-in">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-medium mb-6">Crop Transport Analysis</h2>
                <p className="text-muted-foreground mb-8">
                  Our AI system analyzes your crop details to recommend the most appropriate transportation 
                  methods and conditions to ensure quality preservation during transit.
                </p>

                <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm mb-8 card-gradient">
                  <h3 className="text-xl font-medium mb-6">Enter Crop Details for Transport Analysis</h3>
                  
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
                      <label className="block text-sm font-medium mb-2">Quantity (tonnes)</label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Transportation Distance (km)</label>
                      <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        placeholder="Approximate distance"
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
                      onClick={analyzeCropTransport}
                      className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors hover-lift"
                    >
                      <Zap className="inline-block mr-2 h-5 w-5" />
                      Analyze Transport Requirements
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm hover-lift success-gradient">
                    <h3 className="text-lg font-medium mb-4">Recommended Transport Vehicles</h3>
                    <div className="space-y-4">
                      <div className="bg-white/70 dark:bg-card rounded-lg p-4 border border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Refrigerated Truck</h4>
                          <span className="text-sm bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">Best for Fruits</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Maintains optimal temperature (2-8°C) and humidity (85-95%) levels for preserving freshness.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Capacity:</span>
                            <span className="ml-1">1-10 tonnes</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Cost:</span>
                            <span className="ml-1">₹25-35/km</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/70 dark:bg-card rounded-lg p-4 border border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Insulated Van</h4>
                          <span className="text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">Best for Vegetables</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Maintains moderate temperature control with good ventilation for crops that don't need refrigeration.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Capacity:</span>
                            <span className="ml-1">0.5-3 tonnes</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Cost:</span>
                            <span className="ml-1">₹18-25/km</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm hover-lift success-gradient">
                    <h3 className="text-lg font-medium mb-4">Transport Conditions Guide</h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary pl-4 py-2">
                        <h4 className="font-medium mb-1">Temperature Control</h4>
                        <p className="text-sm text-muted-foreground">
                          {cropType === "fruits" ? "Maintain 2-8°C for most fruits to prevent ripening and decay." :
                           cropType === "vegetables" ? "Keep between 4-12°C depending on the vegetable type." :
                           "Ensure stable temperature without extreme fluctuations."}
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-primary pl-4 py-2">
                        <h4 className="font-medium mb-1">Ventilation Requirements</h4>
                        <p className="text-sm text-muted-foreground">
                          {cropType === "fruits" || cropType === "vegetables" ?
                           "Proper air circulation prevents ethylene buildup and reduces spoilage. Ensure vents are clean and unobstructed." :
                           "Basic ventilation to prevent moisture accumulation and mold growth."}
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-primary pl-4 py-2">
                        <h4 className="font-medium mb-1">Stacking & Packaging</h4>
                        <p className="text-sm text-muted-foreground">
                          {cropType === "fruits" ? "Use cushioned crates with proper separation to prevent bruising." :
                           cropType === "vegetables" ? "Stack in ventilated crates with proper weight distribution." :
                           cropType === "grains" || cropType === "cereals" ? "Use moisture-resistant bags with secure sealing." :
                           "Use appropriate packaging based on crop sensitivity and duration."}
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-primary pl-4 py-2">
                        <h4 className="font-medium mb-1">Transit Duration Impact</h4>
                        <p className="text-sm text-muted-foreground">
                          {distance && (parseInt(distance) > 300 ? 
                            "Long-distance transport requires more stringent temperature control and possible mid-transit inspections." :
                            "Short distance allows for more flexible transport options but still requires proper handling.")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </section>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Transportation;
