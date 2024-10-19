'use client';

import { useEffect, useState } from 'react';
import { getUserNiccas } from '@/app/actions/nicca';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

type Nicca = {
  id: string;
  title: string;
  saurusType: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  week: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  achievements: { achievedDate: Date }[];
};

export const UserNiccaList = () => {
  const [niccas, setNiccas] = useState<Nicca[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNiccas = async () => {
      const result = await getUserNiccas();
      if (result.error) {
        setError(result.error);
      } else if (result.niccas) {
        setNiccas(
          result.niccas.map((nicca) => ({
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
      }
    };

    fetchNiccas();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const getDayString = (week: Nicca['week']) => {
    const days = ['月', '火', '水', '木', '金', '土', '日'];
    const activeDays = Object.entries(week)
      .filter(([_, value]) => value)
      .map(
        ([key]) =>
          days[
            ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].indexOf(
              key,
            )
          ],
      );
    return activeDays.join(', ');
  };

  const handleEdit = (id: string) => {
    alert(`日課編集 Clicked!! ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    alert(`日課削除 Clicked!! ID: ${id}`);
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
          <p>実施曜日: {getDayString(nicca.week)}</p>
          <p>達成回数: {nicca.achievements.length}回</p>
          <p>
            最終達成日:{' '}
            {nicca.achievements.length > 0
              ? format(
                  new Date(nicca.achievements[nicca.achievements.length - 1].achievedDate),
                  'yyyy年MM月dd日',
                  { locale: ja },
                )
              : 'なし'}
          </p>
        </div>
      ))}
    </div>
  );
};
