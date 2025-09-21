import { useState } from "react";
import { mockBuses, type Bus } from "../data/mockBuses";
import { useAppContext } from "../App";
import { useToast } from "@/hooks/use-toast";

export default function UserDashboard() {
  const [searchData, setSearchData] = useState({
    startingPoint: '',
    destination: ''
  });
  
  const { showModal } = useAppContext();
  
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSearchBuses = () => {
    toast({
      title: "Searching for buses...",
      description: "Mock search completed - showing all available buses",
    });
  };

  const handlePrebookSeat = (busNumber: string) => {
    showModal(`Your seat on ${busNumber} has been successfully prebooked. You will receive a confirmation SMS shortly.`);
  };

  const handleJoinWaitlist = (busNumber: string) => {
    showModal(`You have been added to the waitlist for ${busNumber}. We'll notify you if a seat becomes available.`);
  };

  const getStatusColor = (available: number) => {
    if (available === 0) return 'bg-red-500';
    if (available <= 5) return 'warning-bg';
    return 'success-bg';
  };

  const getStatusText = (available: number) => {
    if (available === 0) return 'Full (Waitlist)';
    if (available <= 5) return `${available} seats available`;
    return `${available} seats available`;
  };

  const getStatusTextColor = (available: number) => {
    if (available === 0) return 'text-red-600';
    if (available <= 5) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Search Section */}
        <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Find Your Bus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Starting Point</label>
              <input 
                type="text" 
                name="startingPoint"
                value={searchData.startingPoint}
                onChange={handleInputChange}
                placeholder="Enter pickup location" 
                data-testid="input-starting-point"
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Destination</label>
              <input 
                type="text" 
                name="destination"
                value={searchData.destination}
                onChange={handleInputChange}
                placeholder="Enter destination" 
                data-testid="input-destination"
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all" 
              />
            </div>
          </div>
          <button 
            onClick={handleSearchBuses}
            data-testid="button-search-buses"
            className="w-full md:w-auto mt-4 btn-primary py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            Search Buses
          </button>
        </div>
        
        {/* Bus Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Available Buses</h3>
          
          {mockBuses.map((bus: Bus, index: number) => (
            <div key={bus.number} className="bg-card rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 px-3 py-2 rounded-lg">
                      <span className="font-bold text-primary" data-testid={`text-bus-number-${index}`}>{bus.number}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 ${getStatusColor(bus.available)} rounded-full`}></div>
                      <span className={`text-sm font-medium ${getStatusTextColor(bus.available)}`} data-testid={`text-availability-${index}`}>
                        {getStatusText(bus.available)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Route:</span>
                      <p className="font-medium text-foreground" data-testid={`text-route-${index}`}>{bus.route}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Timing:</span>
                      <p className="font-medium text-foreground" data-testid={`text-timing-${index}`}>{bus.timing}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Traffic:</span>
                      <p className="font-medium text-foreground" data-testid={`text-traffic-${index}`}>{bus.traffic}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <p className="font-medium text-foreground" data-testid={`text-location-${index}`}>{bus.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:ml-6">
                  {bus.available > 0 ? (
                    <button 
                      onClick={() => handlePrebookSeat(bus.number)}
                      data-testid={`button-prebook-${index}`}
                      className="w-full md:w-auto btn-primary py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Prebook Seat
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleJoinWaitlist(bus.number)}
                      data-testid={`button-waitlist-${index}`}
                      className="w-full md:w-auto bg-secondary text-secondary-foreground py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Join Waitlist
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
