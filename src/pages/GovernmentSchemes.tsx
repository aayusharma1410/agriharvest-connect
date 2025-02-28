
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Info, ArrowRight } from "lucide-react";

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
            <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-2">PM Kisan Samman Nidhi</h3>
              <p className="text-muted-foreground mb-4">
                Financial support of ₹6,000 per year in three equal installments to all farmer families.
              </p>
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
              <a href="#" className="inline-flex items-center text-primary hover:underline">
                View details
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>

            {/* Crop Insurance Scheme */}
            <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-2">PM Fasal Bima Yojana</h3>
              <p className="text-muted-foreground mb-4">
                Crop insurance scheme that covers losses from natural calamities, pests, and diseases.
              </p>
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
              <a href="#" className="inline-flex items-center text-primary hover:underline">
                View details
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>

            {/* Kisan Credit Card */}
            <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-2">Kisan Credit Card</h3>
              <p className="text-muted-foreground mb-4">
                Credit service for farmers to meet agricultural and production needs.
              </p>
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
              <a href="#" className="inline-flex items-center text-primary hover:underline">
                View details
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
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
