'use client';

import { useState } from 'react';
import { ViewType } from '@/types/views';
import { Suspense } from 'react';

import { UserNiccaList } from '@/components/main/UserNiccaList';
import { SideMenu } from '@/components/layout/SideMenu';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/components/main/Dashboard/Dashboard';
import { Loading } from '@/components/ui/Loading';

export const MainContent = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className="w-full lg:hidden">
        <Header onMenuToggle={toggleMobileMenu} />
      </div>
      <main className="flex-grow overflow-auto p-3 xs:p-6 lg:flex lg:items-center lg:justify-center">
        <div className="w-full max-w-[calc(100vw-1.5rem)] xs:max-w-[calc(100vw-3rem)] sm:max-w-4xl">
          <Suspense fallback={<Loading />}>
            {currentView === 'dashboard' ? (
              <Dashboard currentView={currentView} />
            ) : (
              <UserNiccaList currentView={currentView} />
            )}
          </Suspense>
        </div>
      </main>
      <div className="hidden lg:block">
        <SideMenu setCurrentView={setCurrentView} />
      </div>
    </div>
  );
};
