import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'scan' | 'user' | 'report' | 'system' | 'auth';
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

const mockAllActivities: ActivityItem[] = [
    { id: '1', user: 'John Doe', action: 'started a deep scan on', target: 'example.com', timestamp: '2 minutes ago', type: 'scan' },
    { id: '2', user: 'Sarah Chen', action: 'generated report for', target: 'testsite.org', timestamp: '5 minutes ago', type: 'report' },
    { id: '3', user: 'Mike Johnson', action: 'upgraded subscription to', target: 'Professional Plan', timestamp: '12 minutes ago', type: 'user' },
    { id: '4', user: 'System', action: 'completed maintenance on', target: 'Scanner Module', timestamp: '1 hour ago', type: 'system' },
    { id: '5', user: 'admin@vapt.com', action: 'logged in successfully', target: 'from 192.168.1.1', timestamp: '2 hours ago', type: 'auth' },
    { id: '6', user: 'Jane Smith', action: 'added a new user', target: 'jane.smith@newcorp.com', timestamp: '3 hours ago', type: 'user' },
    { id: '7', user: 'System', action: 'detected a failed scan on', target: 'internal.net', timestamp: '4 hours ago', type: 'scan' },
    { id: '8', user: 'John Doe', action: 'downloaded report for', target: 'example.com', timestamp: '5 hours ago', type: 'report' },
    { id: '9', user: 'System', action: 'updated the', target: 'Firewall Ruleset', timestamp: 'Yesterday', type: 'system' },
    { id: '10', user: 'Sarah Chen', action: 'changed her password', target: '', timestamp: 'Yesterday', type: 'user' },
    { id: '11', user: 'guest', action: 'failed to log in', target: '3 attempts', timestamp: 'Yesterday', type: 'auth' },
    { id: '12', user: 'Mike Johnson', action: 'started a light scan on', target: 'public-staging.dev', timestamp: '2 days ago', type: 'scan' },
];

export function ActivityFeed() {
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'scan': return 'bg-blue-500';
      case 'report': return 'bg-green-500';
      case 'user': return 'bg-purple-500';
      case 'system': return 'bg-orange-500';
      case 'auth': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Dialog>
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
        
        <DialogTrigger asChild>
          <button className="w-full mt-4 text-sm text-teal-600 hover:text-teal-700 font-medium">
            View all activity
          </button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>All Recent Activity</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-4">
            <div className="space-y-4">
                {mockAllActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${getActivityColor(activity.type)}`}></div>
                    <div className="flex-1">
                    <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span>{' '}
                        {activity.action}{' '}
                        {activity.target && <span className="font-medium text-teal-600">{activity.target}</span>}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 