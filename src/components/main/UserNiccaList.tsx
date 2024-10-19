'use client';

import { ViewProps } from '@/types/views';
import { useEffect, useState } from 'react';
import { getUserNiccas } from '@/app/actions/nicca';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

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

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">日課一覧</h2>
      {niccas.map((nicca) => (
        <div key={nicca.id} className="mb-4 rounded-lg border p-4 shadow">
          <h3 className="mb-2 text-xl font-semibold">{nicca.title}</h3>
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
