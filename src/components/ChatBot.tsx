
import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Mic, ChevronDown, Languages } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string; isUser: boolean}[]>([]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'hindi') {
      setLanguage('hindi');
    }
    
    // Set initial welcome message based on language
    setMessages([
      { 
        text: language === "english" 
          ? "Hello! I'm your AgriSarthi assistant. How can I help you today?" 
          : "नमस्ते! मैं आपका AgriSarthi सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?", 
        isUser: false 
      }
    ]);
  }, [language]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = () => {
    const newLanguage = language === "english" ? "hindi" : "english";
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Add a language change notification message
    setMessages(prev => [
      ...prev, 
      { 
        text: newLanguage === "english" 
          ? "Switched to English" 
          : "हिंदी में बदल दिया गया", 
        isUser: false 
      }
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { text: input, isUser: true };
      
      setMessages([...messages, userMessage]);
      setInput("");

      // Simulate bot response after a short delay
      setTimeout(() => {
        let botResponses;
        
        if (language === "english") {
          botResponses = [
            "I can help you find the nearest storage facility for your crops.",
            "Would you like to know about any specific government schemes for farmers?",
            "I can assist you with transportation options for your harvest.",
            "Do you need help with crop yield prediction?",
            "You can upload your soil report for personalized recommendations."
          ];
        } else {
          botResponses = [
            "मैं आपकी फसलों के लिए निकटतम भंडारण सुविधा खोजने में आपकी मदद कर सकता हूँ।",
            "क्या आप किसानों के लिए किसी विशेष सरकारी योजना के बारे में जानना चाहेंगे?",
            "मैं आपकी फसल के परिवहन विकल्पों के साथ आपकी सहायता कर सकता हूँ।",
            "क्या आपको फसल उपज भविष्यवाणी के साथ मदद की आवश्यकता है?",
            "आप व्यक्तिगत सिफारिशों के लिए अपनी मिट्टी की रिपोर्ट अपलोड कर सकते हैं।"
          ];
        }
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        setMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
      }, 1000);
    }
  };

  const handleVoiceInput = () => {
    // Toggle voice recording state
    setIsRecording(!isRecording);
    
    if (isRecording) {
      // In a real implementation, this would stop recording and process the speech
      setIsRecording(false);
      return;
    }
    
    // Simulate voice recognition with language-specific text
    setTimeout(() => {
      if (language === "english") {
        setInput("How can I find the nearest cold storage?");
      } else {
        setInput("मैं निकटतम कोल्ड स्टोरेज कैसे खोज सकता हूँ?");
      }
      setIsRecording(false);
    }, 2000);
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const placeholderText = language === "english" 
    ? "Type your message..." 
    : "अपना संदेश टाइप करें...";

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "bg-destructive text-destructive-foreground rotate-90" : "bg-primary text-primary-foreground"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-40 w-80 sm:w-96 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform glass-morphism border border-border ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* Chat header */}
        <div className="bg-primary p-4 text-primary-foreground flex justify-between items-center">
          <div className="flex items-center">
            <MessageSquare size={20} className="mr-2" />
            <h3 className="font-medium">
              {language === "english" ? "AgriSarthi Assistant" : "AgriSarthi सहायक"}
            </h3>
          </div>
          <div className="flex items-center">
            <button 
              onClick={toggleLanguage}
              className="text-primary-foreground/80 hover:text-primary-foreground mr-2"
              aria-label="Toggle language"
            >
              <Languages size={18} />
            </button>
            <button 
              onClick={toggleChat} 
              className="text-primary-foreground/80 hover:text-primary-foreground"
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        {/* Chat messages */}
        <div className="bg-card/50 p-4 h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-3 max-w-[80%] ${message.isUser ? "ml-auto" : "mr-auto"}`}
            >
              <div 
                className={`p-3 rounded-lg ${
                  message.isUser 
                    ? "bg-primary text-primary-foreground rounded-tr-none" 
                    : "bg-muted text-foreground rounded-tl-none"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <form onSubmit={handleSubmit} className="bg-card border-t border-border p-3 flex items-center gap-2">
          <button 
            type="button" 
            className={`p-2 rounded-full ${
              isRecording ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
            onClick={handleVoiceInput}
            aria-label={isRecording ? "Stop recording" : "Start voice input"}
          >
            <Mic size={18} />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholderText}
            className="flex-1 py-2 px-3 rounded-full bg-muted border border-border focus:outline-none focus:ring-1 focus:ring-primary"
          />

          <button
            type="submit"
            className="p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-50"
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
