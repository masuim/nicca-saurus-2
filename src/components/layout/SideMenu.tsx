'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  FaChartBar,
  FaList,
  FaCog,
  FaPlus,
  FaRegTrashAlt,
  FaRegEdit,
  FaSignOutAlt,
} from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import { useFlashMessage } from '@/providers/FlashMessageProvider';
import { useRouter } from 'next/navigation';

type SideMenuProps = {
  setCurrentView: (view: 'dashboard' | 'niccaList') => void;
};

export const SideMenu = ({ setCurrentView }: SideMenuProps) => {
  const { showFlashMessage } = useFlashMessage();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      showFlashMessage('サインアウトしました', 'success');
      router.push('/');
    } catch (error) {
      console.error('Signout error:', error);
      showFlashMessage('サインアウト中にエラーが発生しました。もう一度お試しください。', 'error');
    }
  };

  return (
    <aside className="flex h-screen w-56 flex-col bg-mainColor text-white">
      <div className="flex items-center justify-center p-4">
        <Image
          src="/images/logos/bg-removed-logo.png"
          alt="app logo"
          width={120}
          height={120}
          className="object-contain"
        />
      </div>
      <nav className="flex flex-grow flex-col p-2">
        <div className="mb-6 border-t border-white/20 pt-4">
          <h3 className="mb-2 px-2 text-sm font-semibold">ナビゲーション</h3>
          <ul className="space-y-2 px-2">
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start text-left transition-colors hover:bg-white/10"
                onClick={() => setCurrentView('dashboard')}
              >
                <FaChartBar className="mr-3 text-lg" /> ダッシュボード
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start text-left transition-colors hover:bg-white/10"
                onClick={() => setCurrentView('niccaList')}
              >
                <FaList className="mr-3 text-lg" /> 日課一覧
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start text-left transition-colors hover:bg-white/10"
                onClick={() => alert('ユーザー設定 Clicked!!')}
              >
                <FaCog className="mr-3 text-lg" /> ユーザー設定
              </Button>
            </li>
          </ul>
        </div>

        <div className="mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start py-2 text-left transition-colors hover:bg-white/10"
            onClick={handleSignOut}
          >
            <FaSignOutAlt className="mr-3 text-lg" /> サインアウト
          </Button>
        </div>
      </nav>
    </aside>
  );
};
