import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { LoadingProvider } from "@/hooks/useLoading";
import { DarkModeProvider } from "@/hooks/useDarkMode";
import { ToastProvider } from "@/components/Toast";
import LoadingSpinner from "./components/LoadingSpinner";
import MobileBottomNav from "@/components/MobileBottomNav";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import ProfileDetails from "./pages/ProfileDetails";
import Kundli from "./pages/Kundli";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Matches from "./pages/Matches";
import Messages from "./pages/Messages";
import SettingsPage from "./pages/SettingsPage";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DarkModeProvider>
      <LoadingProvider>
        <ToastProvider>
          <TooltipProvider>
            <LoadingSpinner />
            <Toaster />
            <Sonner />
            <AuthProvider>
              <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <MobileBottomNav />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search />} />
                <Route path="/profile/:id" element={<ProfileDetails />} />
                <Route path="/kundli" element={<Kundli />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/account" element={<Account />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            </AuthProvider>
          </TooltipProvider>
        </ToastProvider>
      </LoadingProvider>
    </DarkModeProvider>
  </QueryClientProvider>
);

// Test comment to verify file is being updated

export default App;
