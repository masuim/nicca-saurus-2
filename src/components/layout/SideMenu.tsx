'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { createNavigationItems } from './NavigationItems';

type SideMenuProps = {
  setCurrentView: (view: 'dashboard' | 'niccaList') => void;
  handleSignOut: () => void;
};

export const SideMenu = ({ setCurrentView, handleSignOut }: SideMenuProps) => {
  const navigationItems = createNavigationItems(setCurrentView, handleSignOut);

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
            {navigationItems.map((item, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left transition-colors hover:bg-white/10"
                  onClick={item.action}
                >
                  {item.icon} {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
};
