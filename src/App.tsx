import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { client } from "@/lib/appwrite";
import { ThemeProvider } from "@/hooks/use-theme";
import Preloader from "@/components/Preloader";
import Index from "./pages/Index";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const queryClient = new QueryClient();

// Routes wrapper with scroll reset
const AppRoutes = () => {
  const location = useLocation();

  // Scroll to top on route change, or to hash anchor if present
  useEffect(() => {
    if (location.hash) {
      // Give the page a tick to render before scrolling to the anchor
      const id = location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Ping Appwrite backend server to verify setup when app opens
  useEffect(() => {
    client.ping();
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          {/* Premium Preloader */}
          {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <WhatsAppFloat />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
