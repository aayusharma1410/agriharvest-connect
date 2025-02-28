
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const CropPrediction = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            AI Crop Yield Prediction
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
            Get accurate yield forecasts based on your farm's data, weather patterns, and soil health. 
            Our AI-powered system provides personalized recommendations to maximize your harvest.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-semibold mb-4">Upload Soil Report</h2>
              <p className="text-muted-foreground mb-6">
                Upload your soil report to get detailed analysis and crop recommendations
                based on your soil's composition.
              </p>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <p className="text-muted-foreground mb-4">Drag and drop your soil report here or click to upload</p>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Upload Report
                </button>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-semibold mb-4">Enter Farm Details</h2>
              <p className="text-muted-foreground mb-4">
                Don't have a soil report? Enter your farm details manually to get recommendations.
              </p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="location">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="w-full p-2 rounded-lg border border-border bg-background"
                    placeholder="Village, District, State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="crop">
                    Crop Type
                  </label>
                  <select
                    id="crop"
                    className="w-full p-2 rounded-lg border border-border bg-background"
                  >
                    <option value="">Select crop</option>
                    <option value="rice">Rice</option>
                    <option value="wheat">Wheat</option>
                    <option value="maize">Maize</option>
                    <option value="sugarcane">Sugarcane</option>
                    <option value="cotton">Cotton</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="area">
                    Farm Area (in acres)
                  </label>
                  <input
                    type="number"
                    id="area"
                    className="w-full p-2 rounded-lg border border-border bg-background"
                    placeholder="e.g. 5"
                  />
                </div>
                <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Get Prediction
                </button>
              </form>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border mb-12">
            <h2 className="text-xl font-semibold mb-6">Yield Predictions</h2>
            <div className="text-center p-8">
              <p className="text-muted-foreground">
                Your predictions will appear here after uploading a soil report or entering farm details.
              </p>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Personalized Recommendations</h2>
            <p className="text-muted-foreground mb-6">
              Based on your farm's data, we provide personalized recommendations for fertilizers, 
              water usage, and other farming practices to maximize your yield.
            </p>
            <a href="#" className="inline-flex items-center text-primary hover:underline">
              Learn more about our recommendations
              <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CropPrediction;
