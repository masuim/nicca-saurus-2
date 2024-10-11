'use client';

import { useState } from 'react';
import { Dashboard } from '@/components/main/Dashboard';
import { UserNiccaList } from '@/components/main/UserNiccaList';
import { SideMenu } from '@/components/layout/SideMenu';

export const MainContent = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'niccaList'>('dashboard');

  return (
    <div className="flex h-screen">
      <main className="flex-grow p-6 overflow-auto">
        {currentView === 'dashboard' ? <Dashboard currentView={currentView}/> : <UserNiccaList currentView={currentView}/>}
      </main>
      <SideMenu setCurrentView={setCurrentView} />
    </div>
  );
};
