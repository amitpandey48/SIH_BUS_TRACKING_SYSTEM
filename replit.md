# Real-Time Bus Tracking System

## Overview

This is a frontend-only React web application for a Real-Time Bus Tracking System with two main user roles: Authority (Bus Conductor/Driver) and regular Users. The system allows authorities to manage bus information and enables users to search for buses, view real-time data, and prebook seats. The application is built with a mobile-first approach using React, TypeScript, Tailwind CSS, and shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and better development experience
- **Routing**: Wouter for lightweight client-side routing without the overhead of React Router
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible, and mobile-first design
- **State Management**: React Context API for global state (modal management) and useState for local component state
- **UI Components**: shadcn/ui components built on Radix UI primitives for accessibility and customization

### Backend Architecture
- **Server**: Express.js with TypeScript for API endpoints (currently minimal implementation)
- **Build System**: Vite for fast development and optimized production builds
- **Development Tools**: ESBuild for server-side bundling and hot module replacement

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Shared schema definitions between client and server using Drizzle and Zod
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development and PostgreSQL for production
- **Mock Data**: Frontend uses static mock data for bus information to enable frontend-only operation

### Authentication and Authorization
- **Current Implementation**: Mock authentication with no actual validation (redirects directly to dashboards)
- **User Roles**: Two distinct user flows - Authority and regular User with separate login pages and dashboards
- **Session Management**: Basic structure in place with express-session and connect-pg-simple for PostgreSQL session storage

### Mobile-First Design Philosophy
- **Responsive Design**: Tailwind CSS classes ensure layouts work seamlessly from mobile to desktop
- **Touch-Friendly Interface**: Buttons and interactive elements sized appropriately for mobile interaction
- **Progressive Enhancement**: Core functionality works on mobile with enhanced features on larger screens

## External Dependencies

### UI and Styling
- **shadcn/ui**: Complete component library built on Radix UI for accessibility
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Radix UI**: Headless UI components for accessibility and customization
- **Lucide React**: Icon library for consistent iconography

### Development and Build Tools
- **Vite**: Fast build tool with HMR and optimized bundling
- **TypeScript**: Static type checking for better code quality
- **ESBuild**: Fast JavaScript bundler for server-side code

### Database and ORM
- **Drizzle ORM**: Type-safe database toolkit with schema migrations
- **Neon Database**: Serverless PostgreSQL for production deployment
- **Zod**: Schema validation library for type-safe data validation

### State Management and Data Fetching
- **TanStack Query**: Data fetching and caching library (configured but not actively used due to mock data)
- **React Hook Form**: Form handling with validation support

### Replit Integration
- **Replit Plugins**: Development tools including error overlay, cartographer, and dev banner for enhanced development experience