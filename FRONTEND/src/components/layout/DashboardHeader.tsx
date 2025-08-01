import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, LogOut } from 'lucide-react';

const regularUser = {
  name: 'Jane Doe',
  avatar: 'https://i.pravatar.cc/150?img=32',
  email: null,
};

const superAdmin = {
    name: localStorage.getItem('superadmin_name') || 'Super Admin',
    email: localStorage.getItem('2fa_email') || 'admin@vapt.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
};

const DashboardHeader: React.FC<{ onLogout?: () => void, userRole: string }> = ({ onLogout, userRole }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get user info from localStorage
  const userName = localStorage.getItem('user_name') || 'User';
  const userEmail = localStorage.getItem('user_email') || '';
  // Use a simple profile pic: first letter of name in a colored circle
  const userAvatar = null;

  const user = userRole === 'superadmin'
    ? superAdmin
    : {
        name: userName,
        avatar: userAvatar,
        email: userEmail,
      };

  // Close dropdown on outside click
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
    <header
      className="fixed top-0 z-30 h-16 flex items-center justify-between px-6 py-3 bg-gradient-to-br from-[#081B28] via-[#0C1F2E] to-[#081B28] border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10 transition-all duration-300 w-full lg:left-64 lg:w-[calc(100%-16rem)]"
      aria-label="Dashboard Header"
    >
      {/* Search Bar */}
      <form className="flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 rounded-lg border border-cyan-500/20 bg-[#0C1F2E] text-white placeholder:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
      </form>
      {/* Right Section */}
      <div className="flex items-center gap-4 ml-6 min-w-fit">
        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-cyan-900/40 transition" aria-label="Notifications">
          <Bell className="w-5 h-5 text-cyan-300" />
          {/* Notification dot */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        {/* User Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-cyan-900/40 transition"
            onClick={() => setDropdownOpen((v) => !v)}
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdownOpen}
            aria-controls="profile-dropdown-menu"
          >
            <div className="flex items-center gap-2">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-cyan-500/20 object-cover"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <span className="w-8 h-8 rounded-full bg-cyan-800 text-white flex items-center justify-center font-bold text-lg select-none">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
              <div className="flex flex-col justify-center">
                <span className="font-medium text-white text-sm hidden sm:block">{user.name}</span>
                {userRole === 'superadmin' && <span className="text-xs text-cyan-300 hidden sm:block">{user.email}</span>}
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-cyan-300" />
          </button>
          {/* Dropdown */}
          {dropdownOpen && (
            <div
              id="profile-dropdown-menu"
              className="absolute right-0 mt-2 w-44 bg-[#0C1F2E] border border-cyan-500/20 rounded-lg shadow-lg shadow-cyan-500/10 py-2 z-40 animate-fade-in"
              role="menu"
            >
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-cyan-200 hover:bg-cyan-900/40 gap-2"
                onClick={onLogout}
                role="menuitem"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 