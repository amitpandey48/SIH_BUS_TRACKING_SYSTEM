```
═══════════════════════════════════════════════════════════════════════════════
                    🗄️ BUS TRACKER - DATABASE VISUAL GUIDE 🗄️
═══════════════════════════════════════════════════════════════════════════════

                              DATABASE OVERVIEW
                              ═════════════════

                          Your React App (Frontend)
                                    │
                          http://localhost:3000
                                    │
          ─────────────────────────────────────────────────────────
          │                                                        │
          │ (calls API endp~oints)                  (stores/retrieves)│
          ▼                                                        ▼
    ┌──────────────┐
    │ Your Backend │ ◄────── http://localhost:5000/api
    │  (Node.js)   │
    └──────┬───────┘
           │
           │ (persists data to)
           ▼
    ┌──────────────────────┐
    │ MongoDB Database     │
    │ ("bus-tracker")     │
    └──────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
                            DB SETUP FLOW
                            ════════════

    START
      │
      ├─► Get MongoDB URI (Atlas or local)
      │
      ├─► Create `.env` in `server/` and set `DATABASE_URL`
      │
      ├─► npm install (in server)
      │
      ├─► npm run seed    (populate `buses` + `users` sample docs)
      │
      ├─► npm run dev     (start server)
      │
      └─► DONE! Backend connected to DB and seeded

═══════════════════════════════════════════════════════════════════════════════
                        API & DB INTERACTIONS
                        ═════════════════════

    BASE URL: http://localhost:5000/api

    ┌─────────────────────────────────────────┐
    │                                         │
    ├─► /health                (health check) │
    │                                         │
    ├─► /user                  (user routes)  │
    │   ├─ POST /signup                         │
    │   └─ POST /login                          │
    │                                         │
    ├─► /authority             (admin routes) │
    │   ├─ POST /signup                         │
    │   └─ POST /login                          │
    │                                         │
    └─► /buses                 (bus data)     │
        ├─ GET   /    (all buses)               │
        ├─ GET   /:id (single bus)              │
        ├─ POST  /    (create)                  │
        ├─ PUT   /:id (update)                  │
        └─ DELETE /:id (delete)                 │
    │                                         │
    └─────────────────────────────────────────┘

    For each API call the server will read/write documents in the collections below.

═══════════════════════════════════════════════════════════════════════════════
                          FILE LOCATIONS (DB FOCUS)
                          ════════════════════

    server/
    ├─ src/
    │  ├─ models.ts          ◄── Mongoose schemas & Types
    │  ├─ routes.ts          ◄── API endpoints that touch DB
    │  └─ scripts/seed.ts    ◄── Prepopulates `buses` + `users`
    ├─ .env.example         ◄── TEMPLATE: DATABASE_URL
    └─ package.json         ◄── scripts: `seed`, `dev`, `test-api`

═══════════════════════════════════════════════════════════════════════════════
                        3 MINUTES TO CONNECT DB
                        ════════════════════

    Open terminal in `server/`:

    $ copy .env.example .env
    $ notepad .env            (paste your MongoDB URI into DATABASE_URL)

    $ npm install
    $ npm run seed            (load sample buses / users)
    $ npm run dev

    ✅ Server now connected to MongoDB and ready to accept requests

═══════════════════════════════════════════════════════════════════════════════
                        DATABASE COLLECTIONS (DETAILED)
                        ═══════════════════════════════════

    MongoDB "bus-tracker" database
    │
    ├─► Collection: users
    │   └─ Schema (suggested):
    │      {
    │        _id: ObjectId,
    │        name: string,
    │        email: string (unique),
    │        phone: string,
    │        passwordHash: string,
    │        role: 'user'|'authority'|'admin',
    │        createdAt: Date,
    │        updatedAt: Date
    │      }
    │
    ├─► Collection: buses
    │   └─ Schema (from mock + extension):
    │      {
    │        _id: ObjectId,
    │        number: string (unique),
    │        route: string,
    │        seats: number,
    │        available: number,
    │        timing: string,
    │        location: string,
    │        latitude: number,
    │        longitude: number,
    │        traffic: string,
    │        trafficStatus: 'light'|'moderate'|'heavy',
    │        driverId: ObjectId (ref users, optional),
    │        createdAt: Date,
    │        updatedAt: Date
    │      }
    │
    ├─► Collection: authorities
    │   └─ Schema:
    │      {
    │        _id: ObjectId,
    │        username: string,
    │        passwordHash: string,
    │        organizationName: string,
    │        createdAt: Date
    │      }
    │
    ├─► Collection: trips (optional)
    │   └─ Schema:
    │      {
    │        _id: ObjectId,
    │        busId: ObjectId (ref buses),
    │        route: string,
    │        scheduledStart: Date,
    │        scheduledEnd: Date,
    │        status: 'scheduled'|'active'|'completed'|'cancelled',
    │        metadata: Object
    │      }
    │
    └─► Collection: positions (optional, high-volume)
        └─ Schema:
           {
             _id: ObjectId,
             busId: ObjectId (ref buses),
             tripId: ObjectId (ref trips, optional),
             recordedAt: Date,
             latitude: number,
             longitude: number,
             speedKmh: number,
             headingDeg: number,
             extra: Object
           }

    Index recommendations:
    - users: unique index on `email`
    - buses: unique index on `number`; geospatial index on location
    - positions: compound `{ busId, recordedAt }` and TTL policy if retention needed

═══════════════════════════════════════════════════════════════════════════════
                        REACT → BACKEND → DB FLOW
                        ═══════════════════════

    In React: import { getAllBuses } from '@/lib/api'

    useEffect(() => {
      const buses = await getAllBuses()
                        ▼
        HTTP GET → http://localhost:5000/api/buses
                        ▼
        `routes.ts` handles request → queries `buses` collection
                        ▼
        MongoDB returns bus documents
                        ▼
        Server responds JSON → React consumes and renders
    }, [])

═══════════════════════════════════════════════════════════════════════════════
                        COMMAND REFERENCE (DB)
                        ═══════════════════

    $ npm install          → Install server deps
    $ npm run seed         → Insert sample buses + users
    $ npm run dev          → Start server (connects to DATABASE_URL)
    $ npm run test-api     → Sanity-check endpoints

═══════════════════════════════════════════════════════════════════════════════
                        WHAT'S INCLUDED (DB)
                        ═════════════════

    ✅ Mongoose-ready models (server/src/models.ts suggested)
    ✅ Seed script to populate `buses` and `users`
    ✅ API endpoints that map to DB collections
    ✅ Clear README + Visual Guide referencing DB

═══════════════════════════════════════════════════════════════════════════════
                        NEXT STEPS (RECOMMENDED)
                        ═════════════════════

    1. Confirm or create `server/src/models.ts` following the schemas above
    2. Add/verify `server/src/scripts/seed.ts` to load sample data used by frontend
    3. Add indexes & optional TTL/retention policies for `positions`
    4. Add tests for DB migrations & seed
    5. Consider TimescaleDB or separate timeseries store for very high telemetry volume

═══════════════════════════════════════════════════════════════════════════════
                    DATABASE VISUAL GUIDE CREATED — HAPPY QUERYING! 🚀
═══════════════════════════════════════════════════════════════════════════════
```