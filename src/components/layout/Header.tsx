import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa';

type HeaderProps = {
  onMenuToggle: () => void;
};

export const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <header className="w-full h-16 bg-mainColor text-white flex justify-between items-center px-4">
      <Image
        src="/images/logos/bg-removed-logo.png"
        alt="app logo"
        width={60}
        height={60}
        className="object-contain"
      />
      <Button variant="ghost" className="text-white" onClick={onMenuToggle}>
        <FaBars className="text-2xl" />
      </Button>
    </header>
  );
};