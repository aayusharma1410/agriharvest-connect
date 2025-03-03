
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Info, ArrowRight, Shield, Award, Users, Book, FileText, DollarSign, Leaf, Droplet, BarChart2, CloudRain, Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Define the scheme type for better type checking
interface Scheme {
  id: string;
  title: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  applicationProcess: string;
  documents: string[];
  contactInfo: string;
}

const GovernmentSchemes = () => {
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // All government schemes data
  const schemes: Scheme[] = [
    {
      id: "pm-kisan",
      title: "PM Kisan Samman Nidhi",
      description: "Financial support of ₹6,000 per year in three equal installments to all farmer families.",
      eligibility: [
        "All landholding farmer families with cultivable land",
        "Small and marginal farmers",
        "Subject to certain exclusions like government employees"
      ],
      benefits: [
        "₹6,000 per year in three equal installments",
        "Direct bank transfer",
        "Financial support for agricultural inputs"
      ],
      applicationProcess: "Apply online through the PM Kisan portal or visit your nearest Common Service Center (CSC).",
      documents: [
        "Aadhaar Card",
        "Land records",
        "Bank account details",
        "Recent passport size photograph"
      ],
      contactInfo: "Helpline: 155261 or 011-23381092"
    },
    {
      id: "pm-fasal-bima",
      title: "PM Fasal Bima Yojana",
      description: "Crop insurance scheme that covers losses from natural calamities, pests, and diseases.",
      eligibility: [
        "All farmers, including sharecroppers and tenant farmers growing notified crops",
        "Both loanee and non-loanee farmers can apply"
      ],
      benefits: [
        "Low premium rates",
        "Comprehensive coverage for crop losses",
        "Quick settlement of claims"
      ],
      applicationProcess: "Apply through banks providing crop loans or online through the PMFBY portal.",
      documents: [
        "Land records",
        "Bank account details",
        "Sowing certificate",
        "Identity proof"
      ],
      contactInfo: "Toll Free: 1800-11-5555"
    },
    {
      id: "kisan-credit-card",
      title: "Kisan Credit Card",
      description: "Credit service for farmers to meet agricultural and production needs.",
      eligibility: [
        "All farmers, tenant farmers, oral lessees & sharecroppers",
        "Self-help groups (SHGs) of farmers",
        "Joint liability groups (JLGs)"
      ],
      benefits: [
        "Low interest rates",
        "Flexible repayment options",
        "Crop loans up to ₹3 lakh at 7% interest rate",
        "Interest subvention if timely repayment"
      ],
      applicationProcess: "Apply at any public or private sector bank, regional rural banks, or cooperative banks.",
      documents: [
        "Land ownership documents",
        "Identity proof",
        "Address proof",
        "Passport size photograph"
      ],
      contactInfo: "Contact your nearest bank branch"
    },
    {
      id: "soil-health-card",
      title: "Soil Health Card Scheme",
      description: "Soil testing and recommendations for nutrient management and soil health.",
      eligibility: [
        "All farmers across India",
        "Priority to small and marginal farmers"
      ],
      benefits: [
        "Free soil testing",
        "Customized fertilizer recommendations",
        "Increased soil fertility and productivity",
        "Reduced cultivation costs"
      ],
      applicationProcess: "Submit soil samples at nearby soil testing labs or approach your local agricultural officer.",
      documents: [
        "Land details",
        "Farmer's identification document",
        "Contact information"
      ],
      contactInfo: "District Agriculture Officer or Krishi Vigyan Kendra"
    },
    {
      id: "e-nam",
      title: "e-NAM",
      description: "Electronic National Agriculture Market providing online trading platform for agricultural commodities.",
      eligibility: [
        "All farmers",
        "Traders with valid licenses",
        "FPOs/FPCs"
      ],
      benefits: [
        "Direct market access",
        "Better price discovery",
        "Reduced intermediaries",
        "Transparent auction process"
      ],
      applicationProcess: "Register at your nearest APMC mandi that is integrated with e-NAM or register online.",
      documents: [
        "Identity proof",
        "Bank account details",
        "Mobile number",
        "Commodity details"
      ],
      contactInfo: "Helpline: 1800-270-0224"
    },
    {
      id: "nmsa",
      title: "NMSA",
      description: "National Mission for Sustainable Agriculture promoting sustainable farming practices.",
      eligibility: [
        "All categories of farmers",
        "Priority to small and marginal farmers",
        "Women farmers and SC/ST farmers"
      ],
      benefits: [
        "Water conservation support",
        "Sustainable farming techniques",
        "Climate resilient agriculture",
        "Soil health management"
      ],
      applicationProcess: "Apply through State Agriculture Department or District Agriculture Office.",
      documents: [
        "Land records",
        "Farmer identity card",
        "Bank account details",
        "Caste certificate (if applicable)"
      ],
      contactInfo: "State Agriculture Department"
    },
    {
      id: "pkvy",
      title: "PKVY",
      description: "Paramparagat Krishi Vikas Yojana promoting organic farming methods.",
      eligibility: [
        "All farmers willing to adopt organic farming",
        "Group of farmers with contiguous land"
      ],
      benefits: [
        "Organic certification assistance",
        "Marketing support for organic produce",
        "Financial assistance of ₹50,000 per hectare",
        "Training on organic farming practices"
      ],
      applicationProcess: "Form a cluster of 50 acres and apply through the local agriculture department.",
      documents: [
        "Land records",
        "Farmer group details",
        "Bank account information",
        "Declaration to practice organic farming"
      ],
      contactInfo: "District Agriculture Officer"
    },
    {
      id: "pmksy",
      title: "PMKSY",
      description: "Pradhan Mantri Krishi Sinchayee Yojana for irrigation and water management.",
      eligibility: [
        "All farmers",
        "Priority to small and marginal farmers",
        "Areas with low irrigation coverage"
      ],
      benefits: [
        "Micro-irrigation subsidies",
        "Water resource development",
        "Improved water use efficiency",
        "Precision irrigation technologies"
      ],
      applicationProcess: "Apply through State Irrigation/Agriculture Department or PMKSY cell.",
      documents: [
        "Land ownership documents",
        "Bank account details",
        "Water source details",
        "Irrigation plan"
      ],
      contactInfo: "State Irrigation Department"
    },
    {
      id: "nlm",
      title: "National Livestock Mission",
      description: "Supporting livestock development, breeding, and feed management.",
      eligibility: [
        "Farmers with livestock",
        "SHGs involved in livestock rearing",
        "FPOs and cooperatives"
      ],
      benefits: [
        "Breeding improvement",
        "Risk management and insurance",
        "Fodder development",
        "Entrepreneurship development"
      ],
      applicationProcess: "Apply through State Animal Husbandry Department or District Veterinary Office.",
      documents: [
        "Livestock ownership details",
        "Bank account information",
        "Identity proof",
        "Project proposal (if applicable)"
      ],
      contactInfo: "State Animal Husbandry Department"
    },
    {
      id: "smam",
      title: "SMAM",
      description: "Sub-Mission on Agricultural Mechanization providing subsidies for farm machinery.",
      eligibility: [
        "Individual farmers",
        "Group of farmers",
        "Cooperative societies"
      ],
      benefits: [
        "Equipment subsidies",
        "Custom hiring centers",
        "Up to 50% subsidy on machinery",
        "Farm mechanization training"
      ],
      applicationProcess: "Apply through State/District Agriculture Department or visit your local Krishi Vigyan Kendra.",
      documents: [
        "Land details",
        "Bank account information",
        "Identity proof",
        "Farm machinery requirement details"
      ],
      contactInfo: "State Agriculture Department"
    },
    {
      id: "aif",
      title: "Agriculture Infrastructure Fund",
      description: "Financing for post-harvest management infrastructure and community farming assets.",
      eligibility: [
        "Farmers",
        "FPOs/FPCs",
        "Agricultural cooperatives",
        "Startups in agriculture"
      ],
      benefits: [
        "Interest subvention",
        "Credit guarantee",
        "Long term debt financing",
        "Loans up to ₹2 crore"
      ],
      applicationProcess: "Apply online through the AIF portal or through participating financial institutions.",
      documents: [
        "Project proposal",
        "Land documents",
        "Cost estimates",
        "Business plan"
      ],
      contactInfo: "Agri Infra Fund helpline: 1800-114-515"
    },
    {
      id: "rkvy",
      title: "RKVY",
      description: "Rashtriya Krishi Vikas Yojana for infrastructure development and capacity building.",
      eligibility: [
        "Individual farmers",
        "Farmer groups",
        "State government projects",
        "Agricultural institutions"
      ],
      benefits: [
        "Flexible funding options",
        "State-specific project support",
        "Infrastructure development",
        "Value chain development"
      ],
      applicationProcess: "Apply through State Agriculture Department or District Agriculture Office.",
      documents: [
        "Project proposal",
        "Land documents",
        "Technical specifications",
        "Budget estimates"
      ],
      contactInfo: "State Agriculture Department"
    },
    {
      id: "mif",
      title: "Micro Irrigation Fund",
      description: "Special fund to expand coverage of micro irrigation systems across the country.",
      eligibility: [
        "State governments",
        "Farmers through state implementation agencies",
        "Areas with water scarcity"
      ],
      benefits: [
        "Affordable loans",
        "Water-efficient technology",
        "Increased irrigation coverage",
        "Reduced water consumption"
      ],
      applicationProcess: "Apply through State Irrigation Department or State MIF nodal agency.",
      documents: [
        "Project proposal",
        "Land details",
        "Water source information",
        "Technical specifications"
      ],
      contactInfo: "NABARD or State Irrigation Department"
    },
    {
      id: "midh",
      title: "Mission for Integrated Development of Horticulture",
      description: "Comprehensive scheme for holistic growth of the horticulture sector.",
      eligibility: [
        "Farmers growing horticultural crops",
        "FPOs/Cooperatives in horticulture",
        "Entrepreneurs in horticulture"
      ],
      benefits: [
        "Subsidies for planting material",
        "Protected cultivation support",
        "Post-harvest management assistance",
        "Market development"
      ],
      applicationProcess: "Apply through State Horticulture Department or District Horticulture Office.",
      documents: [
        "Land documents",
        "Crop cultivation details",
        "Bank account information",
        "Project proposal (if applicable)"
      ],
      contactInfo: "State Horticulture Department"
    },
    {
      id: "pmfme",
      title: "PM Formalization of Micro Food Enterprises",
      description: "Scheme to provide financial, technical and business support for micro food processing enterprises.",
      eligibility: [
        "Existing micro food processing enterprises",
        "FPOs/SHGs/Cooperatives",
        "Individual farmers transitioning to food processing"
      ],
      benefits: [
        "Credit-linked subsidy (35% of project cost)",
        "Technical assistance",
        "Marketing support",
        "Capacity building"
      ],
      applicationProcess: "Apply through State nodal agencies or District Resource Persons.",
      documents: [
        "Identity proof",
        "Address proof",
        "Enterprise details",
        "Project report",
        "Bank account information"
      ],
      contactInfo: "State Food Processing Department"
    },
    {
      id: "agri-clinic",
      title: "Agri-Clinics and Agri-Business Centres",
      description: "Scheme to support agriculture graduates in establishing agri-ventures for agricultural development.",
      eligibility: [
        "Agriculture graduates",
        "Graduates in allied subjects",
        "Diploma holders in agriculture"
      ],
      benefits: [
        "Bank loans up to ₹20 lakh",
        "36% subsidy on the capital cost",
        "2-month free residential training",
        "Handholding support"
      ],
      applicationProcess: "Apply through MANAGE or selected Nodal Training Institutions.",
      documents: [
        "Educational certificates",
        "Identity proof",
        "Address proof",
        "Project proposal",
        "Bank account details"
      ],
      contactInfo: "MANAGE: 040-24594509"
    },
    {
      id: "nfsm",
      title: "National Food Security Mission",
      description: "Centrally sponsored scheme aimed at increasing production of rice, wheat, pulses, coarse cereals and nutri-cereals.",
      eligibility: [
        "All farmers in target districts",
        "Priority to small and marginal farmers",
        "Women farmers"
      ],
      benefits: [
        "Distribution of high-yielding varieties",
        "Demonstration of improved technologies",
        "Resource conservation techniques",
        "Subsidies on seeds and inputs"
      ],
      applicationProcess: "Apply through District Agriculture Office or Block Agriculture Extension Office.",
      documents: [
        "Land documents",
        "Identity proof",
        "Bank account details",
        "Crop cultivation details"
      ],
      contactInfo: "District Agriculture Officer"
    },
    {
      id: "nmaet",
      title: "National Mission on Agricultural Extension & Technology",
      description: "Scheme to make agricultural extension system farmer-driven and farmer-accountable.",
      eligibility: [
        "All farmers seeking agricultural information",
        "Extension workers",
        "Agricultural institutions"
      ],
      benefits: [
        "Farmer training programs",
        "Demonstrations of technologies",
        "ICT-based extension services",
        "Farm schools"
      ],
      applicationProcess: "Contact your nearest Krishi Vigyan Kendra or District Agriculture Office.",
      documents: [
        "Identity proof",
        "Land details",
        "Contact information"
      ],
      contactInfo: "State Agricultural Management & Extension Training Institute"
    },
    {
      id: "bagri",
      title: "Bhoomi Aanwala Gramin Rozgaar Innovator",
      description: "Supports rural employment through innovative agricultural practices.",
      eligibility: [
        "Rural youth with innovative ideas",
        "Small and marginal farmers",
        "Rural entrepreneurs"
      ],
      benefits: [
        "Financial support up to ₹5 lakhs",
        "Technical mentorship",
        "Market linkage support",
        "Skill development"
      ],
      applicationProcess: "Apply through Gram Panchayat or Block Development Office.",
      documents: [
        "Identity proof",
        "Address proof",
        "Project proposal",
        "Bank account details"
      ],
      contactInfo: "District Rural Development Agency"
    }
  ];

  const handleViewDetails = (scheme: Scheme) => {
    setSelectedScheme(scheme);
    setDialogOpen(true);
  };

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
            {schemes.map((scheme) => (
              <Card key={scheme.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{scheme.title}</CardTitle>
                  <CardDescription>
                    {scheme.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    {scheme.benefits.slice(0, 2).map((benefit, index) => (
                      <div key={index} className="flex items-center mb-1">
                        <Check size={16} className="text-green-500 mr-2" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <button 
                    onClick={() => handleViewDetails(scheme)}
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    View details
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                </CardFooter>
              </Card>
            ))}
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

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedScheme && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedScheme.title}</DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {selectedScheme.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="text-lg font-medium mb-2">Eligibility Criteria</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedScheme.eligibility.map((item, i) => (
                      <li key={i} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2">Benefits</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedScheme.benefits.map((item, i) => (
                      <li key={i} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2">Application Process</h4>
                  <p className="text-muted-foreground">{selectedScheme.applicationProcess}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2">Required Documents</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedScheme.documents.map((item, i) => (
                      <li key={i} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium mb-2">Contact Information</h4>
                  <p className="text-muted-foreground">{selectedScheme.contactInfo}</p>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full">Apply Now</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default GovernmentSchemes;
