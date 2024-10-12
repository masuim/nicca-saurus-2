'use client';

import { useState } from 'react';
import { Dashboard } from '@/components/main/Dashboard';
import { UserNiccaList } from '@/components/main/UserNiccaList';
import { SideMenu } from '@/components/layout/SideMenu';
import { Header } from '@/components/layout/Header';

export const MainContent = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'niccaList'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:hidden w-full">
        <Header onMenuToggle={toggleMobileMenu} />
      </div>
      <main className="flex-grow p-6 overflow-auto md:flex md:items-center md:justify-center">
        <div className="w-full max-w-4xl">
          {currentView === 'dashboard' ? <Dashboard currentView={currentView}/> : <UserNiccaList currentView={currentView}/>}
        </div>
      </main>
      <div className="hidden md:block">
        <SideMenu setCurrentView={setCurrentView} />
      </div>
    </div>
  );
};
