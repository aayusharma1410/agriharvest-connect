
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, User, Thermometer } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import IotSensors from "./IotSensors";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [iotModalOpen, setIotModalOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'hindi') {
      setLanguage('hindi');
    }

    const handleLanguageChange = (e: CustomEvent) => {
      setLanguage(e.detail.language);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success(language === "english" ? "Logged out successfully" : "सफलतापूर्वक लॉग आउट हो गया");
  };

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-primary font-medium"
      : "text-foreground/80 hover:text-primary transition-colors";
  };

  const translations = {
    english: {
      home: "Home",
      cropPrediction: "Crop Prediction",
      storage: "Storage",
      transportation: "Transportation",
      schemes: "Government Schemes",
      contact: "Contact Us",
      login: "Login",
      logout: "Logout",
      profile: "Profile",
      iotSensors: "IoT Sensors",
    },
    hindi: {
      home: "होम",
      cropPrediction: "फसल भविष्यवाणी",
      storage: "भंडारण",
      transportation: "परिवहन",
      schemes: "सरकारी योजनाएँ",
      contact: "संपर्क करें",
      login: "लॉग इन",
      logout: "लॉग आउट",
      profile: "प्रोफ़ाइल",
      iotSensors: "आईओटी सेंसर",
    },
  };

  const t = language === "english" ? translations.english : translations.hindi;

  const menuItems = [
    { title: t.home, path: "/" },
    { title: t.cropPrediction, path: "/crop-prediction" },
    { title: t.storage, path: "/storage" },
    { title: t.transportation, path: "/transportation" },
    { title: t.schemes, path: "/government-schemes" },
    { title: t.contact, path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary brand-name">AgriSarthi</span>
            </Link>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-6 nav-menu">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${isActive(item.path)} text-sm`}
              >
                {item.title}
              </Link>
            ))}
            
            {user && (
              <button 
                onClick={() => setIotModalOpen(true)}
                className="flex items-center gap-1 text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                <Thermometer size={16} className="mr-1" />
                <span>{t.iotSensors}</span>
              </button>
            )}
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm text-foreground/80 hover:text-primary transition-colors">
                  <User size={16} className="mr-1" />
                  <span>{user.email?.split('@')[0]}</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute right-0 hidden pt-2 group-hover:block">
                  <div className="w-48 py-2 bg-card border border-border rounded-md shadow-lg">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-muted/50 transition-colors"
                    >
                      <LogOut size={16} className="mr-2" />
                      {t.logout}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
              >
                {t.login}
              </Link>
            )}
          </nav>

          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 text-foreground rounded-md hover:bg-muted/50 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-b border-border">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  isActive(item.path)
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={toggleMenu}
              >
                {item.title}
              </Link>
            ))}
            
            {user && (
              <button
                onClick={() => {
                  setIotModalOpen(true);
                  toggleMenu();
                }}
                className="flex items-center w-full px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                <Thermometer size={16} className="mr-2" />
                {t.iotSensors}
              </button>
            )}
            
            {user ? (
              <button
                onClick={() => {
                  handleSignOut();
                  toggleMenu();
                }}
                className="flex items-center w-full px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                <LogOut size={16} className="mr-2" />
                {t.logout}
              </button>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
                onClick={toggleMenu}
              >
                {t.login}
              </Link>
            )}
          </div>
        </div>
      )}
      
      {/* IoT Sensors Modal */}
      <IotSensors 
        isOpen={iotModalOpen}
        onClose={() => setIotModalOpen(false)}
      />
    </header>
  );
};

export default Navbar;
