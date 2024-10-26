'use client';

import { useState, useEffect, useCallback } from 'react';
import { ViewType } from '@/types/views';
import { Suspense } from 'react';

import { UserNiccaList } from '@/components/main/UserNiccaList';
import { SideMenu } from '@/components/layout/SideMenu';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/components/main/Dashboard/Dashboard';
import { Loading } from '@/components/ui/Loading';
import { getNicca } from '@/app/actions/nicca';
import { Nicca } from '@/types/nicca';
import { useFlashMessage } from '@/providers/FlashMessageProvider';
import { NiccaRegistrationModal } from '@/components/side-menu/NiccaRegistrationModal';

export const MainContent = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [nicca, setNicca] = useState<Nicca | null>(null);
  const [showNiccaRegistration, setShowNiccaRegistration] = useState(false);
  const { showFlashMessage } = useFlashMessage();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const fetchNicca = useCallback(async () => {
    const result = await getNicca();
    if (!result.success) {
      console.error('Nicca fetch error:', result.error);
      showFlashMessage(result.error || '日課の取得に失敗しました', 'error');
      setNicca(null);
      setShowNiccaRegistration(true);
    } else {
      setNicca(result.data);
      setShowNiccaRegistration(result.data === null);
    }
  }, [showFlashMessage]);

  useEffect(() => {
    fetchNicca();
  }, [fetchNicca]);

  const handleNiccaRegistration = useCallback((newNicca: Nicca) => {
    setNicca(newNicca);
    setShowNiccaRegistration(false);
  }, []);

  const handleViewChange = useCallback(
    (view: ViewType) => {
      setCurrentView(view);
      if (view === 'dashboard') {
        fetchNicca();
      }
    },
    [fetchNicca],
  );

  const handleCloseNiccaRegistration = useCallback(() => {
    if (nicca !== null) {
      setShowNiccaRegistration(false);
    }
  }, [nicca]);

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <NiccaRegistrationModal
        isOpen={showNiccaRegistration}
        onClose={handleCloseNiccaRegistration}
        onRegistration={handleNiccaRegistration}
        canClose={nicca !== null}
      />
      <div className="w-full lg:hidden">
        <Header onMenuToggle={toggleMobileMenu} />
      </div>
      <div className="relative flex flex-grow flex-col lg:flex-row">
        <main className="relative flex-grow overflow-auto p-3 xs:p-6 lg:flex lg:items-center lg:justify-center">
          <div className="w-full max-w-[calc(100vw-1.5rem)] xs:max-w-[calc(100vw-3rem)] sm:max-w-4xl">
            <Suspense fallback={<Loading />}>
              {currentView === 'dashboard' ? <Dashboard nicca={nicca} /> : <UserNiccaList />}
            </Suspense>
          </div>
        </main>
        <div className="hidden lg:block lg:w-56">
          <SideMenu setCurrentView={handleViewChange} />
        </div>
      </div>
    </div>
  );
};
