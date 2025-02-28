
import { useState, useEffect } from "react";
import { Microscope, Tag, TrendingUp, ShoppingCart, ArrowRight, Leaf, Image, BarChart, Send } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

const CropProcessing = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("techniques");
  const [cropType, setCropType] = useState("");
  const [processingType, setProcessingType] = useState("");
  const [cropImage, setCropImage] = useState<File | null>(null);
  const [cropImagePreview, setCropImagePreview] = useState<string | null>(null);
  const [imageAnalysisResult, setImageAnalysisResult] = useState<any>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCropImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCropImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    // Mock image analysis result
    setImageAnalysisResult({
      quality: "Premium Grade",
      defects: "None detected",
      size: "Large",
      estimatedMarketValue: "₹55-60 per kg",
      recommendations: "Suitable for export markets"
    });
  };

  const processingTechniques = [
    {
      id: 1,
      title: "Crop Drying",
      description: "Reduce moisture content to prevent mold and bacterial growth during storage.",
      steps: ["Clean the crop thoroughly", "Spread evenly on a clean surface", "Ensure good air circulation", "Store when moisture content is below 12%"],
      crops: ["Grains", "Pulses", "Spices"]
    },
    {
      id: 2,
      title: "Washing & Cleaning",
      description: "Remove dirt, pesticides, and contaminants to improve quality and safety.",
      steps: ["Use clean potable water", "Add sanitizer if needed", "Rinse thoroughly", "Dry properly before packaging"],
      crops: ["Fruits", "Vegetables", "Root crops"]
    },
    {
      id: 3,
      title: "Milling & Grinding",
      description: "Convert grains and spices into flour or powder for value addition.",
      steps: ["Clean the crop thoroughly", "Adjust mill settings for desired texture", "Sieve after grinding for uniformity", "Package immediately after processing"],
      crops: ["Wheat", "Rice", "Maize", "Spices"]
    },
    {
      id: 4,
      title: "Packaging",
      description: "Protect processed crops from contamination and extend shelf life.",
      steps: ["Select appropriate packaging material", "Ensure product is completely cool before packaging", "Label with production and expiry dates", "Store in a cool, dry place"],
      crops: ["All processed foods"]
    }
  ];

  const valueAdditionMethods = [
    {
      id: 1,
      title: "Wheat to Flour Processing",
      rawCrop: "Wheat",
      processedProduct: "Wheat Flour, Semolina, Wheat Germ",
      valueIncrement: "30-45%",
      investmentRequired: "Medium",
      difficulty: "Low to Medium",
      popularity: "High"
    },
    {
      id: 2,
      title: "Tomato Processing",
      rawCrop: "Tomatoes",
      processedProduct: "Puree, Ketchup, Dried Tomatoes, Tomato Paste",
      valueIncrement: "80-120%",
      investmentRequired: "Medium to High",
      difficulty: "Medium",
      popularity: "High"
    },
    {
      id: 3,
      title: "Fruit Preservation",
      rawCrop: "Mangoes, Apples, Berries",
      processedProduct: "Jams, Jellies, Dried Fruits, Fruit Juices",
      valueIncrement: "70-150%",
      investmentRequired: "Low to Medium",
      difficulty: "Low to Medium",
      popularity: "High"
    },
    {
      id: 4,
      title: "Pulse Processing",
      rawCrop: "Chickpeas, Lentils, Beans",
      processedProduct: "Split Pulses, Flour, Ready-to-Cook Mixes",
      valueIncrement: "25-50%",
      investmentRequired: "Low to Medium",
      difficulty: "Low",
      popularity: "Medium"
    }
  ];

  const marketLinkages = [
    {
      id: 1,
      buyerName: "FreshExport Ltd.",
      cropType: "Fruits & Vegetables",
      requirements: "Premium grade, Organic certification preferred",
      priceRange: "10-15% above market rate",
      quantityNeeded: "500-1000 kg weekly",
      location: "Delhi/NCR",
      contactInfo: "freshexport@example.com"
    },
    {
      id: 2,
      buyerName: "JaiKisan Foods",
      cropType: "Grains & Pulses",
      requirements: "Standard quality, Moisture content <12%",
      priceRange: "Market rate + ₹2/kg",
      quantityNeeded: "2000-5000 kg monthly",
      location: "Punjab & Haryana",
      contactInfo: "procurement@jaikisan.com"
    },
    {
      id: 3,
      buyerName: "Organic Valley",
      cropType: "All Certified Organic Crops",
      requirements: "Organic certification mandatory, No chemical treatments",
      priceRange: "30-50% premium over conventional",
      quantityNeeded: "Variable based on crop",
      location: "Pan India",
      contactInfo: "buyorg@organicvalley.in"
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
              Crop Processing
            </div>
            <h1 className="text-4xl md:text-5xl font-medium mb-4 text-balance text-gradient">
              Transform Your Crops, Maximize Value
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
              Learn advanced processing techniques, grading methods, and value addition
              strategies to increase your farm income and reduce post-harvest losses.
            </p>
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
              Processing Techniques
            </button>
            <button
              onClick={() => setActiveTab("grading")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "grading" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Grading & Sorting
            </button>
            <button
              onClick={() => setActiveTab("valueAddition")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "valueAddition" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Value Addition Methods
            </button>
            <button
              onClick={() => setActiveTab("marketLinkage")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === "marketLinkage" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Market Linkage
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
                <h2 className="text-2xl md:text-3xl font-medium mb-6">Processing Techniques for Better Shelf Life</h2>
                <p className="text-muted-foreground mb-8">
                  Proper processing techniques help preserve crop quality, extend shelf life, and increase market value.
                  Choose the right method based on your crop type and target market.
                </p>

                <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm card-gradient mb-10">
                  <h3 className="text-xl font-medium mb-4">Find Recommended Processing Methods</h3>
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
                        <option value="spices">Spices</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Processing Type</label>
                      <select
                        value={processingType}
                        onChange={(e) => setProcessingType(e.target.value)}
                        className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      >
                        <option value="">Select processing type</option>
                        <option value="drying">Drying</option>
                        <option value="cleaning">Washing & Cleaning</option>
                        <option value="milling">Milling & Grinding</option>
                        <option value="packaging">Packaging</option>
                        <option value="preservation">Preservation</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors hover-lift">
                      <Microscope className="inline-block mr-2 h-5 w-5" />
                      Get Processing Recommendations
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {processingTechniques.map((technique) => (
                    <div key={technique.id} className="bg-card rounded-xl border border-border p-6 shadow-sm hover-lift">
                      <h3 className="text-xl font-medium mb-3">{technique.title}</h3>
                      <p className="text-muted-foreground mb-4">{technique.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-sm mb-2">Suitable for:</h4>
                        <div className="flex flex-wrap gap-2">
                          {technique.crops.map((crop, idx) => (
                            <span key={idx} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                              {crop}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-2">Key Steps:</h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                          {technique.steps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      </div>
                      
                      <button className="mt-4 w-full py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-colors">
                        Learn More
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Grading & Sorting Tab */}
          {activeTab === "grading" && (
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-medium mb-6">AI-Powered Crop Grading & Sorting</h2>
              <p className="text-muted-foreground mb-8">
                Grading and sorting your crops properly can help you fetch premium prices in the market.
                Our AI-powered image recognition tool helps classify your crops based on quality parameters.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm card-gradient">
                  <h3 className="text-xl font-medium mb-4">AI Crop Quality Assessment</h3>
                  <p className="text-muted-foreground mb-6">
                    Upload an image of your crop sample to get instant AI-powered quality assessment and grading.
                  </p>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Select Crop Type</label>
                    <select
                      value={cropType}
                      onChange={(e) => setCropType(e.target.value)}
                      className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="">Select crop type</option>
                      <option value="wheat">Wheat</option>
                      <option value="rice">Rice</option>
                      <option value="potato">Potato</option>
                      <option value="tomato">Tomato</option>
                      <option value="apple">Apple</option>
                      <option value="mango">Mango</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Upload Crop Image</label>
                    <div 
                      className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => document.getElementById('cropImageInput')?.click()}
                    >
                      {cropImagePreview ? (
                        <img 
                          src={cropImagePreview} 
                          alt="Crop preview" 
                          className="mx-auto max-h-48 object-contain mb-2"
                        />
                      ) : (
                        <div className="py-8">
                          <Image className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">Click to upload an image or drag and drop</p>
                          <p className="text-xs text-muted-foreground mt-1">PNG, JPG or JPEG (max. 5MB)</p>
                        </div>
                      )}
                      <input 
                        id="cropImageInput"
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                  
                  <button 
                    onClick={analyzeImage}
                    disabled={!cropImage || !cropType}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      cropImage && cropType 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    <Microscope className="inline-block mr-2 h-5 w-5" />
                    Analyze Crop Quality
                  </button>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-xl font-medium mb-4">Analysis Results</h3>
                  
                  {imageAnalysisResult ? (
                    <div>
                      <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg">
                        <p className="font-medium">Analysis Complete</p>
                        <p className="text-sm mt-1">Your crop has been successfully analyzed</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <span className="text-muted-foreground">Quality Grade:</span>
                          <span className="font-medium">{imageAnalysisResult.quality}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <span className="text-muted-foreground">Detected Defects:</span>
                          <span className="font-medium">{imageAnalysisResult.defects}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <span className="text-muted-foreground">Size Classification:</span>
                          <span className="font-medium">{imageAnalysisResult.size}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border">
                          <span className="text-muted-foreground">Estimated Market Value:</span>
                          <span className="font-medium">{imageAnalysisResult.estimatedMarketValue}</span>
                        </div>
                        <div className="pt-2">
                          <span className="text-muted-foreground block mb-2">Recommendations:</span>
                          <span className="font-medium">{imageAnalysisResult.recommendations}</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-between">
                        <button className="px-4 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-colors">
                          Download Report
                        </button>
                        <button className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
                          Find Buyers
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-12">
                      <BarChart className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Upload a crop image and analyze to see results</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-6 md:p-8 success-gradient">
                <h3 className="text-xl font-medium mb-4">Manual Grading Guidelines</h3>
                <p className="text-muted-foreground mb-6">
                  Even without AI tools, you can apply these standard grading guidelines to classify your crops:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                    <h4 className="font-medium mb-2">Size Grading</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Use sizing meshes/screens</li>
                      <li>Categorize as Small, Medium, Large, Extra Large</li>
                      <li>Uniform size in each batch increases value</li>
                    </ul>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                    <h4 className="font-medium mb-2">Color & Appearance</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Check for uniform color</li>
                      <li>Look for bruises, spots, or discoloration</li>
                      <li>Grade based on visual appeal</li>
                    </ul>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                    <h4 className="font-medium mb-2">Maturity Assessment</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Check firmness for fruits/vegetables</li>
                      <li>Ensure proper ripening stage</li>
                      <li>Look for signs of over-maturity</li>
                    </ul>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                    <h4 className="font-medium mb-2">Defect Inspection</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Remove damaged, decayed items</li>
                      <li>Check for pest infestation</li>
                      <li>Separate misshapen produce</li>
                    </ul>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                    <h4 className="font-medium mb-2">Moisture Content</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Use moisture meters if available</li>
                      <li>Ensure optimal moisture levels for storage</li>
                      <li>Affects quality grading for grains/cereals</li>
                    </ul>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                    <h4 className="font-medium mb-2">Cleanliness</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Remove dirt, foreign materials</li>
                      <li>Check for chemical residues</li>
                      <li>Ensure proper washing where applicable</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Value Addition Methods Tab */}
          {activeTab === "valueAddition" && (
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-medium mb-6">Value Addition Methods</h2>
              <p className="text-muted-foreground mb-8">
                Transform your raw agricultural produce into processed products to increase shelf life
                and multiply your income. Learn about various value addition methods suitable for small
                and medium-scale farmers.
              </p>

              <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-sm card-gradient mb-10">
                <h3 className="text-xl font-medium mb-6">Benefits of Value Addition</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-background/60 rounded-lg p-4 border border-border">
                    <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                    <h4 className="font-medium mb-1">Increased Income</h4>
                    <p className="text-sm text-muted-foreground">
                      Value-added products can sell for 30-150% more than raw produce, significantly boosting your farm income.
                    </p>
                  </div>
                  <div className="bg-background/60 rounded-lg p-4 border border-border">
                    <Clock className="h-8 w-8 text-amber-600 mb-2" />
                    <h4 className="font-medium mb-1">Extended Shelf Life</h4>
                    <p className="text-sm text-muted-foreground">
                      Processing techniques can extend the shelf life of perishable crops from days to months or even years.
                    </p>
                  </div>
                  <div className="bg-background/60 rounded-lg p-4 border border-border">
                    <ShoppingCart className="h-8 w-8 text-blue-600 mb-2" />
                    <h4 className="font-medium mb-1">Market Diversification</h4>
                    <p className="text-sm text-muted-foreground">
                      Access new markets and customer segments that prefer processed or ready-to-use agricultural products.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-medium mb-4">Popular Value Addition Methods</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/40">
                        <th className="text-left p-3 border-b border-border">Method</th>
                        <th className="text-left p-3 border-b border-border">Raw Crop</th>
                        <th className="text-left p-3 border-b border-border">Processed Products</th>
                        <th className="text-left p-3 border-b border-border">Value Increment</th>
                        <th className="text-left p-3 border-b border-border">Investment</th>
                        <th className="text-left p-3 border-b border-border">Difficulty</th>
                        <th className="text-left p-3 border-b border-border">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {valueAdditionMethods.map((method) => (
                        <tr key={method.id} className="border-b border-border hover:bg-muted/10 transition-colors">
                          <td className="p-3 font-medium">{method.title}</td>
                          <td className="p-3">{method.rawCrop}</td>
                          <td className="p-3">{method.processedProduct}</td>
                          <td className="p-3 text-green-600">{method.valueIncrement}</td>
                          <td className="p-3">{method.investmentRequired}</td>
                          <td className="p-3">{method.difficulty}</td>
                          <td className="p-3">
                            <button className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-lg hover:bg-primary/20 transition-colors">
                              Learn More
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-6 md:p-8 success-gradient">
                <h3 className="text-xl font-medium mb-6">Success Stories: Farmer-led Processing Enterprises</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
                    <div className="flex items-start">
                      <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <Leaf className="h-8 w-8 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg mb-1">Sunita's Spice Enterprise</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Started with processing home-grown turmeric into powder, now selling premium 
                          spice mixes to retail stores across 3 states, increasing profits by 300%.
                        </p>
                        <button className="text-primary text-sm hover:underline flex items-center">
                          <span>Read full story</span>
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
                    <div className="flex items-start">
                      <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mr-4 flex-shrink-0">
                        <Leaf className="h-8 w-8 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg mb-1">Kisaan Fruit Preserves</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          A farmer collective started processing surplus mangoes into jams and chutneys,
                          extending seasonal income and reducing post-harvest losses by 60%.
                        </p>
                        <button className="text-primary text-sm hover:underline flex items-center">
                          <span>Read full story</span>
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Market Linkage Tab */}
          {activeTab === "marketLinkage" && (
            <div className="animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-medium mb-6">Market Linkage</h2>
              <p className="text-muted-foreground mb-8">
                Connect directly with buyers, retailers, and food processing industries to
                sell your crops at better prices. Our AI-powered price prediction helps you
                decide when and where to sell for maximum profits.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm card-gradient">
                  <h3 className="text-xl font-medium mb-4">Available Buyers</h3>
                  <p className="text-muted-foreground mb-6">
                    These buyers are actively looking for quality crops. Contact them directly or request introduction.
                  </p>
                  
                  <div className="space-y-6">
                    {marketLinkages.map((buyer) => (
                      <div key={buyer.id} className="border border-border rounded-lg p-4 bg-card/60">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-medium">{buyer.buyerName}</h4>
                          <span className="bg-primary/10 text-primary px-2 py-0.5 text-xs rounded-full">
                            {buyer.cropType}
                          </span>
                        </div>
                        
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex items-start">
                            <Tag className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                            <span>{buyer.requirements}</span>
                          </div>
                          <div className="flex items-start">
                            <TrendingUp className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                            <span>{buyer.priceRange}</span>
                          </div>
                          <div className="flex items-start">
                            <ShoppingCart className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                            <span>{buyer.quantityNeeded}</span>
                          </div>
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
                            <span>{buyer.location}</span>
                          </div>
                        </div>
                        
                        <button className="w-full py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                          <Send className="h-4 w-4 inline-block mr-1" />
                          Contact Buyer
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-xl font-medium mb-4">AI-Powered Price Prediction</h3>
                  <p className="text-muted-foreground mb-6">
                    Get market price forecasts based on historical data, current demand, and seasonal trends.
                  </p>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Select Crop</label>
                    <select
                      className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="">Select a crop</option>
                      <option value="wheat">Wheat</option>
                      <option value="rice">Rice</option>
                      <option value="potato">Potato</option>
                      <option value="tomato">Tomato</option>
                      <option value="onion">Onion</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Your Location</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your location"
                        className="w-full py-2 pl-10 pr-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Quality Grade</label>
                    <select
                      className="w-full py-2 px-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="">Select quality grade</option>
                      <option value="a">Premium Grade</option>
                      <option value="b">Standard Grade</option>
                      <option value="c">Basic Grade</option>
                    </select>
                  </div>
                  
                  <button className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors">
                    Get Price Prediction
                  </button>
                  
                  <div className="mt-6 border-t border-border pt-6">
                    <h4 className="font-medium mb-3">Why use price prediction?</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-1 rounded-full mr-2 mt-0.5">
                          <Zap className="h-3 w-3" />
                        </div>
                        <span>Know the best time to sell your crops</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-1 rounded-full mr-2 mt-0.5">
                          <Zap className="h-3 w-3" />
                        </div>
                        <span>Identify price trends across different markets</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-1 rounded-full mr-2 mt-0.5">
                          <Zap className="h-3 w-3" />
                        </div>
                        <span>Negotiate better with buyers using data-backed insights</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-6 md:p-8 success-gradient">
                <h3 className="text-xl font-medium mb-4">Direct Marketing Channels</h3>
                <p className="text-muted-foreground mb-6">
                  Explore these direct marketing channels to bypass middlemen and increase your profits:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                    <h4 className="font-medium mb-2">Farmers' Markets</h4>
                    <p className="text-sm text-muted-foreground mb-3">Sell directly to consumers at weekly markets in urban areas.</p>
                    <button className="text-primary text-sm hover:underline flex items-center">
                      <span>Find nearby markets</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                    <h4 className="font-medium mb-2">Farm-to-Restaurant</h4>
                    <p className="text-sm text-muted-foreground mb-3">Supply fresh produce directly to local restaurants and hotels.</p>
                    <button className="text-primary text-sm hover:underline flex items-center">
                      <span>Connect with restaurants</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                    <h4 className="font-medium mb-2">Online Marketplaces</h4>
                    <p className="text-sm text-muted-foreground mb-3">Sell through agricultural e-commerce platforms and reach more customers.</p>
                    <button className="text-primary text-sm hover:underline flex items-center">
                      <span>Browse platforms</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
                    <h4 className="font-medium mb-2">Farmer Producer Organizations</h4>
                    <p className="text-sm text-muted-foreground mb-3">Join FPOs to increase bargaining power and access larger markets.</p>
                    <button className="text-primary text-sm hover:underline flex items-center">
                      <span>Find nearby FPOs</span>
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </button>
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

export default CropProcessing;
