import { Button } from '@/components/ui/button';

type HeaderProps = {
setCurrentView: (view: 'dashboard' | 'niccaList') => void;
};

export const Header = ({ setCurrentView }: HeaderProps) => {
return (
<header className="absolute top-0 left-0 right-0 z-10">
    <nav className="container mx-auto flex justify-between items-center py-4">
        <div className="flex space-x-4">アプリのアイコンが入る</div>
        <div className="flex space-x-4">
            <Button variant="ghost" onClick={()=> setCurrentView('dashboard')}>
                ダッシュボード
            </Button>
            <Button variant="ghost" onClick={()=> setCurrentView('niccaList')}>
                日課一覧
            </Button>
            <Button variant="ghost" onClick={()=> alert('日課登録 Clicked!!')}>
                日課登録
            </Button>
            <Button variant="ghost" onClick={()=> alert('ユーザー設定 Clicked!!')}>
                ユーザー設定
            </Button>
            <Button variant="ghost" onClick={()=> alert('サインアウト Clicked!!')}>
                サインアウト
            </Button>
        </div>
    </nav>
</header>
);
};
