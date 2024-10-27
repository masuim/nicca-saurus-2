'use client';

import { useEffect, useState } from 'react';
import { getUserNiccas } from '@/app/actions/nicca';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { deleteNicca } from '@/app/actions/nicca';
import { useFlashMessage } from '@/providers/FlashMessageProvider';
import { Nicca, NiccaList } from '@/types/nicca';

type Props = {
  fetchNicca: () => Promise<void>;
};

export const UserNiccaList = ({ fetchNicca }: Props) => {
  const [niccas, setNiccas] = useState<NiccaList>([]);
  const [error, setError] = useState<string | null>(null);
  const { showFlashMessage } = useFlashMessage();

  useEffect(() => {
    const fetchNiccas = async () => {
      try {
        const result = await getUserNiccas();
        if (result.success) {
          setNiccas(
            result.data.map((nicca: Nicca) => ({
              ...nicca,
              week: nicca.week || {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
              },
            })),
          );
        } else {
          setError(result.error || '日課の取得に失敗しました');
        }
      } catch (error) {
        console.error('Niccas fetch error:', error);
        setError('予期せぬエラーが発生しました');
      }
    };

    fetchNiccas();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const getDayString = (nicca: Nicca) => {
    const days = ['月', '火', '水', '木', '金', '土', '日'];
    const dayKeys = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ] as const;
    return dayKeys
      .filter((day) => nicca?.week?.[day])
      .map((day) => days[dayKeys.indexOf(day)])
      .join(', ');
  };

  const handleEdit = (id: string) => {
    alert(`日課編集 Clicked!! ID: ${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('本当にこの日課を削除しますか？')) {
      const result = await deleteNicca(id);
      if (result.success) {
        setNiccas(niccas.filter((nicca) => nicca.id !== id));
        showFlashMessage('日課が削除されました', 'success');
        await fetchNicca();
      } else {
        showFlashMessage(result.error || '日課の削除に失敗しました', 'error');
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">日課一覧</h2>
      {niccas.map((nicca) => (
        <div key={nicca.id} className="mb-4 rounded-lg border p-4 shadow">
          <div className="flex items-center justify-between">
            <h3 className="mb-2 text-xl font-semibold">{nicca.title}</h3>
            <div className="space-x-2">
              <Button
                variant="ghost"
                onClick={() => handleEdit(nicca.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaRegEdit className="text-lg" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleDelete(nicca.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaRegTrashAlt className="text-lg" />
              </Button>
            </div>
          </div>
          <p>恐竜タイプ: {nicca.saurusType}</p>
          <p>ステータス: {nicca.isActive ? '有効' : '無効'}</p>
          <p>作成日: {format(new Date(nicca.createdAt), 'yyyy年MM月dd日 HH:mm', { locale: ja })}</p>
          <p>更新日: {format(new Date(nicca.updatedAt), 'yyyy年MM月dd日 HH:mm', { locale: ja })}</p>
          <p>実施曜日: {getDayString(nicca)}</p>
          <p>達成回数: {nicca.achievements.length}回</p>
          <p>開始日: {format(new Date(nicca.startDate), 'yyyy年MM月dd日', { locale: ja })}</p>
          <p>終了日: {format(new Date(nicca.endDate), 'yyyy年MM月dd日', { locale: ja })}</p>
        </div>
      ))}
    </div>
  );
};
