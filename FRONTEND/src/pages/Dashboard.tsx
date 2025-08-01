import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import { StatCard } from '../components/charts/StatCard';
import VulnerabilityChart from '../components/charts/VulnerabilityChart';
import LatestScans from '../components/common/LatestScans';
import ScanActivityDashboard from '../components/sections/ScanActivityDashboard';
import SystemStatusCard from '../components/charts/SystemStatusCard';

import { 
  Globe, 
  Server, 
  Wifi, 
  Database
} from 'lucide-react';
import DashboardHeader from '../components/layout/DashboardHeader';

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    // Use window.location for navigation to avoid hook issues
    window.location.href = '/login';
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="flex h-screen">
        <Sidebar userRole="admin" />
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Test Animation Box */}
          
          {/* Fixed Header */}
          <DashboardHeader onLogout={handleLogout} userRole="admin" />
          {/* Dashboard Content */}
          <div className="flex-1 p-6 space-y-6 overflow-auto mt-16">
            {/* Page Title */}
            <div className="flex flex-col gap-2">
              <motion.div
                className="text-3xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, x: -120 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                Dashboard Overview
              </motion.div>
              <motion.div
                className="text-gray-600"
                initial={{ opacity: 0, x: 120 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Monitor your vulnerability assessment and penetration testing activities
              </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">IP Addresses</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-xs text-gray-500 mt-1">Total scanned IPs</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Hostnames</p>
                    <p className="text-2xl font-bold text-gray-900">892</p>
                    <p className="text-xs text-gray-500 mt-1">Active hostnames</p>
                  </div>
                  <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <Server className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Open Ports</p>
                    <p className="text-2xl font-bold text-gray-900">15,432</p>
                    <p className="text-xs text-gray-500 mt-1">Discovered ports</p>
                  </div>
                  <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Wifi className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Protocols</p>
                    <p className="text-2xl font-bold text-gray-900">23</p>
                    <p className="text-xs text-gray-500 mt-1">Active protocols</p>
                  </div>
                  <div className="h-12 w-12 bg-orange-50 rounded-lg flex items-center justify-center">
                    <Database className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Charts Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <VulnerabilityChart />
                </div>
              </div>
              <div>
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <SystemStatusCard />
                </div>
              </div>
            </motion.div>

            {/* Activity Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7, type: 'spring' }}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <ScanActivityDashboard />
            </motion.div>

            {/* Latest Scans Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7, type: 'spring' }}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <LatestScans />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;