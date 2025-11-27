import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../../components/ui/NavigationBar';
import AlertBadgeIndicator from '../../components/ui/AlertBadgeIndicator';
import PetSelector from '../../components/ui/PetSelector';
import VitalSignCard from './components/VitalSignCard';
import VitalSignsChart from './components/VitalSignsChart';
import HealthAlertCard from './components/HealthAlertCard';
import ActivityFeedItem from './components/ActivityFeedItem';
import CareReminderCard from './components/CareReminderCard';
import HealthMilestoneTracker from './components/HealthMilestoneTracker';
import SyncStatusIndicator from './components/SyncStatusIndicator';
import Select from '../../components/ui/Select';
import Icon from '../../components/common/AppIcon';

const PetHealthOverview = () => {
  const [timeRange, setTimeRange] = useState('24h');

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const vitalSigns = [
    {
      title: 'Heart Rate',
      value: 95,
      unit: 'bpm',
      status: 'normal',
      trend: 2.5,
      icon: 'Heart',
      sparklineData: [88, 92, 90, 95, 93, 97, 95, 94, 96, 95]
    },
    {
      title: 'Temperature',
      value: 101.5,
      unit: '°F',
      status: 'normal',
      trend: -0.8,
      icon: 'Thermometer',
      sparklineData: [101.8, 101.6, 101.7, 101.5, 101.4, 101.6, 101.5, 101.3, 101.5, 101.5]
    },
    {
      title: 'Activity Level',
      value: 78,
      unit: '%',
      status: 'normal',
      trend: 5.2,
      icon: 'Activity',
      sparklineData: [70, 72, 75, 78, 76, 80, 78, 77, 79, 78]
    },
    {
      title: 'Sleep Quality',
      value: 85,
      unit: '%',
      status: 'normal',
      trend: 3.1,
      icon: 'Moon',
      sparklineData: [80, 82, 84, 85, 83, 87, 85, 84, 86, 85]
    }
  ];

  const chartData = [
    { time: '00:00', heartRate: 88, temperature: 101.8, activity: 20, sleep: 95 },
    { time: '02:00', heartRate: 85, temperature: 101.6, activity: 15, sleep: 98 },
    { time: '04:00', heartRate: 82, temperature: 101.5, activity: 10, sleep: 100 },
    { time: '06:00', heartRate: 90, temperature: 101.7, activity: 45, sleep: 80 },
    { time: '08:00', heartRate: 95, temperature: 101.9, activity: 70, sleep: 60 },
    { time: '10:00', heartRate: 98, temperature: 102.0, activity: 85, sleep: 40 },
    { time: '12:00', heartRate: 100, temperature: 102.1, activity: 90, sleep: 30 },
    { time: '14:00', heartRate: 97, temperature: 101.8, activity: 80, sleep: 35 },
    { time: '16:00', heartRate: 93, temperature: 101.6, activity: 75, sleep: 45 },
    { time: '18:00', heartRate: 90, temperature: 101.5, activity: 65, sleep: 55 },
    { time: '20:00', heartRate: 88, temperature: 101.4, activity: 50, sleep: 70 },
    { time: '22:00', heartRate: 85, temperature: 101.3, activity: 30, sleep: 85 }
  ];

  const healthAlerts = [
    {
      severity: 'warning',
      title: 'Elevated Heart Rate Detected',
      message: 'Heart rate exceeded normal range (120 bpm) during afternoon activity. Monitor for sustained elevation.',
      timestamp: new Date(Date.now() - 1800000),
      actionRequired: true
    },
    {
      severity: 'info',
      title: 'Activity Goal Achieved',
      message: 'Max completed 85% of daily activity target. Great progress on exercise routine!',
      timestamp: new Date(Date.now() - 3600000),
      actionRequired: false
    },
    {
      severity: 'critical',
      title: 'Medication Reminder',
      message: 'Evening medication dose is overdue by 30 minutes. Please administer as soon as possible.',
      timestamp: new Date(Date.now() - 1800000),
      actionRequired: true
    }
  ];

  const recentActivities = [
    {
      type: 'feeding',
      title: 'Morning Meal Completed',
      description: 'Consumed 2.5 cups of dry food in 8 minutes',
      timestamp: new Date(Date.now() - 7200000),
      icon: 'UtensilsCrossed'
    },
    {
      type: 'exercise',
      title: 'Walk Activity Logged',
      description: '45-minute walk with 2.3 miles covered',
      timestamp: new Date(Date.now() - 10800000),
      icon: 'Footprints'
    },
    {
      type: 'health',
      title: 'Vital Signs Check',
      description: 'All metrics within normal ranges',
      timestamp: new Date(Date.now() - 14400000),
      icon: 'Activity'
    },
    {
      type: 'medication',
      title: 'Medication Administered',
      description: 'Morning dose of joint supplement given',
      timestamp: new Date(Date.now() - 18000000),
      icon: 'Pill'
    }
  ];

  const careReminders = [
    {
      type: 'vaccination',
      title: 'Annual Rabies Vaccination',
      dueDate: new Date(Date.now() + 604800000),
      status: 'due-soon',
      description: 'Schedule appointment with Dr. Smith at Paws & Claws Veterinary'
    },
    {
      type: 'checkup',
      title: 'Quarterly Health Checkup',
      dueDate: new Date(Date.now() + 1209600000),
      status: 'upcoming',
      description: 'Routine examination and blood work analysis'
    },
    {
      type: 'grooming',
      title: 'Professional Grooming',
      dueDate: new Date(Date.now() + 259200000),
      status: 'due-soon',
      description: 'Full grooming service including nail trim and bath'
    }
  ];

  const milestones = [
    {
      type: 'vaccination',
      title: 'Vaccination Schedule',
      description: 'Core vaccines and boosters',
      progress: 75,
      completed: 3,
      total: 4,
      nextDue: new Date(Date.now() + 604800000)
    },
    {
      type: 'weight',
      title: 'Weight Management',
      description: 'Target: 65 lbs',
      progress: 92,
      completed: 23,
      total: 25,
      nextDue: new Date(Date.now() + 1209600000)
    },
    {
      type: 'medication',
      title: 'Medication Adherence',
      description: 'Daily supplements',
      progress: 88,
      completed: 26,
      total: 30,
      nextDue: new Date(Date.now() + 86400000)
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pet Health Overview - Smart Pet Care Dashboard</title>
        <meta name="description" content="Comprehensive health monitoring dashboard providing real-time vital signs, activity tracking, and care insights for your pet's wellbeing" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <AlertBadgeIndicator />

        <main className="main-content max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Pet Health Overview</h1>
                <p className="text-muted-foreground">Real-time monitoring and comprehensive health insights</p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <PetSelector />
                <Select
                  options={timeRangeOptions}
                  value={timeRange}
                  onChange={setTimeRange}
                  placeholder="Select time range"
                  className="w-full sm:w-48"
                />
                <SyncStatusIndicator />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {vitalSigns?.map((vital, index) => (
                <VitalSignCard key={index} {...vital} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <VitalSignsChart data={chartData} timeRange={timeRange} />
              </div>

              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Active Alerts</h3>
                    <span className="px-2 py-1 rounded-full bg-error/10 text-error text-xs font-medium">
                      {healthAlerts?.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {healthAlerts?.map((alert, index) => (
                      <HealthAlertCard key={index} {...alert} />
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activities</h3>
                  <div className="space-y-1">
                    {recentActivities?.map((activity, index) => (
                      <ActivityFeedItem key={index} {...activity} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <HealthMilestoneTracker milestones={milestones} />

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Care Reminders</h3>
                    <p className="text-sm text-muted-foreground mt-1">Upcoming appointments and tasks</p>
                  </div>
                  <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    View Calendar
                  </button>
                </div>
                <div className="space-y-4">
                  {careReminders?.map((reminder, index) => (
                    <CareReminderCard key={index} {...reminder} />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
                  <p className="text-sm text-muted-foreground mt-1">Common tasks and reports</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="flex items-center gap-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon name="FileText" size={20} color="var(--color-primary)" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">Export Report</p>
                    <p className="text-xs text-muted-foreground">Generate health summary</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Icon name="Calendar" size={20} color="var(--color-success)" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">Schedule Visit</p>
                    <p className="text-xs text-muted-foreground">Book veterinary appointment</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                  <div className="p-2 rounded-lg bg-warning/10">
                    <Icon name="Settings" size={20} color="var(--color-warning)" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">Alert Settings</p>
                    <p className="text-xs text-muted-foreground">Configure thresholds</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-4 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Icon name="Share2" size={20} color="var(--color-secondary)" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">Share Data</p>
                    <p className="text-xs text-muted-foreground">Send to veterinarian</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PetHealthOverview;