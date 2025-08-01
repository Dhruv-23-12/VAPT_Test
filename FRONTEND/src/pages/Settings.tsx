import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Save, Shield, Bell, Database, Globe, Users, Zap } from 'lucide-react';

export default function Settings() {
  const [activeCategory, setActiveCategory] = useState('general');

  const scrollToSection = (sectionId: string) => {
    setActiveCategory(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'performance', label: 'Performance', icon: Zap },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure platform settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings Categories</h3>
            <nav className="space-y-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => scrollToSection(category.id)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg w-full text-left transition-colors ${
                      activeCategory === category.id
                        ? 'bg-teal-50 text-teal-700 font-medium'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Settings */}
          <div id="general" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                <Input defaultValue="VAPT Security Platform" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                <Input defaultValue="support@vapt.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Mode</label>
                <div className="flex items-center space-x-3">
                  <Switch />
                  <span className="text-sm text-gray-600">Enable maintenance mode</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div id="security" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                <Input defaultValue="30" type="number" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                <Input defaultValue="5" type="number" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
                  <p className="text-xs text-gray-500">Require 2FA for admin accounts</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">IP Whitelist</span>
                  <p className="text-xs text-gray-500">Restrict admin access to specific IPs</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div id="notifications" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                  <p className="text-xs text-gray-500">System alerts and reports</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">Slack Integration</span>
                  <p className="text-xs text-gray-500">Send alerts to Slack channels</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">SMS Alerts</span>
                  <p className="text-xs text-gray-500">Critical system notifications</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Database Settings */}
          <div id="database" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Database className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900">Database Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">Auto Cleanup</span>
                  <p className="text-xs text-gray-500">Remove old scan data automatically</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* User Management Settings */}
          <div id="users" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default User Role</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Basic User</option>
                  <option>Premium User</option>
                  <option>Enterprise User</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">Auto-approve Registrations</span>
                  <p className="text-xs text-gray-500">Automatically approve new user accounts</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Performance Settings */}
          <div id="performance" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Zap className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-semibold text-gray-900">Performance Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Concurrent Scans</label>
                <Input defaultValue="10" type="number" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scan Timeout (minutes)</label>
                <Input defaultValue="60" type="number" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700">Enable Caching</span>
                  <p className="text-xs text-gray-500">Cache scan results for faster retrieval</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">System Status</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Database</span>
                <Badge className="bg-green-100 text-green-700">Healthy</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">API Services</span>
                <Badge className="bg-green-100 text-green-700">Online</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Scanner Engine</span>
                <Badge className="bg-yellow-100 text-yellow-700">Degraded</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Storage</span>
                <Badge className="bg-green-100 text-green-700">68% Used</Badge>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 