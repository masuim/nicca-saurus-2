'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { ViewType } from '@/types/views';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { MESSAGES } from '@/constants/messages';

import { UserNiccaList } from '@/components/main/UserNiccaList';
import { SideMenu } from '@/components/layout/SideMenu';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/components/main/Dashboard/Dashboard';
import { Loading } from '@/components/ui/Loading';
import { getUserNiccas } from '@/app/actions/nicca/get-user-niccas';
import { Nicca } from '@/types/nicca';
import { useFlashMessage } from '@/providers/FlashMessageProvider';
import { NiccaRegistrationModal } from '@/components/side-menu/NiccaRegistrationModal';

export const MainContent = () => {
  const [niccas, setNiccas] = useState<Nicca[]>([]);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNiccaRegistration, setShowNiccaRegistration] = useState(false);
  const { showFlashMessage } = useFlashMessage();
  const router = useRouter();

  const fetchNiccas = useCallback(async () => {
    const result = await getUserNiccas();
    if (!result.success) {
      console.error('Niccas fetch error:', result.error);
      showFlashMessage(result.error || '日課の取得に失敗しました', 'error');
      setNiccas([]);
    } else {
      setNiccas(result.data);
    }
  }, [showFlashMessage]);

  useEffect(() => {
    fetchNiccas();
  }, [fetchNiccas]);

  useEffect(() => {
    const hasActiveNicca = niccas.some((nicca) => nicca.isActive);
    if (!hasActiveNicca) {
      setShowNiccaRegistration(true);
    } else {
      setShowNiccaRegistration(false);
    }
  }, [niccas]);

  const activeNicca = useMemo(() => {
    return niccas.find((nicca) => nicca.isActive) || null;
  }, [niccas]);

  const handleNiccaRegistration = useCallback(
    async (newNicca: Nicca) => {
      setNiccas([...niccas, newNicca]);
      setShowNiccaRegistration(false);
      await fetchNiccas();
    },
    [fetchNiccas],
  );

  const handleViewChange = useCallback(
    async (view: ViewType) => {
      setCurrentView(view);
      await fetchNiccas();
    },
    [fetchNiccas],
  );

  const handleCloseNiccaRegistration = useCallback(() => {
    if (activeNicca !== null) {
      setShowNiccaRegistration(false);
    }
  }, [activeNicca]);

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      showFlashMessage(MESSAGES.FLASH_MESSAGES.SIGN_OUT_SUCCESS, 'success');
      router.push('/');
    } catch (error) {
      console.error('Signout error:', error);
      showFlashMessage(MESSAGES.FLASH_MESSAGES.SIGN_OUT_ERROR, 'error');
    }
  };

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <NiccaRegistrationModal
        isOpen={showNiccaRegistration}
        onClose={handleCloseNiccaRegistration}
        onRegistration={handleNiccaRegistration}
        canClose={activeNicca !== null}
      />
      <div className="w-full lg:hidden">
        <Header
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          setCurrentView={handleViewChange}
          handleSignOut={handleSignOut}
        />
      </div>
      <div className="relative flex flex-grow flex-col lg:flex-row">
        <main className="relative flex-grow overflow-auto p-3 xs:p-6 lg:flex lg:items-center lg:justify-center">
          <div className="w-full max-w-[calc(100vw-1.5rem)] xs:max-w-[calc(100vw-3rem)] sm:max-w-4xl">
            <Suspense fallback={<Loading />}>
              {currentView === 'dashboard' ? (
                <Dashboard nicca={activeNicca} fetchNiccas={fetchNiccas} />
              ) : (
                <UserNiccaList niccas={niccas} fetchNiccas={fetchNiccas} />
              )}
            </Suspense>
          </div>
        </main>
        <div className="hidden lg:block lg:w-56">
          <SideMenu setCurrentView={handleViewChange} handleSignOut={handleSignOut} />
        </div>
      </div>
    </div>
  );
};
