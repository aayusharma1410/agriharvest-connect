
import { useState, useEffect } from "react";
import { 
  Wheat, Search, Filter, Scissors, PackageOpen, 
  Scale, BarChart3, BadgeDollarSign, ShoppingCart, 
  Brain, Database, Leaf, CookingPot, Factory, 
  Warehouse, Truck, Award
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const ProcessingTechniqueCard = ({ title, icon: Icon, description, state, delay = 0 }) => (
  <Card className="card-hover-effect border-border bg-card animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
    <div className="p-6 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className="bg-primary/10 p-2 rounded-lg mr-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <p className="text-muted-foreground mb-4 text-sm flex-grow">{description}</p>
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
        <span className="text-xs bg-secondary/30 text-secondary-foreground px-2 py-1 rounded">
          {state}
        </span>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
          Learn more
        </Button>
      </div>
    </div>
  </Card>
);

const CropProcessing = () => {
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [activeTab, setActiveTab] = useState("techniques");

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'hindi') {
      setLanguage('hindi');
    }

    // Language change listener
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

  const translations = {
    english: {
      pageTitle: "Crop Processing",
      search: "Search techniques, methods, etc.",
      stateSelect: "Select State",
      allStates: "All States",
      tabTechniques: "Processing Techniques",
      tabGrading: "Grading & Sorting",
      tabValueAddition: "Value Addition",
      tabMarketLinkage: "Market Linkage",
      filter: "Filter",
      noResults: "No results found",
      learn: "Learn more",
    },
    hindi: {
      pageTitle: "फसल प्रसंस्करण",
      search: "तकनीकों, विधियों आदि की खोज करें",
      stateSelect: "राज्य चुनें",
      allStates: "सभी राज्य",
      tabTechniques: "प्रसंस्करण तकनीक",
      tabGrading: "ग्रेडिंग और छँटाई",
      tabValueAddition: "मूल्य संवर्धन",
      tabMarketLinkage: "बाज़ार लिंकेज",
      filter: "फ़िल्टर",
      noResults: "कोई परिणाम नहीं मिला",
      learn: "और जानें",
    }
  };

  const t = translations[language];

  const processingTechniques = [
    {
      title: language === "english" ? "Drying & Dehydration" : "सुखाने और निर्जलीकरण",
      icon: Wheat,
      description: language === "english" 
        ? "Traditional and modern techniques for drying crops to preserve them longer."
        : "फसलों को लंबे समय तक संरक्षित करने के लिए पारंपरिक और आधुनिक सुखाने की तकनीकें।",
      state: "Maharashtra",
      category: "techniques"
    },
    {
      title: language === "english" ? "Milling & Grinding" : "मिलिंग और पीसना",
      icon: Factory,
      description: language === "english"
        ? "Converting grains into flour and other milled products efficiently."
        : "अनाज को आटे और अन्य पीसे हुए उत्पादों में कुशलतापूर्वक परिवर्तित करना।",
      state: "Punjab",
      category: "techniques"
    },
    {
      title: language === "english" ? "Packaging Solutions" : "पैकेजिंग समाधान",
      icon: PackageOpen,
      description: language === "english"
        ? "Modern and eco-friendly packaging to extend shelf life and appeal."
        : "शेल्फ लाइफ और आकर्षण बढ़ाने के लिए आधुनिक और पर्यावरण अनुकूल पैकेजिंग।",
      state: "Gujarat",
      category: "techniques"
    },
    {
      title: language === "english" ? "Cold Storage" : "शीत भंडारण",
      icon: Warehouse,
      description: language === "english"
        ? "Temperature-controlled storage to preserve fresh produce longer."
        : "ताजा उपज को लंबे समय तक संरक्षित करने के लिए तापमान-नियंत्रित भंडारण।",
      state: "Uttar Pradesh",
      category: "techniques"
    },
    {
      title: language === "english" ? "AI-Based Sorting" : "AI-आधारित छंटाई",
      icon: Brain,
      description: language === "english"
        ? "Computer vision systems that automatically sort crops by quality, size, and color."
        : "कंप्यूटर विजन सिस्टम जो स्वचालित रूप से गुणवत्ता, आकार और रंग के अनुसार फसलों को छांटते हैं।",
      state: "Karnataka",
      category: "grading"
    },
    {
      title: language === "english" ? "Quality Grading Standards" : "गुणवत्ता ग्रेडिंग मानक",
      icon: Award,
      description: language === "english"
        ? "Implementation of national and international standards for crop quality assessment."
        : "फसल गुणवत्ता मूल्यांकन के लिए राष्ट्रीय और अंतरराष्ट्रीय मानकों का कार्यान्वयन।",
      state: "Tamil Nadu",
      category: "grading"
    },
    {
      title: language === "english" ? "Manual Sorting Best Practices" : "मैनुअल छंटाई के सर्वोत्तम अभ्यास",
      icon: Scissors,
      description: language === "english"
        ? "Efficient techniques for hand-sorting crops to maximize quality and value."
        : "गुणवत्ता और मूल्य को अधिकतम करने के लिए फसलों को हाथ से छांटने की कुशल तकनीकें।",
      state: "Rajasthan",
      category: "grading"
    },
    {
      title: language === "english" ? "Weight & Measurement Standards" : "वजन और माप मानक",
      icon: Scale,
      description: language === "english"
        ? "Accurate and fair weighing systems compliant with government regulations."
        : "सरकारी नियमों के अनुरूप सटीक और निष्पक्ष वजन प्रणाली।",
      state: "Haryana",
      category: "grading"
    },
    {
      title: language === "english" ? "Flour & Grain Products" : "आटा और अनाज उत्पाद",
      icon: Wheat,
      description: language === "english"
        ? "Value-added processing for wheat, rice, millets and other grains."
        : "गेहूं, चावल, बाजरा और अन्य अनाजों के लिए मूल्य वर्धित प्रसंस्करण।",
      state: "Madhya Pradesh",
      category: "valueAddition"
    },
    {
      title: language === "english" ? "Pickle & Preserve Making" : "अचार और परिरक्षित बनाना",
      icon: CookingPot,
      description: language === "english"
        ? "Traditional and modern methods for creating preserved food products from fresh produce."
        : "ताजी उपज से संरक्षित खाद्य उत्पाद बनाने के लिए पारंपरिक और आधुनिक तरीके।",
      state: "Bihar",
      category: "valueAddition"
    },
    {
      title: language === "english" ? "Juice & Pulp Processing" : "जूस और पल्प प्रोसेसिंग",
      icon: Leaf,
      description: language === "english"
        ? "Equipment and techniques for extracting and packaging fruit juices and pulps."
        : "फलों के रस और पल्प को निकालने और पैकेजिंग के लिए उपकरण और तकनीकें।",
      state: "Andhra Pradesh",
      category: "valueAddition"
    },
    {
      title: language === "english" ? "Spice Processing" : "मसाला प्रसंस्करण",
      icon: CookingPot,
      description: language === "english"
        ? "Methods for cleaning, drying, grinding and packaging spices for maximum value."
        : "अधिकतम मूल्य के लिए मसालों की सफाई, सुखाने, पीसने और पैकेजिंग के तरीके।",
      state: "Kerala",
      category: "valueAddition"
    },
    {
      title: language === "english" ? "Direct Farm-to-Consumer" : "सीधे किसान-से-उपभोक्ता",
      icon: Truck,
      description: language === "english"
        ? "Platforms and strategies to sell processed products directly to consumers."
        : "प्रसंस्कृत उत्पादों को सीधे उपभोक्ताओं को बेचने के लिए प्लेटफॉर्म और रणनीतियां।",
      state: "Telangana",
      category: "marketLinkage"
    },
    {
      title: language === "english" ? "Retail Partnership Models" : "खुदरा साझेदारी मॉडल",
      icon: ShoppingCart,
      description: language === "english"
        ? "How to establish successful partnerships with retailers for processed products."
        : "प्रसंस्कृत उत्पादों के लिए खुदरा विक्रेताओं के साथ सफल साझेदारी कैसे स्थापित करें।",
      state: "West Bengal",
      category: "marketLinkage"
    },
    {
      title: language === "english" ? "Export Compliance" : "निर्यात अनुपालन",
      icon: Database,
      description: language === "english"
        ? "Certification and standards required to export processed agricultural products."
        : "प्रसंस्कृत कृषि उत्पादों के निर्यात के लिए आवश्यक प्रमाणीकरण और मानक।",
      state: "Odisha",
      category: "marketLinkage"
    },
    {
      title: language === "english" ? "Price Prediction AI" : "मूल्य भविष्यवाणी AI",
      icon: BarChart3,
      description: language === "english"
        ? "AI tools to predict market prices and identify the best times to sell."
        : "बाजार मूल्यों की भविष्यवाणी करने और बेचने के लिए सबसे अच्छे समय की पहचान करने के लिए AI उपकरण।",
      state: "Assam",
      category: "marketLinkage"
    },
  ];

  // Filter by search query, selected state, and active tab
  const filteredProcessingTechniques = processingTechniques.filter(technique => {
    const matchesSearch = technique.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          technique.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === "" || technique.state === selectedState;
    
    // Map tab names to categories
    const categoryMap = {
      techniques: "techniques",
      grading: "grading",
      valueAddition: "valueAddition",
      marketLinkage: "marketLinkage"
    };
    
    const matchesTab = technique.category === categoryMap[activeTab];
    
    return matchesSearch && matchesState && matchesTab;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">{t.pageTitle}</h1>
          
          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder={t.search}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-64">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder={t.stateSelect} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{t.allStates}</SelectItem>
                  {indianStates.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {t.filter}
            </Button>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="techniques" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 mx-auto">
              <TabsTrigger value="techniques">{t.tabTechniques}</TabsTrigger>
              <TabsTrigger value="grading">{t.tabGrading}</TabsTrigger>
              <TabsTrigger value="valueAddition">{t.tabValueAddition}</TabsTrigger>
              <TabsTrigger value="marketLinkage">{t.tabMarketLinkage}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="techniques" className="mt-6">
              <div className="card-grid">
                {filteredProcessingTechniques.length > 0 ? (
                  filteredProcessingTechniques.map((technique, index) => (
                    <ProcessingTechniqueCard 
                      key={index} 
                      {...technique} 
                      delay={index * 100}
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground py-12">{t.noResults}</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="grading" className="mt-6">
              <div className="card-grid">
                {filteredProcessingTechniques.length > 0 ? (
                  filteredProcessingTechniques.map((technique, index) => (
                    <ProcessingTechniqueCard 
                      key={index} 
                      {...technique} 
                      delay={index * 100}
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground py-12">{t.noResults}</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="valueAddition" className="mt-6">
              <div className="card-grid">
                {filteredProcessingTechniques.length > 0 ? (
                  filteredProcessingTechniques.map((technique, index) => (
                    <ProcessingTechniqueCard 
                      key={index} 
                      {...technique} 
                      delay={index * 100}
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground py-12">{t.noResults}</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="marketLinkage" className="mt-6">
              <div className="card-grid">
                {filteredProcessingTechniques.length > 0 ? (
                  filteredProcessingTechniques.map((technique, index) => (
                    <ProcessingTechniqueCard 
                      key={index} 
                      {...technique} 
                      delay={index * 100}
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground py-12">{t.noResults}</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CropProcessing;
