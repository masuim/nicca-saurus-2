import { Button } from '@/components/ui/button';
import Image from 'next/image';

type HeaderProps = {
setCurrentView: (view: 'dashboard' | 'niccaList') => void;
};

export const Header = ({ setCurrentView }: HeaderProps) => {
return (
<header className="absolute top-0 left-0 right-0 z-10 bg-mainColor text-white">
    <nav className="container mx-auto flex justify-between items-center px-4 h-16">
        <div className="flex items-center">
            <Image
                src="/images/logos/bg-removed-logo.png"
                alt="app logo"
                width={64}
                height={64}
                className="object-contain"
            />
        </div>
        <div className="flex space-x-4">
            <Button variant="ghost" className="text-white " onClick={()=> setCurrentView('dashboard')}>
                ダッシュボード
            </Button>
            <Button variant="ghost" className="text-white " onClick={()=> setCurrentView('niccaList')}>
                日課一覧
            </Button>
            <Button variant="ghost" className="text-white " onClick={()=> alert('日課登録 Clicked!!')}>
                日課登録
            </Button>
            <Button variant="ghost" className="text-white " onClick={()=> alert('ユーザー設定 Clicked!!')}>
                ユーザー設定
            </Button>
            <Button variant="ghost" className="text-white " onClick={()=> alert('サインアウト Clicked!!')}>
                サインアウト
            </Button>
        </div>
    </nav>
</header>
);
};
