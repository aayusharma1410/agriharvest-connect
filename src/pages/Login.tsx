
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Languages } from "lucide-react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [language, setLanguage] = useState<"english" | "hindi">("english");

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "hindi" : "english");
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
    }
  };

  const t = language === "english" ? content.english : content.hindi;

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col md:flex-row md:items-center md:justify-center">
        <div className="md:max-w-md w-full mx-auto">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-primary hover:underline">
              <ChevronLeft size={16} className="mr-1" />
              {t.backToHome}
            </Link>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-foreground">
                {t.welcomeMessage}
              </h1>
              <button 
                onClick={toggleLanguage}
                className="inline-flex items-center p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Toggle language"
              >
                <Languages size={20} />
                <span className="ml-2 text-sm font-medium">{language === "english" ? "हिंदी" : "English"}</span>
              </button>
            </div>
            <p className="text-muted-foreground mb-6">{t.subtitle}</p>

            <form className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 rounded-lg border border-border bg-background"
                    placeholder={language === "english" ? "Enter your full name" : "अपना पूरा नाम दर्ज करें"}
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="phone">
                  {t.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-2 rounded-lg border border-border bg-background"
                  placeholder={language === "english" ? "Enter your phone number" : "अपना फोन नंबर दर्ज करें"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="password">
                  {t.password}
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 rounded-lg border border-border bg-background"
                  placeholder={language === "english" ? "Enter your password" : "अपना पासवर्ड दर्ज करें"}
                />
              </div>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                    {t.confirmPassword}
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full p-2 rounded-lg border border-border bg-background"
                    placeholder={language === "english" ? "Confirm your password" : "अपने पासवर्ड की पुष्टि करें"}
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-primary hover:underline">
                    {t.forgotPassword}
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                {isLogin ? t.loginButton : t.registerButton}
              </button>
            </form>

            <div className="mt-6 text-center">
              {isLogin ? (
                <p className="text-muted-foreground">
                  {t.noAccount}{" "}
                  <button onClick={toggleForm} className="text-primary hover:underline">
                    {t.createAccount}
                  </button>
                </p>
              ) : (
                <p className="text-muted-foreground">
                  {t.alreadyHaveAccount}{" "}
                  <button onClick={toggleForm} className="text-primary hover:underline">
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
