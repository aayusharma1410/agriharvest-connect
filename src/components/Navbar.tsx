
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "hindi" : "english");
    localStorage.setItem('language', language === "english" ? "hindi" : "english");
  };

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }

    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'hindi') {
      setLanguage('hindi');
    }

    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: language === "english" ? "Home" : "होम", path: "/" },
    { name: language === "english" ? "Storage" : "भंडारण", path: "/storage" },
    { name: language === "english" ? "Transportation" : "परिवहन", path: "/transportation" },
    { name: language === "english" ? "Crop Prediction" : "फसल भविष्यवाणी", path: "/crop-prediction" },
    { name: language === "english" ? "Government Schemes" : "सरकारी योजनाएं", path: "/government-schemes" },
    { name: language === "english" ? "Contact" : "संपर्क", path: "/contact" }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-bold text-primary">
                Agri<span className="text-secondary-foreground">Sarthi</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm lg:text-base font-medium transition-colors hover:text-primary px-2 py-2 rounded-md relative group ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.name}
                <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-primary transform transition-transform origin-left ${
                  location.pathname === link.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Login, Theme Toggle Button and Mobile Menu Toggle */}
          <div className="flex items-center">
            <Link 
              to="/login" 
              className="mr-2 text-foreground/80 hover:text-primary rounded-lg transition-colors px-3 py-2 hidden md:block"
            >
              {language === "english" ? "Login" : "लॉगिन"}
            </Link>

            <button
              onClick={toggleLanguage}
              className="p-2 mr-2 text-foreground/80 hover:text-primary rounded-full transition-colors"
              aria-label="Toggle language"
            >
              <Languages size={20} />
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-2 mr-2 text-foreground/80 hover:text-primary rounded-full transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-foreground/80 hover:text-primary"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="glass-morphism mx-4 my-2 rounded-xl overflow-hidden animate-slide-in-bottom">
          <nav className="flex flex-col space-y-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-primary/5 text-foreground/80"
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="px-4 py-3 rounded-lg transition-colors hover:bg-primary/5 text-foreground/80"
              onClick={closeMenu}
            >
              {language === "english" ? "Login" : "लॉगिन"}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
