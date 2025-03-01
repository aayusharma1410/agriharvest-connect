
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Storage from "./pages/Storage";
import Transportation from "./pages/Transportation";
import NotFound from "./pages/NotFound";
import CropPrediction from "./pages/CropPrediction";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import CropProcessing from "./pages/CropProcessing";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/transportation" element={<Transportation />} />
          <Route path="/crop-prediction" element={<CropPrediction />} />
          <Route path="/crop-processing" element={<CropProcessing />} />
          <Route path="/government-schemes" element={<GovernmentSchemes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
