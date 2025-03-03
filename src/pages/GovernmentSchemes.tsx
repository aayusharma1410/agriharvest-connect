
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Info, ArrowRight, Shield, Award, Users, Book, FileText, DollarSign, Leaf, Droplet, BarChart2, CloudRain, Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const GovernmentSchemes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Government Schemes
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
            Access information about all active government schemes for farmers. Our AI-powered 
            eligibility checker helps you find the schemes you qualify for and guides you through 
            the application process.
          </p>

          <div className="bg-card rounded-2xl p-6 border border-border mb-10">
            <h2 className="text-xl font-semibold mb-4">Eligibility Checker</h2>
            <p className="text-muted-foreground mb-6">
              Enter your details below to find government schemes you may be eligible for.
            </p>
            <form className="space-y-4 max-w-2xl">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="farmer-type">
                    Farmer Type
                  </label>
                  <select
                    id="farmer-type"
                    className="w-full p-2 rounded-lg border border-border bg-background"
                  >
                    <option value="">Select type</option>
                    <option value="small">Small Farmer (Below 2 Hectares)</option>
                    <option value="marginal">Marginal Farmer (Below 1 Hectare)</option>
                    <option value="medium">Medium Farmer (2-10 Hectares)</option>
                    <option value="large">Large Farmer (Above 10 Hectares)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="state">
                    State
                  </label>
                  <select
                    id="state"
                    className="w-full p-2 rounded-lg border border-border bg-background"
                  >
                    <option value="">Select state</option>
                    <option value="uttar-pradesh">Uttar Pradesh</option>
                    <option value="punjab">Punjab</option>
                    <option value="haryana">Haryana</option>
                    <option value="madhya-pradesh">Madhya Pradesh</option>
                    <option value="bihar">Bihar</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="crop-types">
                  Primary Crops
                </label>
                <input
                  type="text"
                  id="crop-types"
                  className="w-full p-2 rounded-lg border border-border bg-background"
                  placeholder="e.g. Wheat, Rice, Sugarcane"
                />
              </div>
              <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Check Eligibility
              </button>
            </form>
          </div>

          <h2 className="text-2xl font-semibold mb-6">Popular Schemes</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* PM Kisan Scheme */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">PM Kisan Samman Nidhi</CardTitle>
                <CardDescription>
                  Financial support of ₹6,000 per year in three equal installments to all farmer families.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">All farmer families eligible</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Direct bank transfer</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href="#" className="inline-flex items-center text-primary hover:underline">
                  View details
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </CardFooter>
            </Card>

            {/* Crop Insurance Scheme */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">PM Fasal Bima Yojana</CardTitle>
                <CardDescription>
                  Crop insurance scheme that covers losses from natural calamities, pests, and diseases.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Low premium rates</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Comprehensive coverage</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href="#" className="inline-flex items-center text-primary hover:underline">
                  View details
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </CardFooter>
            </Card>

            {/* Kisan Credit Card */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Kisan Credit Card</CardTitle>
                <CardDescription>
                  Credit service for farmers to meet agricultural and production needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Low interest rates</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Flexible repayment options</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href="#" className="inline-flex items-center text-primary hover:underline">
                  View details
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </CardFooter>
            </Card>

            {/* Soil Health Card */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Soil Health Card Scheme</CardTitle>
                <CardDescription>
                  Soil testing and recommendations for nutrient management and soil health.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Free soil testing</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Customized fertilizer recommendations</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href="#" className="inline-flex items-center text-primary hover:underline">
                  View details
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </CardFooter>
            </Card>

            {/* National Agricultural Market */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">e-NAM</CardTitle>
                <CardDescription>
                  Electronic National Agriculture Market providing online trading platform for agricultural commodities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Direct market access</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Better price discovery</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href="#" className="inline-flex items-center text-primary hover:underline">
                  View details
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </CardFooter>
            </Card>

            {/* National Mission for Sustainable Agriculture */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">NMSA</CardTitle>
                <CardDescription>
                  National Mission for Sustainable Agriculture promoting sustainable farming practices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Water conservation support</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Sustainable farming techniques</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href="#" className="inline-flex items-center text-primary hover:underline">
                  View details
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </CardFooter>
            </Card>

            {/* Paramparagat Krishi Vikas Yojana */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">PKVY</CardTitle>
                <CardDescription>
                  Paramparagat Krishi Vikas Yojana promoting organic farming methods.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Organic certification assistance</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Marketing support for organic produce</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href="#" className="inline-flex items-center text-primary hover:underline">
                  View details
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </CardFooter>
            </Card>

            {/* Pradhan Mantri Krishi Sinchayee Yojana */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">PMKSY</CardTitle>
                <CardDescription>
                  Pradhan Mantri Krishi Sinchayee Yojana for irrigation and water management.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Micro-irrigation subsidies</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Water resource development</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href="#" className="inline-flex items-center text-primary hover:underline">
                  View details
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </CardFooter>
            </Card>

            {/* National Livestock Mission */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">National Livestock Mission</CardTitle>
                <CardDescription>
                  Supporting livestock development, breeding, and feed management.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Breeding improvement</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Risk management and insurance</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href="#" className="inline-flex items-center text-primary hover:underline">
                  View details
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </CardFooter>
            </Card>

            {/* Sub-Mission on Agricultural Mechanization */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">SMAM</CardTitle>
                <CardDescription>
                  Sub-Mission on Agricultural Mechanization providing subsidies for farm machinery.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Equipment subsidies</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Custom hiring centers</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href="#" className="inline-flex items-center text-primary hover:underline">
                  View details
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </CardFooter>
            </Card>

            {/* Agriculture Infrastructure Fund */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Agriculture Infrastructure Fund</CardTitle>
                <CardDescription>
                  Financing for post-harvest management infrastructure and community farming assets.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Interest subvention</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Credit guarantee</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href="#" className="inline-flex items-center text-primary hover:underline">
                  View details
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </CardFooter>
            </Card>

            {/* Rashtriya Krishi Vikas Yojana */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">RKVY</CardTitle>
                <CardDescription>
                  Rashtriya Krishi Vikas Yojana for infrastructure development and capacity building.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Flexible funding options</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">State-specific project support</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href="#" className="inline-flex items-center text-primary hover:underline">
                  View details
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </CardFooter>
            </Card>

            {/* Micro Irrigation Fund */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Micro Irrigation Fund</CardTitle>
                <CardDescription>
                  Special fund to expand coverage of micro irrigation systems across the country.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Affordable loans</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-sm">Water-efficient technology</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <a href="#" className="inline-flex items-center text-primary hover:underline">
                  View details
                  <ArrowRight size={16} className="ml-2" />
                </a>
              </CardFooter>
            </Card>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 flex items-start">
            <Info size={24} className="text-blue-500 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-foreground mb-2">Need Help with Applications?</h3>
              <p className="text-muted-foreground mb-4">
                Our team can help you navigate the application process for any government scheme.
                We provide step-by-step guidance and documentation support.
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                Get Application Assistance
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GovernmentSchemes;
