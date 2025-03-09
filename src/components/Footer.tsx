
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted pt-16 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div className="animate-fade-in">
            <h4 className="text-lg font-medium mb-4 text-foreground">About AgriSarthi</h4>
            <p className="text-muted-foreground mb-4">
              Empowering farmers with technology to reduce post-harvest losses through better storage, transportation, and processing solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h4 className="text-lg font-medium mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/storage" className="text-muted-foreground hover:text-primary transition-colors">Storage Solutions</Link>
              </li>
              <li>
                <Link to="/transportation" className="text-muted-foreground hover:text-primary transition-colors">Transportation</Link>
              </li>
              <li>
                <Link to="/crop-prediction" className="text-muted-foreground hover:text-primary transition-colors">Crop Prediction</Link>
              </li>
              <li>
                <Link to="/government-schemes" className="text-muted-foreground hover:text-primary transition-colors">Government Schemes</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h4 className="text-lg font-medium mb-4 text-foreground">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">AI Yield Prediction</li>
              <li className="text-muted-foreground">Smart Logistics</li>
              <li className="text-muted-foreground">Storage Recommendations</li>
              <li className="text-muted-foreground">Processing Techniques</li>
              <li className="text-muted-foreground">Government Scheme Assistance</li>
              <li className="text-muted-foreground">24/7 AI Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h4 className="text-lg font-medium mb-4 text-foreground">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  596, Barkat Nagar, Jaipur, Rajasthan, India 302015
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">+91 8955672580</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">aayusharma1410a@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-border/50 text-center text-muted-foreground text-sm">
          <p>
            © {currentYear} AgriSarthi. All rights reserved. | 
            <Link to="/privacy-policy" className="hover:text-primary ml-1">
              Privacy Policy
            </Link> | 
            <Link to="/terms-of-service" className="hover:text-primary ml-1">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
