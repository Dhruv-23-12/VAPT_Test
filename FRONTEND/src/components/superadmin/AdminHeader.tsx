import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarTrigger } from '../layout/Sidebar_ui';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Search, ChevronDown, LogOut } from 'lucide-react';

export function AdminHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Get superadmin info from localStorage or props
  const superadminName = localStorage.getItem('superadmin_name') || 'Super Admin';
  const superadminEmail = localStorage.getItem('2fa_email') || 'admin@vapt.com';

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/NS-MS-1127/login');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="text-gray-700 hover:text-gray-900" />
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search users, scans, reports..." 
            className="pl-10 w-96 bg-white border-gray-100 focus:bg-white text-gray-900"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">3</span>
          </span>
        </Button>

        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center space-x-3 cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={dropdownOpen}
            >
                <Avatar>
                    <AvatarFallback className="bg-teal-500 text-white">SA</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{superadminName}</p>
                    <p className="text-xs text-gray-500">{superadminEmail}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {dropdownOpen && (
                <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
                    role="menu"
                >
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        role="menuitem"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>
            )}
        </div>
      </div>
    </header>
  );
} 