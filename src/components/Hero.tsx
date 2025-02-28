
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Hero = () => {
  const scrollToContent = () => {
    const contentSection = document.getElementById("content");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('/placeholder.svg')", 
            backgroundPosition: "center 30%",
          }}>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-black/40 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-white font-semibold mb-4 text-balance">
            Empowering Farmers, <br className="hidden sm:inline" />
            <span className="text-secondary">Reducing Losses</span>
          </h1>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <p className="text-white/90 max-w-3xl mx-auto mb-8 text-lg md:text-xl text-balance">
            Join thousands of farmers using AgriSarthi to improve storage, transportation, 
            and processing of crops, reducing post-harvest losses and increasing profits.
          </p>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
          <SearchBar className="mb-8" />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "600ms" }}>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/storage"
              className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full shadow-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 font-medium rounded-full hover:bg-white/20 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToContent}
            className="p-3 rounded-full text-white/70 hover:text-white transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
