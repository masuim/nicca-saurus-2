'use client';

import { useState } from 'react';

import { UserNiccaList } from '@/components/main/UserNiccaList';
import { SideMenu } from '@/components/layout/SideMenu';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/components/main/Dashboard/Dashboard';

export const MainContent = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'niccaList'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:hidden w-full">
        <Header onMenuToggle={toggleMobileMenu} />
      </div>
      <main className="flex-grow p-6 overflow-auto lg:flex lg:items-center lg:justify-center">
        <div className="w-full max-w-4xl">
          {currentView === 'dashboard' ? <Dashboard currentView={currentView}/> : <UserNiccaList currentView={currentView}/>}
        </div>
      </main>
      <div className="hidden lg:block">
        <SideMenu setCurrentView={setCurrentView} />
      </div>
    </div>
  );
};
