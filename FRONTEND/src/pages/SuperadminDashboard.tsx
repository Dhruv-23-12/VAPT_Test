import React from 'react';
import { StatCard } from '../components/charts/StatCard';
import { ActivityFeed } from '../components/common/ActivityFeed';
import { ScansChart, ScanTypeChart } from '../components/charts/ChartCard';
import { User, Calendar, Search, Clock, FileText, Activity } from 'lucide-react';

export default function SuperadminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your VAPT platform performance and activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value="2,847"
          change="+12%"
          changeType="positive"
          icon={User}
          description="Active registered users"
        />
        <StatCard
          title="Active Subscriptions"
          value="1,923"
          change="+8%"
          changeType="positive"
          icon={Calendar}
          description="Currently active plans"
        />
        <StatCard
          title="Scans This Month"
          value="12,456"
          change="+23%"
          changeType="positive"
          icon={Search}
          description="Total vulnerability scans"
        />
        <StatCard
          title="Avg. Scan Time"
          value="4.2min"
          change="-15%"
          changeType="negative"
          icon={Clock}
          description="Average completion time"
        />
        <StatCard
          title="Pending Reports"
          value="47"
          change="+5"
          changeType="neutral"
          icon={FileText}
          description="Reports awaiting review"
        />
        <StatCard
          title="System Health"
          value="99.8%"
          change="+0.2%"
          changeType="positive"
          icon={Activity}
          description="Overall uptime"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ScansChart />
        <ScanTypeChart />
        <ActivityFeed />
      </div>
    </div>
  );
}
