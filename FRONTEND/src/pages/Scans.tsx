import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Eye, Download, Play, Pause, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface Scan {
  id: string;
  user: string;
  url: string;
  profile: string;
  progress: number;
  status: 'running' | 'completed' | 'failed' | 'queued';
  startedAt: string;
  duration?: string;
}

const mockScans: Scan[] = [
  {
    id: 'SCN-001',
    user: 'John Doe',
    url: 'https://example.com',
    profile: 'Deep Scan',
    progress: 75,
    status: 'running',
    startedAt: '2024-06-30 10:30:00'
  },
  {
    id: 'SCN-002',
    user: 'Sarah Chen',
    url: 'https://testsite.org',
    profile: 'Medium Scan',
    progress: 100,
    status: 'completed',
    startedAt: '2024-06-30 09:15:00',
    duration: '12 min'
  },
  {
    id: 'SCN-003',
    user: 'Mike Johnson',
    url: 'https://webapp.io',
    profile: 'Light Scan',
    progress: 0,
    status: 'queued',
    startedAt: '2024-06-30 11:00:00'
  },
  {
    id: 'SCN-004',
    user: 'Alice Brown',
    url: 'https://secure.net',
    profile: 'Deep Scan',
    progress: 45,
    status: 'failed',
    startedAt: '2024-06-30 08:45:00'
  }
];

const plans = [
  { name: 'Free', price: '$0', key: 'free' },
  { name: 'Basic', price: '$299', key: 'basic' },
  { name: 'Advanced', price: '$599', key: 'advance' },
  { name: 'Team', price: '$999', key: 'team' },
];

const planNameToKey: Record<string, string> = {
  'Basic': 'basic',
  'Advanced': 'advance',
  'Team': 'team',
};

export default function Scans() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('Free');
  const [loading, setLoading] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'queued': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleBuyPlan = async () => {
    if (selectedPlan === 'Free') {
      alert('You are already on the Free plan.');
      return;
    }
    const planKey = planNameToKey[selectedPlan];
    if (!planKey) {
      alert('Invalid plan selected.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planKey }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to initiate payment.');
      }
    } catch (err) {
      alert('Error connecting to payment gateway.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Plan Selection Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-900">Select Plan:</span>
          <select
            className="border rounded-lg px-3 py-2 text-gray-700 focus:border-blue-500 outline-none"
            value={selectedPlan}
            onChange={e => setSelectedPlan(e.target.value)}
          >
            {plans.map(plan => (
              <option key={plan.key} value={plan.name}>{plan.name} ({plan.price})</option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-60"
          onClick={handleBuyPlan}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Buy/Upgrade Plan'}
        </button>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Scan Oversight</h1>
          <p className="text-gray-600">Monitor and manage vulnerability scans</p>
        </div>
        <Button onClick={() => navigate('/pricing')}>
          <Play className="w-4 h-4 mr-2" />
          Start New Scan
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900">23</h3>
          <p className="text-gray-600 font-medium">Running Scans</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900">156</h3>
          <p className="text-gray-600 font-medium">Queued</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900">1,847</h3>
          <p className="text-gray-600 font-medium">Completed Today</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900">4.2 min</h3>
          <p className="text-gray-600 font-medium">Avg. Duration</p>
        </div>
      </div>

      {/* Scans Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Active & Recent Scans</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scan ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Started At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockScans.map((scan) => (
                <tr key={scan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {scan.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {scan.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {scan.url}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {scan.profile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Progress value={scan.progress} className="w-20" />
                      <span className="text-sm text-gray-600">{scan.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={getStatusColor(scan.status)}>
                      {scan.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div>{scan.startedAt}</div>
                      {scan.duration && (
                        <div className="text-xs text-gray-500">Duration: {scan.duration}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {scan.status === 'running' && (
                      <Button variant="ghost" size="sm">
                        <Pause className="w-4 h-4" />
                      </Button>
                    )}
                    {scan.status === 'completed' && (
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                    {scan.status === 'failed' && (
                      <Button variant="ghost" size="sm">
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 