'use client';

import { useState } from 'react';
import { Dashboard } from '@/components/main/Dashboard';
import { UserNiccaList } from '@/components/main/UserNiccaList';
import { Header } from '@/components/layout/Header';

export const MainContent = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'niccaList'>('dashboard');

  return (
    <div className="min-h-screen flex flex-col">
      <Header setCurrentView={setCurrentView} />
      <main className="flex-grow pt-16">
        {currentView === 'dashboard' ? <Dashboard currentView={currentView}/> : <UserNiccaList currentView={currentView}/>}
      </main>
    </div>
  );
};
