import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleAuthorityLogin = () => {
    setLocation('/authority-login');
  };

  const handleUserAuth = () => {
    setLocation('/user-auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md w-full space-y-8">
        {/* App Logo and Title */}
        <div className="space-y-4">
          <div className="w-20 h-20 bg-primary rounded-2xl mx-auto flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground font-bold text-2xl">BT</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Bus Tracker</h1>
            <p className="text-muted-foreground">Real-time bus tracking made simple</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <button 
            onClick={handleAuthorityLogin}
            data-testid="button-authority-login"
            className="w-full btn-primary py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Authority Login
          </button>
          <button 
            onClick={handleUserAuth}
            data-testid="button-user-auth"
            className="w-full bg-card text-card-foreground border-2 border-border py-4 px-6 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            User Login / Signup
          </button>
        </div>
        
        {/* Features Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 text-sm">
          <div className="text-center p-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-primary">📍</span>
            </div>
            <p className="text-muted-foreground">Live Tracking</p>
          </div>
          <div className="text-center p-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-primary">🎫</span>
            </div>
            <p className="text-muted-foreground">Seat Booking</p>
          </div>
          <div className="text-center p-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <span className="text-primary">⏰</span>
            </div>
            <p className="text-muted-foreground">Real-time Updates</p>
          </div>
        </div>
      </div>
    </div>
  );
}
