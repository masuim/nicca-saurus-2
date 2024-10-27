import { FaChartBar, FaList, FaCog, FaSignOutAlt } from 'react-icons/fa';

export type NavigationItem = {
  icon: React.ReactNode;
  label: string;
  action: () => void;
};

export const createNavigationItems = (
  setCurrentView: (view: 'dashboard' | 'niccaList') => void,
  handleSignOut: () => void,
): NavigationItem[] => [
  {
    icon: <FaChartBar className="mr-3 text-lg" />,
    label: 'ダッシュボード',
    action: () => setCurrentView('dashboard'),
  },
  {
    icon: <FaList className="mr-3 text-lg" />,
    label: '日課一覧',
    action: () => setCurrentView('niccaList'),
  },
  {
    icon: <FaCog className="mr-3 text-lg" />,
    label: 'ユーザー設定',
    action: () => alert('ユーザー設定 Clicked!!'),
  },
  {
    icon: <FaSignOutAlt className="mr-3 text-lg" />,
    label: 'サインアウト',
    action: handleSignOut,
  },
];
