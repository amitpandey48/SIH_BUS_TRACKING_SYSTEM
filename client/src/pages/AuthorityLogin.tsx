import { useLocation } from "wouter";
import { useState } from "react";

export default function AuthorityLogin() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    busNumber: '',
    phoneNumber: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Direct redirect to dashboard (no validation as per requirements)
    setLocation('/authority-dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBackToHome = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Authority Login</h2>
          <p className="text-muted-foreground">Access your bus management dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 shadow-lg border border-border space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Bus Number</label>
            <input 
              type="text" 
              name="busNumber"
              value={formData.busNumber}
              onChange={handleInputChange}
              placeholder="Enter bus number (e.g., BUS001)" 
              data-testid="input-bus-number"
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone Number</label>
            <input 
              type="tel" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number" 
              data-testid="input-phone-number"
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password" 
              data-testid="input-password"
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            data-testid="button-login"
            className="w-full btn-primary py-3 px-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            Login to Dashboard
          </button>
        </form>
        
        <button 
          onClick={handleBackToHome}
          data-testid="button-back-home"
          className="w-full bg-secondary text-secondary-foreground py-3 px-4 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
