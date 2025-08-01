import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '../layout/Sidebar_ui';
import { 
  Activity, 
  User, 
  Settings, 
  Calendar, 
  FileText, 
  Search,
  BarChart3
} from 'lucide-react';

const navItems = [
  { title: 'Overview', url: '/NS-MS-1127', icon: Activity },
  { title: 'Company', url: '/NS-MS-1127/Company', icon: User },
  { title: 'Subscriptions', url: '/NS-MS-1127/subscriptions', icon: Calendar },
  { title: 'Scans', url: '/NS-MS-1127/scans', icon: Search },
  { title: 'Reports', url: '/NS-MS-1127/reports', icon: FileText },
  { title: 'System Logs', url: '/NS-MS-1127/logs', icon: BarChart3 },
  { title: 'Settings', url: '/NS-MS-1127/settings', icon: Settings },
];

export function SuperadminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/NS-MS-1127') return currentPath === '/NS-MS-1127';
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar className={`${collapsed ? 'w-16' : 'w-64'} bg-slate-800 border-r-0 transition-all duration-300`}>
      <SidebarContent className="bg-slate-800">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SA</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-white font-bold text-lg">Superadmin</h1>
                <p className="text-slate-400 text-xs">Super Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-3 py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1">
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive: navActive }) => `
                        flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 transform 
                        ${isActive(item.url) || navActive
                          ? 'bg-teal-500 text-white shadow-lg scale-105' 
                          : 'text-slate-300 hover:bg-teal-500/20 hover:text-white hover:scale-105'
                        }
                      `}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
} 