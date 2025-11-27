# Smart Pet Care Dashboard

A comprehensive pet health monitoring dashboard built with modern web technologies. Monitor your pet's vital signs, feeding patterns, environmental conditions, and receive alerts for optimal pet care.

## 🚀 Features

- **Pet Health Overview** - Real-time vital signs monitoring (heart rate, temperature, activity, sleep)
- **Feeding Analytics** - Track feeding patterns and nutrition data
- **Environment Monitor** - Monitor environmental conditions and comfort zones
- **Alert Management** - Manage notifications and alert thresholds
- **Dark/Light Mode** - Toggle between themes for better user experience
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18 with JSX
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6 for navigation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography
- **State Management**: Redux Toolkit
- **Animations**: Framer Motion for smooth transitions

## 📋 Prerequisites

- Node.js (v16.x or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abdirahmansm/smart-pet-care-dashboard.git
   cd smart-pet-care-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:4036](http://localhost:4036) in your browser

## 📁 Project Structure

```
smart-pet-care-dashboard/
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── common/           # Shared components (Button, ErrorBoundary, etc.)
│   │   └── ui/               # UI components (NavigationBar, Select, etc.)
│   ├── pages/                # Page components
│   │   ├── pet-health-overview/
│   │   ├── feeding-analytics/
│   │   ├── environment-monitor/
│   │   └── alert-management-center/
│   ├── utils/                # Utility functions
│   ├── App.jsx               # Main app component with routing
│   ├── index.jsx             # App entry point
│   └── index.css             # Global styles and Tailwind imports
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.mjs           # Vite configuration
└── README.md
```

## 🎨 Styling & Themes

The app uses a custom design system with CSS variables for consistent theming:

- Light mode: Clean, bright interface
- Dark mode: Easy on the eyes for nighttime monitoring
- Responsive breakpoints for all device sizes
- Accessible color contrasts

## 📱 Pages

- **Pet Health Overview** (`/`) - Main dashboard with vital signs and health metrics
- **Feeding Analytics** (`/feeding-analytics`) - Feeding patterns and nutrition tracking
- **Environment Monitor** (`/environment-monitor`) - Environmental conditions monitoring
- **Alert Management** (`/alert-management-center`) - Notification and alert management

## 📦 Build & Deployment

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
