import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FaChartBar, FaList, FaCog, FaPlus, FaRegTrashAlt, FaRegEdit, FaSignOutAlt } from 'react-icons/fa';

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
          width={120}
          height={120}
          className="object-contain"
        />
      </div>
      <nav className="flex-grow p-2 flex flex-col">
        <div className="mb-6 pt-4 border-t border-white/20">
          <h3 className="px-2 mb-2 text-sm font-semibold">ナビゲーション</h3>
          <ul className="space-y-2 px-2">
            <li>
              <Button variant="ghost" className="w-full text-left justify-start hover:bg-white/10 transition-colors" onClick={() => setCurrentView('dashboard')}>
                <FaChartBar className="mr-3 text-lg" /> ダッシュボード
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full text-left justify-start hover:bg-white/10 transition-colors" onClick={() => setCurrentView('niccaList')}>
                <FaList className="mr-3 text-lg" /> 日課一覧
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full text-left justify-start hover:bg-white/10 transition-colors" onClick={() => alert('ユーザー設定 Clicked!!')}>
                <FaCog className="mr-3 text-lg" /> ユーザー設定
              </Button>
            </li>
          </ul>
        </div>
        <div className="mt-6 pt-4 border-t border-white/20">
          <h3 className="px-2 mb-2 text-sm font-semibold">日課管理</h3>
          <ul className="space-y-2 px-2">
            <li>
              <Button variant="ghost" className="w-full text-left justify-start hover:bg-white/10 transition-colors" onClick={() => alert('日課登録 Clicked!!')}>
                <FaPlus className="mr-3 text-lg" /> 日課登録
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full text-left justify-start hover:bg-white/10 transition-colors" onClick={() => alert('日課編集 Clicked!!')}>
                <FaRegEdit className="mr-3 text-lg" /> 日課編集
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full text-left justify-start hover:bg-white/10 transition-colors" onClick={() => alert('日課削除 Clicked!!')}>
                <FaRegTrashAlt className="mr-3 text-lg" /> 日課削除
              </Button>
            </li>
          </ul>
        </div>
        <div className="mt-auto pt-4 border-t border-white/20">
          <Button variant="ghost" className="w-full text-left justify-start py-2 hover:bg-white/10 transition-colors" onClick={() => alert('サインアウト Clicked!!')}>
            <FaSignOutAlt className="mr-3 text-lg" /> サインアウト
          </Button>
        </div>
      </nav>
    </aside>
  );
};