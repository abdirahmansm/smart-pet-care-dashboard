import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../common/AppIcon';
import ThemeToggle from './ThemeToggle';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location?.pathname);

  const navigationItems = [
    {
      label: 'Health Overview',
      path: '/pet-health-overview',
      icon: 'Activity',
      tooltip: 'Monitor your pet\'s vital signs and health metrics'
    },
    {
      label: 'Feeding Analytics',
      path: '/feeding-analytics',
      icon: 'UtensilsCrossed',
      tooltip: 'Track feeding patterns and nutrition data'
    },
    {
      label: 'Environment Monitor',
      path: '/environment-monitor',
      icon: 'Thermometer',
      tooltip: 'Monitor environmental conditions and comfort zones'
    },
    {
      label: 'Alert Center',
      path: '/alert-management-center',
      icon: 'Bell',
      tooltip: 'Manage notifications and alert thresholds'
    }
  ];

  useEffect(() => {
    setActiveRoute(location?.pathname);
  }, [location?.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="navigation-bar" role="navigation" aria-label="Primary navigation">
      <div className="navigation-container">
        <div className="navigation-items">
          {navigationItems?.map((item) => (
            <div
              key={item?.path}
              className={`navigation-item ${activeRoute === item?.path ? 'active' : ''}`}
              onClick={() => handleNavigation(item?.path)}
              role="button"
              tabIndex={0}
              aria-label={item?.label}
              title={item?.tooltip}
              onKeyDown={(e) => {
                if (e?.key === 'Enter' || e?.key === ' ') {
                  e?.preventDefault();
                  handleNavigation(item?.path);
                }
              }}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className="md:hidden"
              />
              <span className="hidden md:inline">{item?.label}</span>
              <span className="md:hidden text-xs mt-1">{item?.label?.split(' ')?.[0]}</span>
            </div>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default NavigationBar;