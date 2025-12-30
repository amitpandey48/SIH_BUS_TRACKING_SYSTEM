# Data Flow Diagram (DFD) - Smart Transportation (Bus Tracker)

## 📊 System Overview

The Smart Transportation system is a real-time bus tracking application that manages user authentication and displays live bus information with traffic conditions. This DFD documents how data flows through the system from users, through the server, and back to the frontend.

---

## 🏗️ Architecture Components

### Frontend (React + Vite)
- User Interface for bus tracking and authentication
- Displays real-time bus data, routes, and availability
- Handles user authentication workflows

### Backend (Express + Node.js)
- API endpoints for user authentication
- Bus data management
- Request validation and processing

### Database (PostgreSQL with Drizzle ORM)
- Persistent storage for user credentials
- Type-safe database operations with Zod validation

### Shared Layer
- Common schema definitions
- Reusable types and validation schemas

---

## 🔄 Level 0 DFD - Context Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    USER (External Entity)                       │
│                    - Passengers                                 │
│                    - System Administrators                      │
│                                                                 │
└────────────────────┬────────────────────────────────────────────┘
                     │
        ┌────────────┴─────────────┐
        │                          │
   Authentication          Bus Information
   Credentials             Requests
        │                          │
        ↓                          ↓
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│           SMART TRANSPORTATION SYSTEM                           │
│         (Bus Tracking Application)                              │
│                                                                 │
└────────────────────┬────────────────────────────────────────────┘
        │                          │
    Auth Tokens            Live Bus Data
    User Session           Routes & Status
        │                          │
        └────────────┬─────────────┘
                     │
                     ↓
        ┌────────────────────────┐
        │   User (Authenticated) │
        │   - Access Dashboard   │
        │   - View Bus Tracking  │
        └────────────────────────┘
```

---

## 📋 Level 1 DFD - Major Processes

```
                         ┌─────────────────────┐
                         │  USER INPUT         │
                         │  - Credentials      │
                         │  - Bus Query        │
                         └──────────┬──────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         │                          │                          │
         ↓                          ↓                          ↓
    ┌─────────────┐         ┌──────────────┐         ┌─────────────┐
    │  PROCESS 1  │         │  PROCESS 2   │         │  PROCESS 3  │
    │             │         │              │         │             │
    │ User Auth   │         │ Bus Data     │         │ Real-time   │
    │ & Login     │         │ Management   │         │ Updates     │
    └──────┬──────┘         └──────┬───────┘         └──────┬──────┘
           │                       │                        │
           │ Username & Pass       │ Bus Queries            │ Location
           │                       │                        │ & Traffic
           ↓                       ↓                        ↓
    ┌──────────────────────────────────────────────────────┐
    │                                                      │
    │        DATABASE (PostgreSQL)                         │
    │                                                      │
    │  - Users Table (Authentication)                      │
    │  - Mock Bus Data (In-Memory)                         │
    │                                                      │
    └──────────────────────────────────────────────────────┘
           │                       │                        │
           │ Auth Result           │ Bus Data               │ Status
           ↓                       ↓                        ↓
    ┌──────────────────────────────────────────────────────┐
    │                                                      │
    │           FRONTEND DISPLAY                           │
    │                                                      │
    │  - Dashboard                                         │
    │  - Bus Listings                                      │
    │  - Map with Markers                                  │
    │  - Real-time Updates                                 │
    │                                                      │
    └──────────────────────────────────────────────────────┘
```

---

## 🔐 Process 1: User Authentication & Login

```
INPUT: User Credentials (username, password)
│
├─→ [1.1] Receive Login Request
│         Username & Password
│
├─→ [1.2] Validate Input with Zod Schema
│         ├─ Username format check
│         └─ Password format check
│
├─→ [1.3] Query Users Table
│         SELECT * FROM users WHERE username = ?
│
├─→ [1.4] Compare Password Hash
│         ├─ Match Found → Continue
│         └─ No Match → Authentication Failed
│
├─→ [1.5] Generate Session Token
│         Create JWT or Session ID
│
└─→ OUTPUT: Auth Token + User Data
           Stored in Client (localStorage/sessionStorage)

┌─────────────────────────────────────┐
│     DATABASE - USERS TABLE          │
├─────────────────────────────────────┤
│ id (UUID) │ username │ password      │
├─────────────────────────────────────┤
│ uuid-123  │ john_doe │ hash-***      │
│ uuid-456  │ jane_doe │ hash-***      │
└─────────────────────────────────────┘
```

---

## 🚌 Process 2: Bus Data Management

```
INPUT: Bus Query Request
│
├─→ [2.1] Receive Bus Information Request
│         Optional: Route filter, availability filter
│
├─→ [2.2] Load Mock Bus Data
│         From client/src/data/mockBuses.ts
│
├─→ [2.3] Apply Filters (if provided)
│         ├─ Filter by route
│         ├─ Filter by availability
│         └─ Filter by traffic status
│
├─→ [2.4] Enrich Bus Data with Real-time Info
│         ├─ Current location
│         ├─ Traffic conditions
│         └─ Available seats
│
└─→ OUTPUT: Filtered & Enriched Bus Data Array
           [
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
             ...
           ]

┌──────────────────────────────────────────────┐
│     BUS DATA INTERFACE                       │
├──────────────────────────────────────────────┤
│ • number: string (Bus ID)                    │
│ • route: string (From ↔ To)                  │
│ • seats: number (Total capacity)             │
│ • available: number (Empty seats)            │
│ • timing: string (Schedule)                  │
│ • traffic: string (Status + delay)           │
│ • location: string (Current position)        │
│ • trafficStatus: 'light'|'moderate'|'heavy'  │
└──────────────────────────────────────────────┘
```

---

## 🔄 Process 3: Real-time Updates & Display

```
INPUT: Bus Location & Traffic Data
│
├─→ [3.1] Fetch Real-time Bus Positions
│         Periodic polling or WebSocket
│
├─→ [3.2] Calculate Traffic Impact
│         ├─ Analyze congestion data
│         └─ Update delay estimates
│
├─→ [3.3] Update Available Seats
│         ├─ Track seat bookings
│         ├─ Decrement available count
│         └─ Sync across all clients (React Query)
│
├─→ [3.4] Format Data for Frontend
│         Convert to presentable format
│
└─→ OUTPUT: Real-time Bus Data to Frontend
           Displayed on map & listing pages

DATA FLOW TO FRONTEND:
┌──────────────────────────────────────┐
│   React Query / State Management      │
├──────────────────────────────────────┤
│   Cached Bus Data                     │
│   Auto-refetch on interval            │
│   Real-time updates across pages      │
└──────────────────────────────────────┘
           │
           ↓
┌──────────────────────────────────────┐
│   Components                          │
├──────────────────────────────────────┤
│   • MapComponent (Leaflet)            │
│   • Bus Listings                      │
│   • Availability Filters              │
│   • Traffic Indicators                │
└──────────────────────────────────────┘
```

---

## 📊 Data Store Schema

### Data Store D1: Users
```
TABLE: users
┌─────────────────────────────────────┐
│ Field       │ Type      │ Properties  │
├─────────────────────────────────────┤
│ id          │ varchar   │ PK, UUID    │
│ username    │ text      │ Unique, NN  │
│ password    │ text      │ Hashed, NN  │
└─────────────────────────────────────┘

Zod Schema - insertUserSchema:
{
  username: required string
  password: required string
}

TypeScript Types:
type User = {
  id: string;
  username: string;
  password: string;
}

type InsertUser = {
  username: string;
  password: string;
}
```

### Data Store D2: Bus Data (Mock/In-Memory)
```
SOURCE: client/src/data/mockBuses.ts

Bus Interface:
{
  number: string;           // BUS001
  route: string;            // City Center ↔ Airport
  seats: number;            // Total seats (45)
  available: number;        // Empty seats (13)
  timing: string;           // 08:30 AM - 09:45 AM
  traffic: string;          // Moderate (5 min delay)
  location: string;         // Main Street Junction
  trafficStatus: 'light'|'moderate'|'heavy'
}
```

---

## 🔗 External Interfaces / Data Flows

### 1. **Client to Server Communication**
```
REQUEST → POST /api/auth/login
Body: { username, password }
│
Response: { 
  success: boolean,
  user: User,
  token: string
}

REQUEST → GET /api/buses
Query: ?route=X&status=available
│
Response: Bus[]
```

### 2. **Frontend State Management**
```
Redux/React Query Store
├─ User Authentication State
│  ├─ isAuthenticated: boolean
│  ├─ currentUser: User | null
│  └─ token: string | null
│
├─ Bus Data State
│  ├─ buses: Bus[]
│  ├─ filters: FilterOptions
│  ├─ loading: boolean
│  └─ error: string | null
│
└─ UI State
   ├─ selectedBus: Bus | null
   ├─ mapCenter: [lat, lng]
   └─ activeFilters: string[]
```

---

## 🔐 Validation & Security

### Input Validation (Zod Schemas)
```
insertUserSchema validates:
✓ username - Required, must be unique
✓ password - Required, must meet security standards

Bus Query Validation:
✓ route - Optional string filter
✓ trafficStatus - Optional enum validation
✓ minAvailable - Optional number validation
```

### Data Security
```
✓ Passwords stored as hashed values (bcrypt recommended)
✓ JWT tokens for session management
✓ HTTPS for all communications
✓ CORS enabled for frontend origin only
✓ Database queries parameterized (Drizzle ORM)
```

---

## 📈 Level 2 DFD - Detailed User Authentication Flow

```
USER
  │
  ├─→ Enters Credentials (Username, Password)
  │
  ↓
Frontend: AuthorityLogin.tsx / UserAuth.tsx
  │
  ├─→ Form Validation (Client-side)
  │   ├─ Check for empty fields
  │   └─ Basic format validation
  │
  ├─→ Prepare Request Payload
  │   {
  │     username: "john_doe",
  │     password: "secure_pass"
  │   }
  │
  ↓
HTTP POST /api/auth/login
  │
  ↓
Backend: Express Server (server/routes.ts)
  │
  ├─→ Receive Request
  │
  ├─→ [Validate with Zod]
  │   insertUserSchema.parse(body)
  │
  ├─→ [Query Database]
  │   storage.getUserByUsername(username)
  │
  ├─→ [Compare Passwords]
  │   bcrypt.compare(provided_pass, stored_hash)
  │
  ├─→ [Generate Token]
  │   jwt.sign({ userId, username })
  │
  ↓
Response: { success: true, user: {...}, token: "jwt..." }
  │
  ↓
Frontend: Store Auth State
  ├─ Save token to localStorage
  ├─ Update Redux/Context state
  ├─ Redirect to Dashboard
  │
  ↓
User: Authenticated & Logged In ✓
```

---

## 📊 Complete Data Flow Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERACTIONS                       │
│  • Login with credentials                                       │
│  • Search buses by route/availability                           │
│  • View bus on map                                              │
│  • Book a seat (future)                                         │
└────────────┬────────────────────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                      │
│  • Authentication pages (UserAuth, AuthorityLogin)              │
│  • Dashboards (UserDashboard, AuthorityDashboard)               │
│  • Map Component with Leaflet                                   │
│  • Bus Listings & Filters                                       │
│  • React Query for data fetching & caching                      │
└────────────┬────────────────────────────────────────────────────┘
             │
             │ (HTTP / JSON)
             │
             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Express Server)                     │
│  • routes.ts - API endpoint definitions                         │
│  • index.ts - Server initialization & middleware                │
│  • storage.ts - Data access layer (MemStorage)                  │
│  • Request validation with Zod schemas                          │
└────────────┬────────────────────────────────────────────────────┘
             │
             ├──────────────┬──────────────┐
             │              │              │
             ↓              ↓              ↓
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │  D1: Users   │  │  D2: Buses   │  │  Shared      │
    │   Database   │  │  Mock Data   │  │  Schema      │
    │              │  │              │  │              │
    │ PostgreSQL   │  │ In-Memory    │  │ Drizzle ORM  │
    │ (Future)     │  │ (Current)    │  │ + Zod        │
    └──────────────┘  └──────────────┘  └──────────────┘
             │              │              │
             └──────────────┼──────────────┘
                            │
                            ↓
              ┌──────────────────────────┐
              │   Response to Frontend   │
              │   • Auth tokens          │
              │   • User data            │
              │   • Bus listings         │
              │   • Success/Error msgs   │
              └──────────────────────────┘
                            │
                            ↓
              ┌──────────────────────────┐
              │   User Gets Updated UI   │
              │   • Authenticated        │
              │   • Can view buses       │
              │   • Real-time tracking   │
              └──────────────────────────┘
```

---

## 📝 Key Technology Stack in Data Flow

| Component         | Technology          | Role in Data Flow              |
|------------------|---------------------|---------------------------------|
| Frontend Build    | Vite                | Development & bundling         |
| UI Library        | React               | Component rendering            |
| Styling           | Tailwind CSS        | UI styling                     |
| Data Fetching     | React Query         | Server state management        |
| Mapping           | Leaflet + react-leaflet | Geo-location display        |
| Backend           | Express.js          | API server & routing           |
| ORM               | Drizzle ORM         | Type-safe DB operations        |
| Validation        | Zod                 | Schema validation (client/server) |
| Database          | PostgreSQL          | Persistent user data           |
| Data Format       | TypeScript          | Type-safe data structures      |

---

## ✅ Summary

This DFD documents how data flows through the Smart Transportation system:

1. **User Authentication**: Credentials flow from frontend → backend → database validation → token returned
2. **Bus Data Management**: Mock bus data flows from storage → enriched with real-time info → sent to frontend
3. **Real-time Updates**: Bus positions & traffic flow continuously → React Query caches → components re-render
4. **Type Safety**: Drizzle ORM + Zod ensures data integrity across frontend and backend

The system is currently using in-memory storage for users and mock data for buses. Future enhancements will include persistent database storage.