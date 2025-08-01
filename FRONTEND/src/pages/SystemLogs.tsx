import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Download, Play, Pause } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  component: string;
  message: string;
  details?: string;
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2024-06-30 10:35:22',
    level: 'info',
    component: 'Scanner',
    message: 'Deep scan completed for example.com',
    details: 'Scan ID: SCN-001, Duration: 12min, Vulnerabilities found: 5'
  },
  {
    id: '2',
    timestamp: '2024-06-30 10:34:15',
    level: 'warning',
    component: 'Auth',
    message: 'Multiple failed login attempts detected',
    details: 'IP: 192.168.1.100, User: admin@test.com, Attempts: 5'
  },
  {
    id: '3',
    timestamp: '2024-06-30 10:33:08',
    level: 'error',
    component: 'Database',
    message: 'Connection timeout to primary database',
    details: 'Failover to secondary database successful'
  },
  {
    id: '4',
    timestamp: '2024-06-30 10:32:45',
    level: 'info',
    component: 'API',
    message: 'New user registration completed',
    details: 'User: john@example.com, Plan: Professional'
  },
  {
    id: '5',
    timestamp: '2024-06-30 10:31:30',
    level: 'info',
    component: 'Billing',
    message: 'Monthly subscription renewed',
    details: 'User: sarah@company.com, Amount: $99.00'
  }
];

export default function SystemLogs() {
  const [isLiveTail, setIsLiveTail] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('all');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      case 'info': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return '●';
      case 'warning': return '⚠';
      case 'info': return 'ⓘ';
      default: return '○';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Logs</h1>
          <p className="text-gray-600">Monitor system activity and troubleshoot issues</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant={isLiveTail ? "default" : "outline"}
            onClick={() => setIsLiveTail(!isLiveTail)}
          >
            {isLiveTail ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isLiveTail ? 'Stop' : 'Live Tail'}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-blue-600">15,847</h3>
          <p className="text-gray-600 font-medium">Info Messages</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-yellow-600">342</h3>
          <p className="text-gray-600 font-medium">Warnings</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-red-600">23</h3>
          <p className="text-gray-600 font-medium">Errors</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900">2.1 GB</h3>
          <p className="text-gray-600 font-medium">Log Size</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex space-x-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search logs by message, component, or details..." className="pl-10" />
          </div>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-md"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Log Viewer */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">System Logs</h3>
          {isLiveTail && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">Live</span>
            </div>
          )}
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          <div className="space-y-2 p-4">
            {mockLogs.map((log) => (
              <div key={log.id} className="border-l-4 border-gray-200 pl-4 py-2 hover:bg-gray-50 rounded-r-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getLevelIcon(log.level)}</span>
                    <Badge className={getLevelColor(log.level)}>
                      {log.level.toUpperCase()}
                    </Badge>
                    <span className="text-sm font-medium text-gray-900">{log.component}</span>
                    <span className="text-sm text-gray-500">{log.timestamp}</span>
                  </div>
                </div>
                <div className="mt-1 ml-6">
                  <p className="text-sm text-gray-900">{log.message}</p>
                  {log.details && (
                    <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 