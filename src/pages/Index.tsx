
import { useState, useEffect } from "react";
import { Cpu, Truck, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import QuickAccessCard from "../components/QuickAccessCard";
import SuccessStory from "../components/SuccessStory";
import ChatBot from "../components/ChatBot";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Quick Access Section */}
      <section id="content" className="section-padding bg-background">
        <div className="inner-container">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Our Services
            </div>
            <h2 className="text-4xl font-medium mb-4 text-balance">Comprehensive Solutions for Farmers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AgriSarthi provides end-to-end solutions to help farmers reduce post-harvest losses
              and maximize their profits through technology and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <QuickAccessCard
              title="AI Yield Prediction"
              description="Get accurate crop yield predictions based on soil health, weather conditions, and historical data."
              icon={Cpu}
              to="/crop-prediction"
              color="bg-agri-soft-yellow/70"
              delay={100}
            />
            <QuickAccessCard
              title="Smart Logistics"
              description="Connect with verified logistics partners for timely and efficient transportation of your harvest."
              icon={Truck}
              to="/transportation"
              color="bg-agri-soft-peach/70"
              delay={200}
            />
            <QuickAccessCard
              title="Storage Solutions"
              description="Find and book cold storage facilities and warehouses close to your farm location."
              icon={Building2}
              to="/storage"
              color="bg-agri-soft-orange/70"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="section-padding bg-muted/30">
        <div className="inner-container">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-secondary/20 text-secondary-foreground">
              Success Stories
            </div>
            <h2 className="text-4xl font-medium mb-4 text-balance">Farmers Thriving with AgriSarthi</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Read how farmers across the country have transformed their agricultural practices
              and improved their livelihoods with AgriSarthi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SuccessStory
              name="Rajesh Kumar"
              location="Wheat Farmer, Punjab"
              story="AgriSarthi helped me find affordable cold storage for my wheat harvest, reducing my post-harvest losses by 30%. The AI predictions also helped me optimize my fertilizer usage."
              image="/placeholder.svg"
              delay={100}
            />
            <SuccessStory
              name="Lakshmi Devi"
              location="Vegetable Grower, Karnataka"
              story="With AgriSarthi's transportation network, I was able to connect directly with buyers in Bangalore. My income has increased by 40% as I no longer rely on middlemen."
              image="/placeholder.svg"
              delay={200}
            />
          </div>

          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Link 
              to="/contact" 
              className="inline-flex items-center text-primary hover:underline font-medium"
            >
              <span>Read more success stories</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="inner-container">
          <div className="bg-card rounded-3xl overflow-hidden border border-border shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-medium mb-4 text-balance">
                  Join AgriSarthi & Secure Your Harvest!
                </h2>
                <p className="text-muted-foreground mb-8">
                  Join thousands of farmers who have already benefited from AgriSarthi's comprehensive
                  platform. Take control of your post-harvest process and increase your profits today.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full shadow hover:bg-primary/90 transition-colors"
                  >
                    Get Started Now
                  </Link>
                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-card text-foreground font-medium rounded-full border border-border hover:bg-muted transition-colors"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:block animate-fade-in" style={{ animationDelay: "200ms" }}>
                <img 
                  src="/placeholder.svg" 
                  alt="Happy farmer with AgriSarthi" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
