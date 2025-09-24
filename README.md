# 🚌 Bus Tracker - Frontend Application

A modern, responsive bus tracking application built with React, TypeScript, and Tailwind CSS. Features real-time bus tracking, multi-theming, interactive maps, and a beautiful user interface.

## ✨ Features

### 🎨 **Multi-Theme Support**
- 6 beautiful themes: Light, Dark, Blue, Green, Purple, Orange
- Smooth theme switching with persistent storage
- Consistent design across all components

### 🗺️ **Real-Time Maps**
- Interactive maps using Leaflet and React-Leaflet
- Live bus location tracking with custom markers
- Real-time status indicators and popups
- Responsive map components on all pages

### 🎯 **User Dashboard**
- Advanced bus search and filtering
- Real-time bus availability tracking
- Interactive seat booking system
- Sortable bus listings by time, availability, and route
- Toggle-able map view

### 🏢 **Authority Dashboard**
- Comprehensive bus fleet management
- Real-time status monitoring
- Interactive bus selection
- Live location and traffic updates
- Quick action buttons for common tasks

### 🔐 **Modern Authentication**
- Beautiful login and signup forms
- Animated form transitions
- Password visibility toggle
- Loading states and validation
- Split-screen design with map integration

### 🎭 **Enhanced UI/UX**
- Smooth animations with Framer Motion
- Responsive design for all screen sizes
- Modern glassmorphism effects
- Interactive hover states
- Loading spinners and transitions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bustracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type checking

## 🏗️ Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── MapComponent.tsx    # Interactive map component
│   │   ├── ThemeProvider.tsx   # Theme management
│   │   ├── ThemeSwitcher.tsx   # Theme switcher component
│   │   └── Navbar.tsx          # Navigation component
│   ├── pages/
│   │   ├── Landing.tsx         # Hero landing page
│   │   ├── UserAuth.tsx        # Authentication pages
│   │   ├── UserDashboard.tsx   # User dashboard
│   │   └── AuthorityDashboard.tsx # Authority dashboard
│   ├── data/
│   │   └── mockBuses.ts        # Mock bus data
│   ├── hooks/
│   │   └── use-toast.ts        # Toast notifications
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   └── index.css               # Global styles and themes
```

## 🎨 Theming System

The application supports 6 different themes with CSS custom properties:

- **Light** - Clean, bright interface
- **Dark** - Modern dark mode
- **Blue** - Professional blue theme
- **Green** - Nature-inspired green
- **Purple** - Creative purple theme
- **Orange** - Energetic orange theme

Themes are applied using `data-theme` attributes and CSS custom properties for consistent theming across all components.

## 🗺️ Map Integration

The application uses Leaflet for interactive maps with:

- **Real-time bus markers** with custom icons
- **Status-based color coding** (on-time, delayed, early)
- **Interactive popups** with bus information
- **Responsive design** that works on all screen sizes
- **Custom bus icons** with status indicators

## 📱 Responsive Design

The application is fully responsive with:

- **Mobile-first approach** with progressive enhancement
- **Breakpoint-based layouts** for different screen sizes
- **Touch-friendly interactions** for mobile devices
- **Optimized performance** across all devices

## 🎭 Animation System

Built with Framer Motion for smooth animations:

- **Page transitions** with staggered animations
- **Component animations** on scroll and hover
- **Loading states** with smooth transitions
- **Interactive feedback** on user actions

## 🛠️ Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Leaflet** - Maps
- **React-Leaflet** - React map components
- **Lucide React** - Icons
- **Wouter** - Routing
- **React Hook Form** - Form management
- **Zod** - Validation

## 🎯 Key Features Explained

### Real-Time Bus Tracking
- Simulated real-time updates every 30 seconds
- Live status indicators for each bus
- Traffic condition monitoring
- GPS location tracking

### Interactive Search
- Advanced filtering by route, location, and availability
- Real-time search results
- Sortable bus listings
- Map integration with search results

### Modern Authentication
- Split-screen design with map background
- Animated form transitions
- Password visibility controls
- Loading states and validation feedback

### Authority Management
- Comprehensive bus fleet overview
- Real-time status monitoring
- Quick action buttons
- Interactive bus selection

## 🚀 Deployment

The application is ready for deployment on any static hosting service:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

3. **Configure your hosting service** to serve the `index.html` for all routes (SPA routing)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎉 Acknowledgments

- **Leaflet** for the amazing mapping library
- **Framer Motion** for smooth animations
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set

---

**Built with ❤️ for modern public transportation**

