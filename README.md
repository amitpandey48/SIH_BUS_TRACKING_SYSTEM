# 🚌 Smart Transportation (bus-tracker)

A compact, frontend-focused bus tracking demo using **React**, **Tailwind CSS**, **Leaflet** (via `react-leaflet`), and a minimal **Express + MongoDB** backend.  
This README explains how to set up, run, and extend the project, including how the map is integrated and how to add bus data.

---

## 📌 Project Summary

- **Frontend:** React + Vite, located in the workspace root.  
  Components and pages are under [`client/src`](client/src).

- **Map:** Uses `leaflet` and `react-leaflet` to render live markers and popups.  
  See [`client/src/components/MapComponent.tsx`](client/src/components/MapComponent.tsx#L1).

- **Backend:** Node/Express with MongoDB  
  Mongoose models in [`server/src/models.ts`](server/src/models.ts#L1).  
  Scripted seeding available at [`server/src/scripts/seed.ts`](server/src/scripts/seed.ts#L1).

---

## ✨ Features

- Live-looking map with markers and popups showing seat availability and traffic  
- Tile switcher (OSM / Carto Positron / Stamen Toner)  
- Locate button, availability filter, and legend  
- Mock data in [`client/src/data/mockBuses.ts`](client/src/data/mockBuses.ts#L1)  
- Server-side seed script mirrors the same buses  
- Booking uses an atomic endpoint  
  `POST /api/buses/:id/book` (created to prevent race conditions)  
- UI components use **React Query**, so updates propagate across pages in real time

---

## ⚙️ Prerequisites

- Node.js (16+ recommended) and `npm` or `pnpm`
- MongoDB running locally  
  *(or provide a remote URI in `server/.env`)*

---

## 🚀 Quick Start — Install

### 1️⃣ Install frontend dependencies  
*(root contains frontend `package.json`)*

```bash
npm install
2️⃣ Install server dependencies
bash
Copy code
cd server
npm install
🔐 Environment
Copy or edit server/.env

Set:

MONGODB_URI (default included)

PORT (defaults to 5000)

NODE_ENV

🌱 Seeding the Database
Seed the database with the included example buses
(this clears existing bus documents)

bash
Copy code
cd server
npm run seed
🧪 Development — Running the App
Run the server (dev mode, uses tsx watcher)
bash
Copy code
cd server
npm run dev
Run the frontend (Vite) from repo root
bash
Copy code
npm run dev
🏗️ Building / Preview
Build frontend
bash
Copy code
npm run build
Build server and run (if needed)
bash
Copy code
cd server
npm run build
npm start
🗺️ How the Map Is Added
Libraries: leaflet and react-leaflet
(see dependencies in root package.json)
The component imports leaflet/dist/leaflet.css for map styles.

Component:
MapComponent
(client/src/components/MapComponent.tsx)
Renders MapContainer, TileLayer, Marker, and Popup.

Tiles:
Default uses OpenStreetMap tiles, with options to switch to
Carto Positron or Stamen Toner.

Markers & Icons:
Custom divIcons show availability color and bus ID suffix.
Includes a fix for Leaflet’s icon image URLs to work with bundlers.

Data:
When not provided via props, MapComponent uses mockBuses from
client/src/data/mockBuses.ts.
Each bus includes latitude and longitude fields.

Fit & Update:
A small internal MapUpdater uses useMap() to fit bounds to current markers when locations change.

🧾 Adding or Updating Bus Data
Frontend (mock data)
Edit client/src/data/mockBuses.ts

Each object should include:

number

route

seats

available

timing

traffic

location

trafficStatus (light | moderate | heavy)

latitude

longitude

Server (seeded data)
Update server/src/scripts/seed.ts
Then run:

bash
Copy code
npm run seed
🔌 API Notes
Backend models are defined in
server/src/models.ts

Add endpoints in
server/src/routes.ts
or expand routes.ts as needed.

🧪 Testing
Server includes:

bash
Copy code
npm run test-api
Runs a small script test-api.js to exercise endpoints.

🔮 Possible Improvements / Next Steps
Add marker clustering (e.g., leaflet.markercluster)

Add live updates using WebSockets or Server-Sent Events

Add route polylines and vehicle headings for richer visualization

🤝 Contributing
PRs welcome

Follow the repo style

Add tests where appropriate

📄 License
MIT — see package.json for license field

❓ Questions?
Ask here or open an issue — happy to help. 🚀
