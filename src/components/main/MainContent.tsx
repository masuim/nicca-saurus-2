'use client';

import { useState, useEffect } from 'react';
import { ViewType } from '@/types/views';
import { Suspense } from 'react';

import { UserNiccaList } from '@/components/main/UserNiccaList';
import { SideMenu } from '@/components/layout/SideMenu';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/components/main/Dashboard/Dashboard';
import { Loading } from '@/components/ui/Loading';
import { NiccaRegistrationModal } from '@/components/side-menu/NiccaRegistrationModal';
import { getNicca } from '@/app/actions/nicca';

export const MainContent = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNiccaRegistration, setShowNiccaRegistration] = useState(false);
  const [nicca, setNicca] = useState<{ title: string } | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const fetchNicca = async () => {
      const result = await getNicca();
      if (result.nicca) {
        setNicca(result.nicca);
      } else {
        setShowNiccaRegistration(true);
      }
    };
    fetchNicca();
  }, []);

  const handleNiccaRegistration = (newNicca: { title: string }) => {
    setNicca(newNicca);
    setShowNiccaRegistration(false);
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className="w-full lg:hidden">
        <Header onMenuToggle={toggleMobileMenu} />
      </div>
      <div className="relative flex flex-grow flex-col lg:flex-row">
        <main className="relative flex-grow overflow-auto p-3 xs:p-6 lg:flex lg:items-center lg:justify-center">
          <div className="w-full max-w-[calc(100vw-1.5rem)] xs:max-w-[calc(100vw-3rem)] sm:max-w-4xl">
            <Suspense fallback={<Loading />}>
              {currentView === 'dashboard' ? (
                <Dashboard currentView={currentView} nicca={nicca} />
              ) : (
                <UserNiccaList currentView={currentView} />
              )}
            </Suspense>
          </div>
        </main>
        <div className="hidden lg:block lg:w-56">
          <SideMenu setCurrentView={setCurrentView} />
        </div>
      </div>
      <NiccaRegistrationModal
        isOpen={showNiccaRegistration}
        onClose={() => setShowNiccaRegistration(false)}
        onRegistration={handleNiccaRegistration}
      />
    </div>
  );
};
