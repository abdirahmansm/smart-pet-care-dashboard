import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'
import ErrorBoundary from './components/ErrorBounder.jsx'
import NotFound from './pages/NotFound.jsx'
import EnvironmentMonitor from './pages/environment-monitor/index.jsx'
import FeedingAnalytics from './pages/feeding-analytics/index.jsx'
import PetHealthOverview from './pages/pet-health-overview/index.jsx'
import AlertManagementCenter from './pages/alert-management-center/index.jsx'

export default function App(){
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<PetHealthOverview />} />
          <Route path="/environment-monitor" element={<EnvironmentMonitor />} />
          <Route path="/feeding-analytics" element={<FeedingAnalytics />} />
          <Route path="/pet-health-overview" element={<PetHealthOverview />} />
          <Route path="/alert-management-center" element={<AlertManagementCenter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
