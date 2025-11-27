import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import AlertBadgeIndicator from '../../components/ui/AlertBadgeIndicator';
import PetSelector from '../../components/ui/PetSelector';
import FeedingKPICard from './components/FeedingKPICard';
import ConsumptionChart from './components/ConsumptionChart';
import DeviceStatusPanel from './components/DeviceStatusPanel';
import UpcomingFeedingsPanel from './components/UpcomingFeedingsPanel';
import NutritionRecommendations from './components/NutritionRecommendations';
import FeedingEfficiencyTable from './components/FeedingEfficiencyTable';
import Icon from '../../components/AppIcon';

const FeedingAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [feedingMethod, setFeedingMethod] = useState('all');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const kpiData = [
    {
      title: "Daily Consumption",
      value: "1,245",
      unit: "g",
      change: "+8.2%",
      changeType: "positive",
      icon: "UtensilsCrossed",
      iconColor: "var(--color-primary)"
    },
    {
      title: "Schedule Adherence",
      value: "94.5",
      unit: "%",
      change: "+2.1%",
      changeType: "positive",
      icon: "Clock",
      iconColor: "var(--color-secondary)"
    },
    {
      title: "Waste Percentage",
      value: "4.2",
      unit: "%",
      change: "-1.3%",
      changeType: "positive",
      icon: "TrendingDown",
      iconColor: "var(--color-success)"
    },
    {
      title: "Nutrition Goal",
      value: "87",
      unit: "%",
      change: "+5.4%",
      changeType: "positive",
      icon: "Target",
      iconColor: "var(--color-accent)"
    }
  ];

  const chartData = [
    { time: "06:00", amount: 180, consumptionRate: 95 },
    { time: "09:00", amount: 120, consumptionRate: 88 },
    { time: "12:00", amount: 250, consumptionRate: 92 },
    { time: "15:00", amount: 100, consumptionRate: 85 },
    { time: "18:00", amount: 280, consumptionRate: 97 },
    { time: "21:00", amount: 150, consumptionRate: 90 }
  ];

  const deviceData = [
    {
      id: 1,
      name: "Auto Feeder 1",
      type: "Smart Bowl",
      status: "online",
      battery: 85,
      foodLevel: 65,
      lastFeeding: "2 hours ago"
    },
    {
      id: 2,
      name: "Auto Feeder 2",
      type: "Dispenser",
      status: "online",
      battery: 92,
      foodLevel: 45,
      lastFeeding: "4 hours ago"
    },
    {
      id: 3,
      name: "Manual Bowl",
      type: "Traditional",
      status: "maintenance",
      battery: 100,
      foodLevel: 80,
      lastFeeding: "6 hours ago"
    }
  ];

  const upcomingFeedings = [
    {
      id: 1,
      type: "dinner",
      time: "18:00",
      amount: 280,
      device: "Auto Feeder 1",
      isAutomated: true
    },
    {
      id: 2,
      type: "snack",
      time: "20:30",
      amount: 80,
      device: "Auto Feeder 2",
      isAutomated: true
    },
    {
      id: 3,
      type: "breakfast",
      time: "Tomorrow 06:00",
      amount: 180,
      device: "Auto Feeder 1",
      isAutomated: true
    }
  ];

  const recommendations = [
    {
      id: 1,
      priority: "high",
      title: "Increase Protein Intake",
      description: "Based on activity levels, consider increasing protein-rich food by 15% to support muscle development and energy needs.",
      action: "View Recommendations"
    },
    {
      id: 2,
      priority: "medium",
      title: "Optimize Feeding Schedule",
      description: "Peak consumption occurs between 6-7 PM. Consider adjusting dinner time to 6:30 PM for better adherence.",
      action: "Adjust Schedule"
    },
    {
      id: 3,
      priority: "low",
      title: "Reduce Waste",
      description: "Portion sizes at lunch show 8% waste. Consider reducing lunch portions by 20g to minimize food waste.",
      action: "Update Portions"
    }
  ];

  const efficiencyData = [
    {
      time: "11/26 06:00",
      mealType: "breakfast",
      device: "Auto Feeder 1",
      scheduled: 180,
      actual: 175,
      accuracy: 97.2,
      consumptionTime: "12 min",
      waste: 2.8
    },
    {
      time: "11/26 09:00",
      mealType: "snack",
      device: "Auto Feeder 2",
      scheduled: 120,
      actual: 105,
      accuracy: 87.5,
      consumptionTime: "8 min",
      waste: 12.5
    },
    {
      time: "11/26 12:00",
      mealType: "lunch",
      device: "Auto Feeder 1",
      scheduled: 250,
      actual: 240,
      accuracy: 96.0,
      consumptionTime: "15 min",
      waste: 4.0
    },
    {
      time: "11/26 15:00",
      mealType: "snack",
      device: "Manual Bowl",
      scheduled: 100,
      actual: 95,
      accuracy: 95.0,
      consumptionTime: "10 min",
      waste: 5.0
    },
    {
      time: "11/25 18:00",
      mealType: "dinner",
      device: "Auto Feeder 1",
      scheduled: 280,
      actual: 275,
      accuracy: 98.2,
      consumptionTime: "18 min",
      waste: 1.8
    },
    {
      time: "11/25 21:00",
      mealType: "snack",
      device: "Auto Feeder 2",
      scheduled: 150,
      actual: 140,
      accuracy: 93.3,
      consumptionTime: "11 min",
      waste: 6.7
    },
    {
      time: "11/25 06:00",
      mealType: "breakfast",
      device: "Auto Feeder 1",
      scheduled: 180,
      actual: 178,
      accuracy: 98.9,
      consumptionTime: "13 min",
      waste: 1.1
    },
    {
      time: "11/25 09:00",
      mealType: "snack",
      device: "Auto Feeder 2",
      scheduled: 120,
      actual: 110,
      accuracy: 91.7,
      consumptionTime: "9 min",
      waste: 8.3
    },
    {
      time: "11/25 12:00",
      mealType: "lunch",
      device: "Auto Feeder 1",
      scheduled: 250,
      actual: 245,
      accuracy: 98.0,
      consumptionTime: "16 min",
      waste: 2.0
    },
    {
      time: "11/25 15:00",
      mealType: "snack",
      device: "Manual Bowl",
      scheduled: 100,
      actual: 92,
      accuracy: 92.0,
      consumptionTime: "7 min",
      waste: 8.0
    },
    {
      time: "11/24 18:00",
      mealType: "dinner",
      device: "Auto Feeder 1",
      scheduled: 280,
      actual: 270,
      accuracy: 96.4,
      consumptionTime: "17 min",
      waste: 3.6
    },
    {
      time: "11/24 21:00",
      mealType: "snack",
      device: "Auto Feeder 2",
      scheduled: 150,
      actual: 145,
      accuracy: 96.7,
      consumptionTime: "12 min",
      waste: 3.3
    }
  ];

  const periods = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const feedingMethods = [
    { value: 'all', label: 'All Methods' },
    { value: 'automated', label: 'Automated' },
    { value: 'manual', label: 'Manual' }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <NavigationBar />
      <AlertBadgeIndicator />
      <div className="main-content max-w-[1600px] mx-auto">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-[var(--color-foreground)] mb-2">
                Feeding Analytics Dashboard
              </h1>
              <p className="text-[var(--color-muted-foreground)]">
                Comprehensive nutrition tracking and feeding optimization insights
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <PetSelector />

              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e?.target?.value)}
                  className="px-4 py-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                >
                  {periods?.map(period => (
                    <option key={period?.value} value={period?.value}>{period?.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Icon name="Filter" size={16} color="var(--color-muted-foreground)" />
                <select
                  value={feedingMethod}
                  onChange={(e) => setFeedingMethod(e?.target?.value)}
                  className="px-4 py-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                >
                  {feedingMethods?.map(method => (
                    <option key={method?.value} value={method?.value}>{method?.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-[var(--color-muted-foreground)]">
            <Icon name="RefreshCw" size={14} />
            <span>Last updated: {lastUpdate?.toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {kpiData?.map((kpi, index) => (
            <FeedingKPICard key={index} {...kpi} />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
          <div className="xl:col-span-8">
            <ConsumptionChart data={chartData} period={selectedPeriod} />
          </div>

          <div className="xl:col-span-4 space-y-6">
            <DeviceStatusPanel devices={deviceData} />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
          <div className="xl:col-span-4">
            <UpcomingFeedingsPanel feedings={upcomingFeedings} />
          </div>

          <div className="xl:col-span-8">
            <NutritionRecommendations recommendations={recommendations} />
          </div>
        </div>

        <div className="mb-8">
          <FeedingEfficiencyTable data={efficiencyData} />
        </div>
      </div>
    </div>
  );
};

export default FeedingAnalytics;