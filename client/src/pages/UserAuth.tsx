import { useLocation } from "wouter";
import { useState } from "react";

export default function UserAuth() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loginData, setLoginData] = useState({
    phoneNumber: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    fullName: '',
    phoneNumber: '',
    password: ''
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Direct redirect to user dashboard (no validation as per requirements)
    setLocation('/user-dashboard');
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Direct redirect to user dashboard (no validation as per requirements)
    setLocation('/user-dashboard');
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBackToHome = () => {
    setLocation('/');
  };

  const switchTab = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Join Bus Tracker</h2>
          <p className="text-muted-foreground">Book your journey with ease</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="bg-card rounded-xl p-1 shadow-lg border border-border">
          <div className="grid grid-cols-2 gap-1">
            <button 
              onClick={() => switchTab('login')}
              data-testid="tab-login"
              className={`py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'login' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Login
            </button>
            <button 
              onClick={() => switchTab('signup')}
              data-testid="tab-signup"
              className={`py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === 'signup' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>
        
        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="bg-card rounded-xl p-6 shadow-lg border border-border space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <input 
                type="tel" 
                name="phoneNumber"
                value={loginData.phoneNumber}
                onChange={handleLoginInputChange}
                placeholder="Enter your phone number" 
                data-testid="input-login-phone"
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <input 
                type="password" 
                name="password"
                value={loginData.password}
                onChange={handleLoginInputChange}
                placeholder="Enter your password" 
                data-testid="input-login-password"
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" 
                required 
              />
            </div>
            
            <button 
              type="submit" 
              data-testid="button-login-submit"
              className="w-full btn-primary py-3 px-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Login
            </button>
          </form>
        )}
        
        {/* Signup Form */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="bg-card rounded-xl p-6 shadow-lg border border-border space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                value={signupData.fullName}
                onChange={handleSignupInputChange}
                placeholder="Enter your full name" 
                data-testid="input-signup-name"
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <input 
                type="tel" 
                name="phoneNumber"
                value={signupData.phoneNumber}
                onChange={handleSignupInputChange}
                placeholder="Enter your phone number" 
                data-testid="input-signup-phone"
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <input 
                type="password" 
                name="password"
                value={signupData.password}
                onChange={handleSignupInputChange}
                placeholder="Create a password" 
                data-testid="input-signup-password"
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" 
                required 
              />
            </div>
            
            <button 
              type="submit" 
              data-testid="button-signup-submit"
              className="w-full btn-primary py-3 px-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Create Account
            </button>
          </form>
        )}
        
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
