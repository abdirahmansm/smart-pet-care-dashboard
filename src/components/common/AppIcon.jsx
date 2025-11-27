import React from 'react';
import { Heart, Thermometer, Activity, Moon, UtensilsCrossed, Footprints, Pill, FileText, Calendar, Settings, Share2, Bell, ChevronUp, ChevronDown, Check, TrendingUp, TrendingDown, Minus, Download, Maximize2, Info, AlertCircle, AlertTriangle, Clock, Syringe, Stethoscope, Scissors, Scale, CheckCircle, Wifi, RefreshCw, WifiOff } from 'lucide-react';

const iconMap = {
  Heart,
  Thermometer,
  Activity,
  Moon,
  UtensilsCrossed,
  Footprints,
  Pill,
  FileText,
  Calendar,
  Settings,
  Share2,
  Bell,
  ChevronUp,
  ChevronDown,
  Check,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Maximize2,
  Info,
  AlertCircle,
  AlertTriangle,
  Clock,
  Syringe,
  Stethoscope,
  Scissors,
  Scale,
  CheckCircle,
  Wifi,
  RefreshCw,
  WifiOff
};

const Icon = ({ name, size = 24, color = 'currentColor' }) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} />;
};

export default Icon;