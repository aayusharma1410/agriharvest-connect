
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Languages, User, Key, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'hindi') {
      setLanguage('hindi');
    }
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const toggleLanguage = () => {
    const newLanguage = language === "english" ? "hindi" : "english";
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Update language across the site by dispatching a custom event
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { language: newLanguage }
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Content based on language selection
  const content = {
    english: {
      backToHome: "Back to Home",
      welcomeMessage: isLogin 
        ? "Welcome back to AgriSarthi" 
        : "Join AgriSarthi today",
      subtitle: isLogin
        ? "Enter your details to access your account"
        : "Create your account to get started",
      name: "Full Name",
      phone: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      loginButton: "Login",
      registerButton: "Register",
      forgotPassword: "Forgot password?",
      noAccount: "Don't have an account?",
      createAccount: "Create account",
      alreadyHaveAccount: "Already have an account?",
      login: "Login",
      namePlaceholder: "Enter your full name",
      phonePlaceholder: "Enter your phone number",
      passwordPlaceholder: "Enter your password",
      confirmPasswordPlaceholder: "Confirm your password",
    },
    hindi: {
      backToHome: "होम पेज पर वापस जाएं",
      welcomeMessage: isLogin 
        ? "AgriSarthi में आपका स्वागत है" 
        : "आज ही AgriSarthi से जुड़ें",
      subtitle: isLogin
        ? "अपने खाते तक पहुंचने के लिए अपना विवरण दर्ज करें"
        : "प्रारंभ करने के लिए अपना खाता बनाएं",
      name: "पूरा नाम",
      phone: "फोन नंबर",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      loginButton: "लॉगिन",
      registerButton: "रजिस्टर",
      forgotPassword: "पासवर्ड भूल गए?",
      noAccount: "खाता नहीं है?",
      createAccount: "खाता बनाएं",
      alreadyHaveAccount: "पहले से ही खाता है?",
      login: "लॉगिन",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      phonePlaceholder: "अपना फोन नंबर दर्ज करें",
      passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
      confirmPasswordPlaceholder: "अपने पासवर्ड की पुष्टि करें",
    }
  };

  const t = language === "english" ? content.english : content.hindi;

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col md:flex-row md:items-center md:justify-center">
        <div className="md:max-w-md w-full mx-auto">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-primary hover:underline transition-colors">
              <ChevronLeft size={16} className="mr-1" />
              {t.backToHome}
            </Link>
          </div>

          <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-8 multi-color-border animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-foreground text-gradient">
                {t.welcomeMessage}
              </h1>
              <button 
                onClick={toggleLanguage}
                className="inline-flex items-center p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
                aria-label="Toggle language"
              >
                <Languages size={20} />
                <span className="ml-2 text-sm font-medium">{language === "english" ? "हिंदी" : "English"}</span>
              </button>
            </div>
            <p className="text-muted-foreground mb-8">{t.subtitle}</p>

            <form className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-1" htmlFor="name">
                    {t.name}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      id="name"
                      className="w-full p-3 pl-10 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder={t.namePlaceholder}
                    />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1" htmlFor="phone">
                  {t.phone}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">+91</span>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full p-3 pl-12 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder={t.phonePlaceholder}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-1" htmlFor="password">
                  {t.password}
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full p-3 pl-10 pr-10 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder={t.passwordPlaceholder}
                  />
                  <button 
                    type="button" 
                    onClick={togglePasswordVisibility} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                    {t.confirmPassword}
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      className="w-full p-3 pl-10 pr-10 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder={t.confirmPasswordPlaceholder}
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-primary hover:underline transition-colors">
                    {t.forgotPassword}
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors hover-lift shadow-sm"
              >
                {isLogin ? t.loginButton : t.registerButton}
              </button>
            </form>

            <div className="mt-8 text-center">
              {isLogin ? (
                <p className="text-muted-foreground">
                  {t.noAccount}{" "}
                  <button onClick={toggleForm} className="text-primary hover:underline transition-colors">
                    {t.createAccount}
                  </button>
                </p>
              ) : (
                <p className="text-muted-foreground">
                  {t.alreadyHaveAccount}{" "}
                  <button onClick={toggleForm} className="text-primary hover:underline transition-colors">
                    {t.login}
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
