
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'scan' | 'user' | 'report' | 'system';
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    user: 'John Doe',
    action: 'started a deep scan on',
    target: 'example.com',
    timestamp: '2 minutes ago',
    type: 'scan'
  },
  {
    id: '2',
    user: 'Sarah Chen',
    action: 'generated report for',
    target: 'testsite.org',
    timestamp: '5 minutes ago',
    type: 'report'
  },
  {
    id: '3',
    user: 'Mike Johnson',
    action: 'upgraded subscription to',
    target: 'Professional Plan',
    timestamp: '12 minutes ago',
    type: 'user'
  },
  {
    id: '4',
    user: 'System',
    action: 'completed maintenance on',
    target: 'Scanner Module',
    timestamp: '1 hour ago',
    type: 'system'
  }
];

export function ActivityFeed() {
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'scan': return 'bg-blue-500';
      case 'report': return 'bg-green-500';
      case 'user': return 'bg-purple-500';
      case 'system': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`w-2 h-2 rounded-full mt-2 ${getActivityColor(activity.type)}`}></div>
            
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span>{' '}
                {activity.action}{' '}
                <span className="font-medium text-teal-600">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm text-teal-600 hover:text-teal-700 font-medium">
        View all activity
      </button>
    </div>
  );
}
