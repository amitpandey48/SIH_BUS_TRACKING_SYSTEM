import { useLocation } from "wouter";
import { useEffect, useState } from "react";

interface NavbarProps {}

export default function Navbar({}: NavbarProps) {
  const [location, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hiddenRoutes = ['/', '/authority-login', '/user-auth'];
    setIsVisible(!hiddenRoutes.includes(location));
  }, [location]);

  const handleLogout = () => {
    setLocation('/');
  };

  if (!isVisible) return null;

  return (
    <nav className="bg-card border-b border-border px-4 py-3 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">BT</span>
          </div>
          <h1 className="text-xl font-semibold text-foreground">Bus Tracker</h1>
        </div>
        <button 
          onClick={handleLogout}
          data-testid="button-logout"
          className="bg-destructive text-destructive-foreground px-4 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity min-h-[44px]"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
