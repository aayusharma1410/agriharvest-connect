
import { useState, useEffect } from "react";
import { Search, MapPin, Truck, Calendar, Clock, CreditCard, Filter, ArrowRight, User, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Transportation = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("vehicles");
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [location, setLocation] = useState("");
  const [cropType, setCropType] = useState("");
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'hindi') {
      setLanguage('hindi');
    }

    // Add language change listener
    const handleLanguageChange = (e: any) => {
      if (e.detail && e.detail.language) {
        setLanguage(e.detail.language);
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  // Multilingual content
  const content = {
    english: {
      pageTitle: "Transportation",
      heroSubtitle: "Connect with reliable transport services for your crops",
      tabVehicles: "Available Vehicles",
      tabSharing: "Transport Sharing",
      tabTracking: "Shipment Tracking",
      search: "Search",
      searchPlaceholder: "Enter pickup location",
      selectCropType: "Select crop type",
      wheat: "Wheat",
      rice: "Rice",
      maize: "Maize",
      pulses: "Pulses",
      oilseeds: "Oilseeds",
      vegetables: "Vegetables",
      fruits: "Fruits",
      pickupLocation: "Pickup Location",
      dropLocation: "Drop Location",
      pickupDate: "Pickup Date",
      vehicleType: "Vehicle Type",
      budget: "Budget (₹)",
      findVehicles: "Find Vehicles",
      sharingTitle: "Transportation Sharing",
      sharingSubtitle: "Share transportation with other farmers to reduce costs",
      viewRequests: "View Requests",
      createRequest: "Create Request",
      vehicleCapacity: "Capacity",
      vehicleType: "Vehicle Type",
      costPerKm: "Cost per km",
      contactNow: "Contact Now",
      viewDetails: "View Details",
      kmAway: "km away",
      cropDetails: "Crop Details",
      cropName: "Crop Name",
      cropQuantity: "Quantity (kg)",
      cropPesticides: "Pesticides Used",
      cropQuality: "Quality",
      transportRecommendations: "Transport Recommendations",
      suggestedVehicles: "Suggested Vehicles Based on Your Crop",
      availableVehicleNearby: "Available Vehicles Nearby",
      filtersShow: "Show Filters",
      filtersHide: "Hide Filters",
      applyFilters: "Apply Filters"
    },
    hindi: {
      pageTitle: "परिवहन",
      heroSubtitle: "अपनी फसलों के लिए विश्वसनीय परिवहन सेवाओं से जुड़ें",
      tabVehicles: "उपलब्ध वाहन",
      tabSharing: "परिवहन साझाकरण",
      tabTracking: "शिपमेंट ट्रैकिंग",
      search: "खोजें",
      searchPlaceholder: "पिकअप स्थान दर्ज करें",
      selectCropType: "फसल प्रकार चुनें",
      wheat: "गेहूं",
      rice: "चावल",
      maize: "मक्का",
      pulses: "दालें",
      oilseeds: "तिलहन",
      vegetables: "सब्जियां",
      fruits: "फल",
      pickupLocation: "पिकअप स्थान",
      dropLocation: "डिलीवरी स्थान",
      pickupDate: "पिकअप तिथि",
      vehicleType: "वाहन प्रकार",
      budget: "बजट (₹)",
      findVehicles: "वाहन खोजें",
      sharingTitle: "परिवहन साझाकरण",
      sharingSubtitle: "लागत कम करने के लिए अन्य किसानों के साथ परिवहन साझा करें",
      viewRequests: "अनुरोध देखें",
      createRequest: "अनुरोध बनाएं",
      vehicleCapacity: "क्षमता",
      vehicleType: "वाहन प्रकार",
      costPerKm: "प्रति किमी लागत",
      contactNow: "अभी संपर्क करें",
      viewDetails: "विवरण देखें",
      kmAway: "किमी दूर",
      cropDetails: "फसल विवरण",
      cropName: "फसल का नाम",
      cropQuantity: "मात्रा (किग्रा)",
      cropPesticides: "उपयोग किए गए कीटनाशक",
      cropQuality: "गुणवत्ता",
      transportRecommendations: "परिवहन अनुशंसाएँ",
      suggestedVehicles: "आपकी फसल के आधार पर सुझाए गए वाहन",
      availableVehicleNearby: "आस-पास उपलब्ध वाहन",
      filtersShow: "फिल्टर दिखाएं",
      filtersHide: "फिल्टर छिपाएं",
      applyFilters: "फिल्टर लागू करें"
    }
  };

  // Set the current language content
  const t = language === "english" ? content.english : content.hindi;

  // Vehicles data
  const vehicles = [
    {
      id: 1,
      name: language === "english" ? "Mini Truck" : "मिनी ट्रक",
      driverName: language === "english" ? "Ramesh Singh" : "रमेश सिंह",
      location: language === "english" ? "Indore, MP" : "इंदौर, एमपी",
      distance: "3.2",
      costPerKm: "₹12",
      capacity: "1.5 ton",
      vehicleType: language === "english" ? "Refrigerated" : "रेफ्रिजरेटेड",
      available: true,
      image: "/placeholder.svg",
      rating: 4.7
    },
    {
      id: 2,
      name: language === "english" ? "Tata 407" : "टाटा 407",
      driverName: language === "english" ? "Prakash Verma" : "प्रकाश वर्मा",
      location: language === "english" ? "Bhopal, MP" : "भोपाल, एमपी",
      distance: "5.5",
      costPerKm: "₹14",
      capacity: "2.5 ton",
      vehicleType: language === "english" ? "General" : "सामान्य",
      available: true,
      image: "/placeholder.svg",
      rating: 4.2
    },
    {
      id: 3,
      name: language === "english" ? "Mahindra Pickup" : "महिंद्रा पिकअप",
      driverName: language === "english" ? "Suresh Kumar" : "सुरेश कुमार",
      location: language === "english" ? "Ujjain, MP" : "उज्जैन, एमपी",
      distance: "8.7",
      costPerKm: "₹10",
      capacity: "1 ton",
      vehicleType: language === "english" ? "General" : "सामान्य",
      available: false,
      image: "/placeholder.svg",
      rating: 4.5
    }
  ];

  // Shared transportation requests
  const sharedRequests = [
    {
      id: 1,
      name: language === "english" ? "Wheat Transport to Mandi" : "मंडी तक गेहूं परिवहन",
      farmerName: language === "english" ? "Mohan Patel" : "मोहन पटेल",
      fromLocation: language === "english" ? "Dewas, MP" : "देवास, एमपी",
      toLocation: language === "english" ? "Indore Mandi" : "इंदौर मंडी",
      date: "10 Oct 2023",
      quantity: "500 kg",
      price: "₹1500 total",
      seatsAvailable: 2,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: language === "english" ? "Potato Delivery to Cold Storage" : "कोल्ड स्टोरेज तक आलू डिलीवरी",
      farmerName: language === "english" ? "Sanjay Singh" : "संजय सिंह",
      fromLocation: language === "english" ? "Ratlam, MP" : "रतलाम, एमपी",
      toLocation: language === "english" ? "Ujjain Cold Storage" : "उज्जैन कोल्ड स्टोरेज",
      date: "15 Oct 2023",
      quantity: "800 kg",
      price: "₹2000 total",
      seatsAvailable: 3,
      image: "/placeholder.svg"
    }
  ];

  // Filters state
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              {t.pageTitle}
            </div>
            <h1 className="text-4xl md:text-5xl font-medium mb-4 text-balance">
              {t.pageTitle}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
              {t.heroSubtitle}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-10 pr-20 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-md font-medium text-sm">
                  {t.search}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 bg-background border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-none gap-2 pb-2">
            <button
              onClick={() => setActiveTab("vehicles")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "vehicles" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t.tabVehicles}
            </button>
            <button
              onClick={() => setActiveTab("sharing")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "sharing" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t.tabSharing}
            </button>
            <button
              onClick={() => setActiveTab("tracking")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "tracking" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t.tabTracking}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-16 bg-background flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Available Vehicles Tab */}
          {activeTab === "vehicles" && (
            <div className="animate-fade-in">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-medium mb-6">{t.availableVehicleNearby}</h2>
                
                <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm mb-10">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium">{t.cropDetails}</h3>
                    <button 
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center text-primary hover:underline"
                    >
                      <Filter className="h-4 w-4 mr-1" />
                      {showFilters ? t.filtersHide : t.filtersShow}
                    </button>
                  </div>

                  {/* Basic Crop Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.cropName}</label>
                      <select
                        value={cropType}
                        onChange={(e) => setCropType(e.target.value)}
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      >
                        <option value="">{t.selectCropType}</option>
                        <option value="wheat">{t.wheat}</option>
                        <option value="rice">{t.rice}</option>
                        <option value="maize">{t.maize}</option>
                        <option value="pulses">{t.pulses}</option>
                        <option value="oilseeds">{t.oilseeds}</option>
                        <option value="vegetables">{t.vegetables}</option>
                        <option value="fruits">{t.fruits}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.cropQuantity}</label>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Advanced Filters */}
                  {showFilters && (
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 animate-fade-in`}>
                      <div>
                        <label className="block text-sm font-medium mb-2">{t.cropPesticides}</label>
                        <select 
                          className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        >
                          <option value="none">{language === "english" ? "None" : "कोई नहीं"}</option>
                          <option value="organic">{language === "english" ? "Organic Pesticides" : "जैविक कीटनाशक"}</option>
                          <option value="chemical">{language === "english" ? "Chemical Pesticides" : "रासायनिक कीटनाशक"}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">{t.cropQuality}</label>
                        <select
                          className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        >
                          <option value="premium">{language === "english" ? "Premium" : "प्रीमियम"}</option>
                          <option value="standard">{language === "english" ? "Standard" : "मानक"}</option>
                          <option value="economy">{language === "english" ? "Economy" : "इकॉनोमी"}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">{t.pickupDate}</label>
                        <input
                          type="date"
                          className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Location Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.pickupLocation}</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder={language === "english" ? "Enter pickup location" : "पिकअप स्थान दर्ज करें"}
                          className="w-full py-2 pl-10 pr-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.dropLocation}</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder={language === "english" ? "Enter drop location" : "डिलीवरी स्थान दर्ज करें"}
                          className="w-full py-2 pl-10 pr-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
                      {t.findVehicles}
                    </button>
                  </div>
                </div>

                {/* Transport Recommendations */}
                <div className="mb-10">
                  <h3 className="text-xl font-medium mb-4">{t.suggestedVehicles}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map((vehicle) => (
                      <div key={vehicle.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all card-hover-effect">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={vehicle.image} 
                            alt={vehicle.name} 
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-lg font-medium">{vehicle.name}</h4>
                            <div className="bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-md text-sm font-medium">
                              {vehicle.rating} ★
                            </div>
                          </div>
                          
                          <div className="flex items-center text-muted-foreground mb-2">
                            <User className="h-4 w-4 mr-1" />
                            <span className="text-sm">{vehicle.driverName}</span>
                          </div>
                          
                          <div className="flex items-center text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{vehicle.location} • {vehicle.distance} {t.kmAway}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center">
                              <Truck className="h-4 w-4 text-primary mr-2" />
                              <span className="text-sm">{vehicle.vehicleType}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-primary mr-2" />
                              <span className="text-sm">{vehicle.capacity}</span>
                            </div>
                            <div className="flex items-center col-span-2">
                              <CreditCard className="h-4 w-4 text-primary mr-2" />
                              <span className="text-sm">{vehicle.costPerKm} {language === "english" ? "per km" : "प्रति किमी"}</span>
                            </div>
                          </div>
                          
                          <button 
                            className={`w-full py-2 rounded-lg font-medium transition-colors ${
                              vehicle.available
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                            }`}
                            disabled={!vehicle.available}
                          >
                            {t.contactNow}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transport Sharing Tab */}
          {activeTab === "sharing" && (
            <div className="animate-fade-in">
              <div className="mb-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-medium mb-2">{t.sharingTitle}</h2>
                    <p className="text-muted-foreground">{t.sharingSubtitle}</p>
                  </div>
                  <div className="flex space-x-4 mt-4 md:mt-0">
                    <button className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
                      {t.viewRequests}
                    </button>
                    <button className="px-4 py-2 bg-card border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors">
                      {t.createRequest}
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {sharedRequests.map((request) => (
                    <div key={request.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={request.image} 
                          alt={request.name} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-medium mb-2">{request.name}</h3>
                        <div className="flex items-center text-muted-foreground mb-2">
                          <User className="h-4 w-4 mr-1" />
                          <span className="text-sm">{request.farmerName}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm">{request.fromLocation}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm">{request.toLocation}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm">{request.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Truck className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm">{request.quantity}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-muted-foreground text-sm">
                            {language === "english" ? "Price:" : "कीमत:"} <span className="font-medium text-foreground">{request.price}</span>
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {language === "english" ? "Seats available:" : "उपलब्ध सीटें:"} <span className="font-medium text-foreground">{request.seatsAvailable}</span>
                          </div>
                        </div>
                        
                        <button className="w-full py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
                          {t.contactNow}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Shipment Tracking Tab */}
          {activeTab === "tracking" && (
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-medium mb-6">{language === "english" ? "Shipment Tracking" : "शिपमेंट ट्रैकिंग"}</h2>
              <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground mb-4">{language === "english" ? "This section is under development. Check back soon for more content!" : "यह अनुभाग विकास के अधीन है। अधिक सामग्री के लिए जल्द ही वापस आएं!"}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Transportation;
