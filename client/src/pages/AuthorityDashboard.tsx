import { useToast } from "@/hooks/use-toast";

export default function AuthorityDashboard() {
  const { toast } = useToast();

  const handleEditBusInfo = () => {
    toast({
      title: "Edit Bus Information",
      description: "This would open an edit form for bus details",
    });
  };

  const handleEditTiming = () => {
    toast({
      title: "Update Schedule",
      description: "This would open a timing update form",
    });
  };

  const handleUpdateTraffic = () => {
    toast({
      title: "Traffic Status Updated",
      description: "This would connect to traffic APIs for real-time updates",
    });
  };

  const handleUpdateLocation = () => {
    toast({
      title: "GPS Location Updated",
      description: "This would update live coordinates from GPS",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">Bus Management Dashboard</h2>
          <p className="text-muted-foreground">Manage your bus information and real-time updates</p>
        </div>
        
        {/* Bus Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bus Information */}
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Bus Information</h3>
              <button 
                onClick={handleEditBusInfo}
                data-testid="button-edit-bus-info"
                className="bg-primary text-primary-foreground px-4 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity min-h-[44px]"
              >
                Edit
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Bus Number:</span>
                <p className="font-medium text-foreground" data-testid="text-bus-number">BUS001</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Route:</span>
                <p className="font-medium text-foreground" data-testid="text-route">City Center ↔ Airport</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Total Seats:</span>
                <p className="font-medium text-foreground" data-testid="text-total-seats">45 seats</p>
              </div>
            </div>
          </div>
          
          {/* Timing Information */}
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Schedule</h3>
              <button 
                onClick={handleEditTiming}
                data-testid="button-edit-timing"
                className="bg-primary text-primary-foreground px-4 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity min-h-[44px]"
              >
                Update
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Departure Time:</span>
                <p className="font-medium text-foreground" data-testid="text-departure">08:30 AM</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Estimated Arrival:</span>
                <p className="font-medium text-foreground" data-testid="text-arrival">09:45 AM</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Frequency:</span>
                <p className="font-medium text-foreground" data-testid="text-frequency">Every 30 minutes</p>
              </div>
            </div>
          </div>
          
          {/* Traffic Updates */}
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Traffic Status</h3>
              <button 
                onClick={handleUpdateTraffic}
                data-testid="button-update-traffic"
                className="warning-bg text-white px-4 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity min-h-[44px]"
              >
                Update
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 warning-bg rounded-full"></div>
                <span className="text-sm font-medium text-foreground" data-testid="text-traffic-status">Moderate Traffic</span>
              </div>
              <p className="text-sm text-muted-foreground" data-testid="text-delay">Expected delay: 5-10 minutes</p>
              <p className="text-sm text-muted-foreground" data-testid="text-last-updated">Last updated: 2 minutes ago</p>
            </div>
          </div>
          
          {/* Live Location */}
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Live Location</h3>
              <button 
                onClick={handleUpdateLocation}
                data-testid="button-update-location"
                className="success-bg text-white px-4 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity min-h-[44px]"
              >
                Update GPS
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Current Location:</span>
                <p className="font-medium text-foreground" data-testid="text-current-location">Main Street Junction</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Next Stop:</span>
                <p className="font-medium text-foreground" data-testid="text-next-stop">Central Mall (3 min)</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 success-bg rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground" data-testid="text-gps-status">GPS Active</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Current Passengers */}
        <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Current Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background rounded-lg">
              <p className="text-2xl font-bold text-primary" data-testid="text-occupied-seats">32</p>
              <p className="text-sm text-muted-foreground">Occupied Seats</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <p className="text-2xl font-bold text-success" data-testid="text-available-seats">13</p>
              <p className="text-sm text-muted-foreground">Available Seats</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <p className="text-2xl font-bold text-foreground" data-testid="text-prebookings">5</p>
              <p className="text-sm text-muted-foreground">Prebookings</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg">
              <p className="text-2xl font-bold text-warning" data-testid="text-occupancy">71%</p>
              <p className="text-sm text-muted-foreground">Occupancy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
