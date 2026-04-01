import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider, useAuth, UserRole } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./components/hrms/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Payroll from "./pages/Payroll";
import Notifications from "./pages/Notifications";
import SettingsPage from "./pages/SettingsPage";
import TeamBuilder from "./pages/TeamBuilder";
import BurnoutPredictor from "./pages/BurnoutPredictor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const routePermissions: Record<string, UserRole[]> = {
  "/dashboard":   ["admin", "hr", "employee"],
  "/employees":   ["admin", "hr"],
  "/attendance":  ["admin", "hr", "employee"],
  "/leaves":      ["admin", "hr", "employee"],
  "/payroll":     ["admin"],
  "/team-builder":["admin"],
  "/burnout":     ["admin"],
  "/notifications":["admin", "hr", "employee"],
  "/settings":    ["admin", "hr", "employee"],
};

function ProtectedRoute({ children, path }: { children: React.ReactNode; path: string }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  const allowed = routePermissions[path];
  if (allowed && !allowed.includes(user.role)) {
    toast.error("You don't have permission to access that page", { id: "perm-denied" });
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute path="/dashboard"><DashboardLayout /></ProtectedRoute>}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/employees" element={<ProtectedRoute path="/employees"><Employees /></ProtectedRoute>} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/leaves" element={<Leaves />} />
      <Route path="/payroll" element={<ProtectedRoute path="/payroll"><Payroll /></ProtectedRoute>} />
      <Route path="/team-builder" element={<ProtectedRoute path="/team-builder"><TeamBuilder /></ProtectedRoute>} />
      <Route path="/burnout" element={<ProtectedRoute path="/burnout"><BurnoutPredictor /></ProtectedRoute>} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  </ThemeProvider>
);
export default App;
