
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NotificationProvider } from "@/hooks/use-notifications";
import { ThemeProvider } from "@/components/theme-provider";
import Dashboard from "./pages/Dashboard";
import AgriTrack from "./pages/AgriTrack/AgriTrack";
import AddEntry from "./pages/AgriTrack/AddEntry";
import CalendarView from "./pages/Calendar/CalendarView";
import AgriCoach from "./pages/AgriCoach/AgriCoach";
import MarketView from "./pages/MarketView/MarketView";
import QuickInvoice from "./pages/Invoice/QuickInvoice";
import ProfilePage from "./pages/Profile/ProfilePage";
import SubscriptionPage from "./pages/Subscription/SubscriptionPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import FarmQuest from "./pages/FarmQuest/FarmQuest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <NotificationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* App Routes (protected in a real app) */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/agritrack" element={<AgriTrack />} />
              <Route path="/agritrack/add" element={<AddEntry />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/agricoach" element={<AgriCoach />} />
              <Route path="/marketview" element={<MarketView />} />
              <Route path="/invoice" element={<QuickInvoice />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/subscription" element={<SubscriptionPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/farmquest" element={<FarmQuest />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NotificationProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
