import { useState, useEffect, useRef } from 'react';
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
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    onMenuToggle();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        onMenuToggle();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, onMenuToggle]);

  return (
    <>
      <header className="flex h-16 w-full items-center justify-between bg-mainColor px-4 text-white">
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => setCurrentView('dashboard')}
        >
          <Image
            src="/images/logos/bg-removed-logo.png"
            alt="app logo"
            width={60}
            height={60}
            className="object-contain transition-transform duration-300 hover:scale-110"
          />
        </Button>
        <Button variant="ghost" className="text-white" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </Button>
      </header>
      {isMenuOpen && (
        <div ref={menuRef}>
          <nav className="absolute right-0 top-16 z-50 w-full rounded-b-lg bg-mainColor/90 p-4 text-white shadow-lg xs:w-56">
            <ul className="space-y-2">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left transition-colors hover:bg-white/20 hover:text-subColor"
                    onClick={() => {
                      item.action();
                      toggleMenu();
                    }}
                  >
                    <span className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};
