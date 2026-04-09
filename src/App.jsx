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
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

// NORMAL PAGES
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
import UpgradePremium from "./pages/UpgradePremium";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import VerificationPage from "./pages/admin/VerificationPage";

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
              <BrowserRouter>
                <MobileBottomNav />

                <Routes>
                  {/* NORMAL ROUTES WITH AUTH */}
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route path="/home" element={<AuthenticatedLayout><Home /></AuthenticatedLayout>} />
                  <Route path="/search" element={<AuthenticatedLayout><Search /></AuthenticatedLayout>} />
                  <Route path="/profile/:id" element={<AuthenticatedLayout><ProfileDetails /></AuthenticatedLayout>} />
                  <Route path="/kundli" element={<AuthenticatedLayout><Kundli /></AuthenticatedLayout>} />
                  <Route path="/contact" element={<AuthenticatedLayout><Contact /></AuthenticatedLayout>} />
                  <Route path="/about" element={<AuthenticatedLayout><About /></AuthenticatedLayout>} />
                  <Route path="/matches" element={<AuthenticatedLayout><Matches /></AuthenticatedLayout>} />
                  <Route path="/messages" element={<AuthenticatedLayout><Messages /></AuthenticatedLayout>} />
                  <Route path="/settings" element={<AuthenticatedLayout><SettingsPage /></AuthenticatedLayout>} />
                  <Route path="/account" element={<AuthenticatedLayout><Account /></AuthenticatedLayout>} />
                  <Route path="/upgrade" element={<AuthenticatedLayout><UpgradePremium /></AuthenticatedLayout>} />

                  {/* ADMIN ROUTES */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<UsersPage />} />
                  <Route path="/admin/payments" element={<PaymentsPage />} />
                  <Route path="/admin/verification" element={<VerificationPage />} />

                  {/* NOT FOUND */}
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

export default App;