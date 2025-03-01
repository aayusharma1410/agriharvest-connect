
import { Routes, Route } from "react-router-dom";
import CropProcessing from "./pages/CropProcessing";
import Login from "./pages/Login";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CropPrediction from "./pages/CropPrediction";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import Transportation from "./pages/Transportation";
import Contact from "./pages/Contact";
import Storage from "./pages/Storage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Protected Routes */}
      <Route path="/crop-prediction" element={
        <ProtectedRoute>
          <CropPrediction />
        </ProtectedRoute>
      } />
      <Route path="/storage" element={
        <ProtectedRoute>
          <Storage />
        </ProtectedRoute>
      } />
      <Route path="/transportation" element={
        <ProtectedRoute>
          <Transportation />
        </ProtectedRoute>
      } />
      <Route path="/crop-processing" element={
        <ProtectedRoute>
          <CropProcessing />
        </ProtectedRoute>
      } />
      <Route path="/government-schemes" element={
        <ProtectedRoute>
          <GovernmentSchemes />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
