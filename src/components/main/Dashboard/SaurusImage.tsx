import { useMemo } from 'react';
import { Nicca } from '@/types/nicca';

type Props = {
  nicca: Nicca;
  className?: string;
};

export const SaurusImage = ({ nicca, className }: Props) => {
  const saurusLevel = useMemo(() => {
    const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const selectedDaysCount = weekDays.filter((day) => nicca[day as keyof Nicca]).length;
    const achievementsCount = nicca.achievements.length;
    const level = Math.floor(achievementsCount / selectedDaysCount) + 1;
    return Math.min(level, 5);
  }, [nicca]);

  const imagePath = `/images/saurus/${nicca.saurusType}/${nicca.saurusType}${saurusLevel}.png`;

  return (
    <div className={`${className} relative overflow-hidden`} style={{ paddingTop: '100%' }}>
      <img
        src={imagePath}
        alt={nicca.saurusType}
        className="absolute inset-0 size-full rounded-lg object-cover hover:shadow-lg"
      />
    </div>
  );
};
