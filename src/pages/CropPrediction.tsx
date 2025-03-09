
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Upload, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CropPrediction = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    cropType: "",
    farmArea: "",
    soilType: "",
  });
  const [prediction, setPrediction] = useState<null | {
    predictedYield: number;
    recommendation: string;
  }>(null);
  const [fileUploading, setFileUploading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to submit a prediction request");
      return;
    }

    setLoading(true);
    
    try {
      // For demo purposes, generate mock prediction
      // In a real app, this would call an ML model API
      const mockPredictedYield = parseFloat(formData.farmArea) * 3.5; // Simple calculation for demo
      const mockRecommendation = 
        `Based on your ${formData.cropType} crop in ${formData.location}, we recommend optimal irrigation of 3-4 liters per square meter and application of organic fertilizers rich in nitrogen.`;
      
      // Save prediction to Supabase
      const { error } = await supabase.from('crop_predictions').insert({
        user_id: user.id,
        location: formData.location,
        crop_type: formData.cropType,
        farm_area: parseFloat(formData.farmArea),
        soil_type: formData.soilType || null,
        predicted_yield: mockPredictedYield,
        recommendation: mockRecommendation
      });
      
      if (error) throw error;
      
      setPrediction({
        predictedYield: mockPredictedYield,
        recommendation: mockRecommendation
      });
      
      toast.success("Prediction generated successfully!");
    } catch (error: any) {
      console.error("Error submitting prediction:", error);
      toast.error(error.message || "Failed to generate prediction");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = () => {
    // Mock file upload functionality
    setFileUploading(true);
    setTimeout(() => {
      setFileUploading(false);
      toast.success("Soil report analysis complete!");
      // Set some mock data based on the "uploaded" soil report
      setFormData({
        ...formData,
        soilType: "Clay loam with good organic content"
      });
    }, 2000);
  };

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
            <Card>
              <CardHeader>
                <CardTitle>Upload Soil Report</CardTitle>
                <CardDescription>
                  Upload your soil report to get detailed analysis and crop recommendations
                  based on your soil's composition.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <p className="text-muted-foreground mb-4">Drag and drop your soil report here or click to upload</p>
                  <Button 
                    onClick={handleFileUpload} 
                    disabled={fileUploading}
                  >
                    {fileUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Report
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enter Farm Details</CardTitle>
                <CardDescription>
                  Don't have a soil report? Enter your farm details manually to get recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="location">
                      Location
                    </label>
                    <Input
                      type="text"
                      id="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Village, District, State"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="cropType">
                      Crop Type
                    </label>
                    <select
                      id="cropType"
                      value={formData.cropType}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded-lg border border-border bg-background"
                      required
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
                    <label className="block text-sm font-medium mb-1" htmlFor="farmArea">
                      Farm Area (in acres)
                    </label>
                    <Input
                      type="number"
                      id="farmArea"
                      value={formData.farmArea}
                      onChange={handleInputChange}
                      placeholder="e.g. 5"
                      min="0.1"
                      step="0.1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="soilType">
                      Soil Type (if known)
                    </label>
                    <Input
                      type="text"
                      id="soilType"
                      value={formData.soilType}
                      onChange={handleInputChange}
                      placeholder="e.g. Clay, Sandy, Loam"
                    />
                  </div>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Get Prediction"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Yield Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              {prediction ? (
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Estimated Yield</h3>
                    <p className="text-2xl font-bold text-primary">{prediction.predictedYield.toFixed(2)} tons</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Recommendations</h3>
                    <p className="text-muted-foreground">{prediction.recommendation}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">
                    Your predictions will appear here after uploading a soil report or entering farm details.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Based on your farm's data, we provide personalized recommendations for fertilizers, 
                water usage, and other farming practices to maximize your yield.
              </p>
              <Button variant="outline" className="inline-flex items-center">
                Learn more about our recommendations
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CropPrediction;
