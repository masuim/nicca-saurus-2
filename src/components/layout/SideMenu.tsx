import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FaChartBar, FaList, FaCog, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

type SideMenuProps = {
  setCurrentView: (view: 'dashboard' | 'niccaList') => void;
};

export const SideMenu = ({ setCurrentView }: SideMenuProps) => {
  return (
    <aside className="w-56 h-screen bg-mainColor text-white flex flex-col">
      <div className="p-4 flex justify-center items-center">
        <Image
          src="/images/logos/bg-removed-logo.png"
          alt="app logo"
          width={160}
          height={160}
          className="object-contain"
        />
      </div>
      <nav className="flex-grow">
        <div className="mb-4 pt-4 border-t border-white/20">
          <h3 className="px-2 mb-2 text-sm font-semibold">ナビゲーション</h3>
          <ul className="space-y-1 px-2">
            <li>
              <Button variant="ghost" className="w-full text-left justify-start" onClick={() => setCurrentView('dashboard')}>
                <FaChartBar className="mr-2" /> ダッシュボード
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full text-left justify-start" onClick={() => setCurrentView('niccaList')}>
                <FaList className="mr-2" /> 日課一覧
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full text-left justify-start" onClick={() => alert('ユーザー設定 Clicked!!')}>
                <FaCog className="mr-2" /> ユーザー設定
              </Button>
            </li>
          </ul>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <h3 className="px-2 mb-2 text-sm font-semibold">日課管理</h3>
          <ul className="space-y-1 px-2">
            <li>
              <Button variant="ghost" className="w-full text-left justify-start" onClick={() => alert('日課登録 Clicked!!')}>
                <FaPlus className="mr-2" /> 日課登録
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full text-left justify-start" onClick={() => alert('日課編集 Clicked!!')}>
                <FaEdit className="mr-2" /> 日課編集
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full text-left justify-start" onClick={() => alert('日課削除 Clicked!!')}>
                <FaTrash className="mr-2" /> 日課削除
              </Button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="p-4 mt-auto">
        <Button variant="ghost" className="w-full text-left justify-start" onClick={() => alert('サインアウト Clicked!!')}>
          サインアウト
        </Button>
      </div>
    </aside>
  );
};