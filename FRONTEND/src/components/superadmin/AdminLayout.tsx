import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '../layout/Sidebar_ui';
import { SuperadminSidebar } from './SuperadminSidebar';
import { AdminHeader } from './AdminHeader';

export function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-100">
        <SuperadminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
} 