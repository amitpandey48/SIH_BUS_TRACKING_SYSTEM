export interface Bus {
  number: string;
  route: string;
  seats: number;
  available: number;
  timing: string;
  traffic: string;
  location: string;
  trafficStatus: 'light' | 'moderate' | 'heavy';
}

export const mockBuses: Bus[] = [
  {
    number: "BUS001",
    route: "City Center ↔ Airport",
    seats: 45,
    available: 13,
    timing: "08:30 AM - 09:45 AM",
    traffic: "Moderate (5 min delay)",
    location: "Main Street Junction",
    trafficStatus: 'moderate'
  },
  {
    number: "BUS002",
    route: "Downtown ↔ University",
    seats: 40,
    available: 8,
    timing: "09:00 AM - 10:30 AM",
    traffic: "Light (On time)",
    location: "City Mall Stop",
    trafficStatus: 'light'
  },
  {
    number: "BUS003",
    route: "North Station ↔ South Plaza",
    seats: 42,
    available: 3,
    timing: "09:15 AM - 10:45 AM",
    traffic: "Heavy (15 min delay)",
    location: "Park Avenue",
    trafficStatus: 'heavy'
  },
  {
    number: "BUS004",
    route: "Metro Station ↔ Business District",
    seats: 50,
    available: 20,
    timing: "09:30 AM - 11:00 AM",
    traffic: "Light (On time)",
    location: "Central Square",
    trafficStatus: 'light'
  },
  {
    number: "BUS005",
    route: "Tech Hub ↔ Residential Area",
    seats: 38,
    available: 0,
    timing: "10:00 AM - 11:15 AM",
    traffic: "Moderate (8 min delay)",
    location: "Innovation Center",
    trafficStatus: 'moderate'
  }
];
