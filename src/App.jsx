import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { LoadingProvider } from "@/hooks/useLoading";
import { DarkModeProvider } from "@/hooks/useDarkMode";
import { ToastProvider } from "@/components/Toast";
import LoadingBar from "@/components/LoadingBar";
import MobileBottomNav from "@/components/MobileBottomNav";

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
import PaymentsPage from "./pages/admin/PaymentsPage";
import VerificationPage from "./pages/admin/VerificationPage";



import NotFound from "./pages/NotFound";

// 🔥 ONLY ADMIN DASHBOARD (NO USERS PAGE)
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DarkModeProvider>
      <LoadingProvider>
        <ToastProvider>
          <TooltipProvider>
            <LoadingBar />
            <Toaster />
            <Sonner />
            <AuthProvider>
              <BrowserRouter
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}
              >
                <MobileBottomNav />

                <Routes>

                  {/* NORMAL ROUTES */}
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

                  {/* ✅ ONLY ADMIN DASHBOARD */}
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