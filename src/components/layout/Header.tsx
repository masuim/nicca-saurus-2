import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import { createNavigationItems } from './NavigationItems';

type HeaderProps = {
  onMenuToggle: () => void;
  setCurrentView: (view: 'dashboard' | 'niccaList') => void;
  handleSignOut: () => void;
};

export const Header = ({ onMenuToggle, setCurrentView, handleSignOut }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigationItems = createNavigationItems(setCurrentView, handleSignOut);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle();
  };

  return (
    <>
      <header className="flex h-16 w-full items-center justify-between bg-mainColor px-4 text-white">
        <Image
          src="/images/logos/bg-removed-logo.png"
          alt="app logo"
          width={60}
          height={60}
          className="object-contain"
        />
        <Button variant="ghost" className="text-white" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </Button>
      </header>
      {isMenuOpen && (
        <nav className="absolute left-0 top-16 z-50 w-full bg-mainColor p-4 text-white">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left transition-colors hover:bg-white/10"
                  onClick={() => {
                    item.action();
                    toggleMenu();
                  }}
                >
                  {item.icon} {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};
