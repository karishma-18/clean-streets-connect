
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/App";
import { Button } from "@/components/ui/button";
import { 
  User, 
  LogOut, 
  LayoutDashboard, 
  ClipboardList, 
  FileEdit,
  Menu,
  X,
  MapPin
} from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, onClick }: NavItemProps) => {
  return (
    <NavLink 
      to={to}
      onClick={onClick}
      className={({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
          isActive 
            ? "bg-civic-green text-white" 
            : "hover:bg-gray-100"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

const OfficialLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const navItems = [
    { to: "/official/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/official/view-complaints", icon: <ClipboardList size={18} />, label: "View Complaints" },
    { to: "/official/profile", icon: <User size={18} />, label: "My Profile" },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-civic-green" />
            <h1 className="text-xl font-bold">
              <span className="text-civic-blue">Smart Road</span> <span className="text-civic-green">Cleanliness</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center">
              <span className="text-gray-700 font-medium mr-2">
                {user?.name}
              </span>
              <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Official
              </div>
            </div>
            
            {/* Mobile menu button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-civic-green" />
                      <span className="font-bold text-civic-green">Municipal Portal</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                      <X size={18} />
                    </Button>
                  </div>
                  
                  {user && (
                    <div className="p-4 border-b">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="mt-1 inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Official
                      </div>
                    </div>
                  )}
                  
                  <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                      <NavItem 
                        key={item.to} 
                        to={item.to} 
                        icon={item.icon} 
                        label={item.label} 
                        onClick={closeMobileMenu}
                      />
                    ))}
                  </nav>
                  
                  <div className="p-4 border-t">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 px-3"
                      onClick={() => {
                        closeMobileMenu();
                        handleLogout();
                      }}
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar - Desktop only */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 pt-6">
          <nav className="flex flex-col gap-1 px-3">
            {navItems.map((item) => (
              <NavItem 
                key={item.to} 
                to={item.to} 
                icon={item.icon} 
                label={item.label} 
              />
            ))}
            
            <hr className="my-3 border-gray-200" />
            
            <Button 
              variant="ghost" 
              className="justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default OfficialLayout;
