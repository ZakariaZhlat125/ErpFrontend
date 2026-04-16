'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useTheme } from '@/lib/theme/use-theme';

interface AppShellProps {
  children: ReactNode;
  showSidebar?: boolean;
  showTopBar?: boolean;
}

export function AppShell({ children, showSidebar = true, showTopBar = true }: AppShellProps) {
  const { tokens } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: tokens.background }}>
      {showSidebar && <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />}
      <div className="flex-1 flex flex-col" style={{ marginLeft: showSidebar ? (sidebarCollapsed ? '80px' : '80px') : '0', transition: 'margin-left 0.3s ease' }}>
        {showTopBar && <TopBar />}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
