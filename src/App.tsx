
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";

// Import pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/user/Dashboard";
import UserProfile from "./pages/user/Profile";
import AboutUs from "./pages/user/AboutUs";
import GiveComplaint from "./pages/user/GiveComplaint";
import TrackComplaints from "./pages/user/TrackComplaints";
import Rewards from "./pages/user/Rewards";
import OfficialDashboard from "./pages/official/Dashboard";
import ViewComplaints from "./pages/official/ViewComplaints";
import UpdateComplaintStatus from "./pages/official/UpdateComplaintStatus";
import OfficialProfile from "./pages/official/Profile";
import NotFound from "./pages/NotFound";

// Create auth context
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "official";
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Protected route component
const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode;
  requiredRole?: "user" | "official";
}) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === "user" ? "/user/dashboard" : "/official/dashboard"} replace />;
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, login, logout }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* User routes */}
              <Route path="/user/dashboard" element={
                <ProtectedRoute requiredRole="user">
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="/user/profile" element={
                <ProtectedRoute requiredRole="user">
                  <UserProfile />
                </ProtectedRoute>
              } />
              <Route path="/user/about" element={
                <ProtectedRoute requiredRole="user">
                  <AboutUs />
                </ProtectedRoute>
              } />
              <Route path="/user/give-complaint" element={
                <ProtectedRoute requiredRole="user">
                  <GiveComplaint />
                </ProtectedRoute>
              } />
              <Route path="/user/track-complaints" element={
                <ProtectedRoute requiredRole="user">
                  <TrackComplaints />
                </ProtectedRoute>
              } />
              <Route path="/user/rewards" element={
                <ProtectedRoute requiredRole="user">
                  <Rewards />
                </ProtectedRoute>
              } />
              
              {/* Official routes */}
              <Route path="/official/dashboard" element={
                <ProtectedRoute requiredRole="official">
                  <OfficialDashboard />
                </ProtectedRoute>
              } />
              <Route path="/official/view-complaints" element={
                <ProtectedRoute requiredRole="official">
                  <ViewComplaints />
                </ProtectedRoute>
              } />
              <Route path="/official/update-complaint/:id" element={
                <ProtectedRoute requiredRole="official">
                  <UpdateComplaintStatus />
                </ProtectedRoute>
              } />
              <Route path="/official/profile" element={
                <ProtectedRoute requiredRole="official">
                  <OfficialProfile />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
