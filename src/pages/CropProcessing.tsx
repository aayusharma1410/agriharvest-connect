
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  ArrowRight, 
  User, 
  Star, 
  ChevronDown, 
  ChevronUp,
  MapPin as LocationIcon,
  Clock as ClockIcon,
  Zap as ZapIcon,
  ThumbsUp,
  BarChart
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CropProcessing = () => {
  const [activeTab, setActiveTab] = useState("techniques");
  const [isLoaded, setIsLoaded] = useState(false);
  const [cropType, setCropType] = useState("");
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

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

  // Toggle FAQ item
  const toggleFaq = (id: number) => {
    if (expandedFaqs.includes(id)) {
      setExpandedFaqs(expandedFaqs.filter(item => item !== id));
    } else {
      setExpandedFaqs([...expandedFaqs, id]);
    }
  };

  // Multilingual content
  const content = {
    english: {
      pageTitle: "Crop Processing",
      heroSubtitle: "Maximize value and minimize waste with modern processing techniques",
      searchPlaceholder: "Search processing techniques, equipment...",
      tabTechniques: "Processing Techniques",
      tabGrading: "Grading & Sorting",
      tabValueAddition: "Value Addition",
      tabMarketLinkage: "Market Linkage",
      selectCropType: "Select crop type",
      wheat: "Wheat",
      rice: "Rice",
      maize: "Maize",
      pulses: "Pulses",
      oilseeds: "Oilseeds",
      vegetables: "Vegetables",
      fruits: "Fruits",
      searchButton: "Search",
      sharingTitle: "Processing Equipment Sharing",
      sharingSubtitle: "Share equipment with neighboring farmers and reduce costs",
      viewRequests: "View Requests",
      offerEquipment: "Offer Equipment",
      faqTitle: "Frequently Asked Questions",
      faqSeeMore: "See more",
      faqSeeLess: "See less",
      viewAll: "View All",
      successStories: "Success Stories",
      kmAway: "km away",
      capacity: "Capacity",
      available: "Available",
      unavailable: "Unavailable",
      contactNow: "Contact Now",
      viewDetails: "View Details"
    },
    hindi: {
      pageTitle: "फसल प्रसंस्करण",
      heroSubtitle: "आधुनिक प्रसंस्करण तकनीकों के साथ मूल्य अधिकतम करें और अपशिष्ट को कम करें",
      searchPlaceholder: "प्रसंस्करण तकनीक, उपकरण खोजें...",
      tabTechniques: "प्रसंस्करण तकनीक",
      tabGrading: "ग्रेडिंग और छंटाई",
      tabValueAddition: "मूल्य संवर्धन",
      tabMarketLinkage: "बाजार संपर्क",
      selectCropType: "फसल प्रकार चुनें",
      wheat: "गेहूं",
      rice: "चावल",
      maize: "मक्का",
      pulses: "दालें",
      oilseeds: "तिलहन",
      vegetables: "सब्जियां",
      fruits: "फल",
      searchButton: "खोजें",
      sharingTitle: "प्रसंस्करण उपकरण साझाकरण",
      sharingSubtitle: "पड़ोसी किसानों के साथ उपकरण साझा करें और लागत कम करें",
      viewRequests: "अनुरोध देखें",
      offerEquipment: "उपकरण की पेशकश करें",
      faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
      faqSeeMore: "और देखें",
      faqSeeLess: "कम देखें",
      viewAll: "सभी देखें",
      successStories: "सफलता की कहानियां",
      kmAway: "किमी दूर",
      capacity: "क्षमता",
      available: "उपलब्ध",
      unavailable: "अनुपलब्ध",
      contactNow: "अभी संपर्क करें",
      viewDetails: "विवरण देखें"
    }
  };

  // Set the current language content
  const t = language === "english" ? content.english : content.hindi;

  // Processing Techniques Data
  const processingTechniques = [
    {
      id: 1,
      title: language === "english" ? "Wheat Threshing & Milling" : "गेहूं थ्रेशिंग और मिलिंग",
      description: language === "english" 
        ? "Modern techniques for separating grains and converting to flour with minimal waste" 
        : "न्यूनतम अपशिष्ट के साथ अनाज को अलग करने और आटे में परिवर्तित करने के लिए आधुनिक तकनीकें",
      image: "/placeholder.svg",
      equipmentNeeded: language === "english" ? "Thresher, Flour Mill" : "थ्रेशर, आटा चक्की",
      averageCost: "₹2-3 per kg",
      yieldImprovement: "15-20%"
    },
    {
      id: 2,
      title: language === "english" ? "Fruit Pulping & Juicing" : "फल पल्पिंग और जूसिंग",
      description: language === "english"
        ? "Extract juices and pulp from fruits to extend shelf life and create value-added products" 
        : "शेल्फ लाइफ बढ़ाने और मूल्य वर्धित उत्पाद बनाने के लिए फलों से रस और गूदा निकालें",
      image: "/placeholder.svg",
      equipmentNeeded: language === "english" ? "Pulper, Juicer, Pasteurizer" : "पल्पर, जूसर, पाश्चुराइज़र",
      averageCost: "₹5-8 per kg",
      yieldImprovement: "25-30%"
    },
    {
      id: 3,
      title: language === "english" ? "Spice Grinding & Packaging" : "मसाला पीसना और पैकेजिंग",
      description: language === "english"
        ? "Clean, dry, grind and package spices to preserve aroma and increase market value" 
        : "सुगंध को संरक्षित करने और बाजार मूल्य बढ़ाने के लिए मसालों को साफ, सूखा, पीसना और पैकेज करना",
      image: "/placeholder.svg",
      equipmentNeeded: language === "english" ? "Dryer, Grinder, Packaging Machine" : "ड्रायर, ग्राइंडर, पैकेजिंग मशीन",
      averageCost: "₹10-15 per kg",
      yieldImprovement: "40-50%"
    }
  ];

  // Shared Equipment Offers
  const sharedEquipment = [
    {
      id: 1,
      name: language === "english" ? "Rice Huller Machine" : "चावल हलर मशीन",
      owner: language === "english" ? "Rajesh Kumar" : "राजेश कुमार",
      location: language === "english" ? "Bhopal, MP" : "भोपाल, एमपी",
      distance: "5.2",
      rate: "₹200/hour",
      capacity: language === "english" ? "50kg/hour" : "50 किग्रा/घंटा",
      available: true,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: language === "english" ? "Industrial Food Dehydrator" : "औद्योगिक फूड डिहाइड्रेटर",
      owner: language === "english" ? "Anita Singh" : "अनीता सिंह",
      location: language === "english" ? "Indore, MP" : "इंदौर, एमपी",
      distance: "8.7",
      rate: "₹350/hour",
      capacity: language === "english" ? "25kg/batch" : "25 किग्रा/बैच",
      available: true,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: language === "english" ? "Oil Press Machine" : "तेल निकालने की मशीन",
      owner: language === "english" ? "Mahesh Patel" : "महेश पटेल",
      location: language === "english" ? "Ujjain, MP" : "उज्जैन, एमपी",
      distance: "12.3",
      rate: "₹250/hour",
      capacity: language === "english" ? "30kg/hour" : "30 किग्रा/घंटा",
      available: false,
      image: "/placeholder.svg"
    }
  ];

  // FAQs
  const faqs = [
    {
      id: 1,
      question: language === "english" 
        ? "What is the best way to process tomatoes for longer shelf life?" 
        : "लंबे शेल्फ जीवन के लिए टमाटर को संसाधित करने का सबसे अच्छा तरीका क्या है?",
      answer: language === "english"
        ? "For longer shelf life, consider sun-drying, making puree or sauce, or freezing them in portions. Each method preserves the nutritional value and flavor differently."
        : "लंबे शेल्फ जीवन के लिए, सूर्य-सुखाना, प्यूरी या सॉस बनाना, या उन्हें हिस्सों में फ्रीज करना विचार करें। प्रत्येक विधि पोषण मूल्य और स्वाद को अलग तरह से संरक्षित करती है।"
    },
    {
      id: 2,
      question: language === "english" 
        ? "How can I set up a small-scale flour mill in my village?"
        : "मैं अपने गांव में एक छोटे पैमाने पर आटा चक्की कैसे स्थापित कर सकता हूं?",
      answer: language === "english"
        ? "To set up a small-scale flour mill, you'll need a suitable location, processing equipment (mill, sifter, packaging unit), necessary licenses, and initial capital of about ₹2-5 lakhs. Government subsidies are available under various schemes."
        : "एक छोटे पैमाने पर आटा चक्की स्थापित करने के लिए, आपको एक उपयुक्त स्थान, प्रसंस्करण उपकरण (मिल, छलनी, पैकेजिंग इकाई), आवश्यक लाइसेंस और लगभग ₹2-5 लाख की प्रारंभिक पूंजी की आवश्यकता होगी। विभिन्न योजनाओं के तहत सरकारी सब्सिडी उपलब्ध है।"
    },
    {
      id: 3,
      question: language === "english" 
        ? "What are the minimum requirements for organic certification of processed foods?"
        : "प्रसंस्कृत खाद्य पदार्थों के जैविक प्रमाणन के लिए न्यूनतम आवश्यकताएं क्या हैं?",
      answer: language === "english"
        ? "For organic certification of processed foods, you need to ensure all ingredients are certified organic, maintain proper separation from non-organic products, use approved processing methods and additives, and undergo regular inspections by accredited certification bodies."
        : "प्रसंस्कृत खाद्य पदार्थों के जैविक प्रमाणन के लिए, आपको यह सुनिश्चित करना होगा कि सभी सामग्री प्रमाणित जैविक है, गैर-जैविक उत्पादों से उचित अलगाव बनाए रखें, अनुमोदित प्रसंस्करण विधियों और योजकों का उपयोग करें, और मान्यता प्राप्त प्रमाणन निकायों द्वारा नियमित निरीक्षण से गुजरें।"
    }
  ];

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
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-10 pr-20 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-md font-medium text-sm">
                  {t.searchButton}
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
              onClick={() => setActiveTab("techniques")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "techniques" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t.tabTechniques}
            </button>
            <button
              onClick={() => setActiveTab("grading")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "grading" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t.tabGrading}
            </button>
            <button
              onClick={() => setActiveTab("valueAddition")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "valueAddition" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t.tabValueAddition}
            </button>
            <button
              onClick={() => setActiveTab("marketLinkage")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "marketLinkage" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t.tabMarketLinkage}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-16 bg-background flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Processing Techniques Tab */}
          {activeTab === "techniques" && (
            <div className="animate-fade-in">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-medium mb-6">{t.tabTechniques}</h2>
                
                <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm mb-10">
                  <h3 className="text-xl font-medium mb-4">{t.selectCropType}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

                    <button className="bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors md:col-span-1">
                      <Filter className="inline-block mr-2 h-4 w-4" />
                      {t.searchButton}
                    </button>
                  </div>
                </div>

                {/* Processing Techniques Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {processingTechniques.map((technique) => (
                    <div key={technique.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all card-hover-effect">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={technique.image} 
                          alt={technique.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <h4 className="text-lg font-medium mb-2">{technique.title}</h4>
                        <p className="text-muted-foreground mb-4">{technique.description}</p>
                        
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm">{technique.equipmentNeeded}</span>
                          </div>
                          <div className="flex items-center">
                            <LocationIcon className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm">{technique.averageCost}</span>
                          </div>
                          <div className="flex items-center col-span-2">
                            <BarChart className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm">{technique.yieldImprovement} {language === "english" ? "yield improvement" : "उपज में वृद्धि"}</span>
                          </div>
                        </div>
                        
                        <button className="w-full py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-colors">
                          {t.viewDetails}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Equipment Sharing Section */}
                <div className="bg-primary/5 rounded-xl p-6 md:p-8 mb-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-medium mb-2">{t.sharingTitle}</h3>
                      <p className="text-muted-foreground">{t.sharingSubtitle}</p>
                    </div>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                      <button className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
                        {t.viewRequests}
                      </button>
                      <button className="px-4 py-2 bg-card border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors">
                        {t.offerEquipment}
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {sharedEquipment.map((item) => (
                      <div key={item.id} className="bg-card rounded-lg border border-border overflow-hidden shadow-sm">
                        <div className="h-36 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="text-base font-medium mb-1">{item.name}</h4>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <User className="h-3 w-3 mr-1" />
                            <span>{item.owner}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-3">
                            <LocationIcon className="h-3 w-3 mr-1" />
                            <span>{item.location} • {item.distance} {t.kmAway}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">{language === "english" ? "Rate:" : "दर:"}</span>
                              <span className="ml-1 font-medium">{item.rate}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">{t.capacity}:</span>
                              <span className="ml-1 font-medium">{item.capacity}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${item.available ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'}`}>
                              {item.available ? t.available : t.unavailable}
                            </span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                              <Star className="h-3 w-3 text-yellow-500" />
                            </div>
                          </div>
                          
                          <button 
                            className={`w-full py-2 rounded-lg font-medium transition-colors ${
                              item.available
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                            }`}
                            disabled={!item.available}
                          >
                            {t.contactNow}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQs Section */}
                <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
                  <h3 className="text-xl font-medium mb-6">{t.faqTitle}</h3>
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <div key={faq.id} className="border border-border rounded-lg overflow-hidden">
                        <button
                          className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-muted/50 transition-colors"
                          onClick={() => toggleFaq(faq.id)}
                        >
                          <span>{faq.question}</span>
                          {expandedFaqs.includes(faq.id) ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </button>
                        
                        <div 
                          className={`px-4 overflow-hidden transition-all duration-300 ${
                            expandedFaqs.includes(faq.id) 
                              ? "max-h-80 pb-4" 
                              : "max-h-0"
                          }`}
                        >
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Link to="/faqs" className="text-primary hover:underline inline-flex items-center">
                      {t.viewAll}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grading & Sorting Tab */}
          {activeTab === "grading" && (
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-medium mb-6">{t.tabGrading}</h2>
              <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="mb-3">
                      <ZapIcon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">{language === "english" ? "Manual Sorting" : "मैनुअल छंटाई"}</h3>
                    <p className="text-muted-foreground">{language === "english" ? "Cost-effective techniques for small-scale sorting and grading of produce" : "उपज की छोटे पैमाने पर छंटाई और ग्रेडिंग के लिए किफायती तकनीकें"}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="mb-3">
                      <ZapIcon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">{language === "english" ? "Mechanical Grading" : "मैकेनिकल ग्रेडिंग"}</h3>
                    <p className="text-muted-foreground">{language === "english" ? "Medium to large-scale mechanical sorters for faster processing" : "तेज़ प्रसंस्करण के लिए मध्यम से बड़े पैमाने पर यांत्रिक सॉर्टर"}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="mb-3">
                      <ZapIcon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">{language === "english" ? "AI-Powered Sorting" : "AI-संचालित छंटाई"}</h3>
                    <p className="text-muted-foreground">{language === "english" ? "Advanced image recognition for precise quality grading" : "सटीक गुणवत्ता ग्रेडिंग के लिए उन्नत छवि पहचान"}</p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground mb-4">{language === "english" ? "This section is under development. Check back soon for more content!" : "यह अनुभाग विकास के अधीन है। अधिक सामग्री के लिए जल्द ही वापस आएं!"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Value Addition Tab */}
          {activeTab === "valueAddition" && (
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-medium mb-6">{t.tabValueAddition}</h2>
              <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm">
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground mb-4">{language === "english" ? "This section is under development. Check back soon for more content!" : "यह अनुभाग विकास के अधीन है। अधिक सामग्री के लिए जल्द ही वापस आएं!"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Market Linkage Tab */}
          {activeTab === "marketLinkage" && (
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-medium mb-6">{t.tabMarketLinkage}</h2>
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

export default CropProcessing;
