import { CustomCalendar } from '@/components/main/Dashboard/Calendar/CustomCalendar';
import { CompleteButton } from '@/components/main/Dashboard/CompleteButton';
import { NiccaMessage } from '@/components/main/Dashboard/NiccaMessage';
import { SaurusImage } from '@/components/main/Dashboard/SaurusImage';
import { WEEK_DAYS } from '@/constants/dates';

import { useState, useEffect, useMemo } from 'react';
import { Nicca } from '@/types/nicca';
import { Confetti } from '@/components/main/Dashboard/Animation/Confetti';
import { MESSAGES } from '@/constants/messages';
import { useNiccaProgress } from '@/hooks/use-nicca-progress';
import { ResetModal } from '@/components/main/Dashboard/ResetModal';
import { addAchievement } from '@/app/actions/nicca';

type Props = {
  nicca: Nicca | null;
  fetchNicca: () => Promise<void>;
};

export const Dashboard = ({ nicca, fetchNicca }: Props) => {
  const [achievements, setAchievements] = useState<Date[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [message, setMessage] = useState(MESSAGES.NICCA_MESSAGE.DEFAULT);
  const { shouldReset, showResetModal, setShowResetModal } = useNiccaProgress(nicca);

  const saurusLevel = useMemo(() => {
    if (!nicca || shouldReset) return 1;
    const selectedDaysCount = WEEK_DAYS.filter((day) => nicca[day as keyof Nicca]).length;
    const achievementsCount = nicca.achievements.length;
    const level = Math.floor(achievementsCount / selectedDaysCount) + 1;
    return Math.min(level, 5);
  }, [nicca, shouldReset]);

  const randomEncouragingMessage = () => {
    const messages = MESSAGES.NICCA_MESSAGE.ENCOURAGING;
    return messages[Math.floor(Math.random() * messages.length)];
  };

  useEffect(() => {
    if (!nicca) return;

    if (nicca.achievements.length === 0) {
      setMessage(MESSAGES.NICCA_MESSAGE.DEFAULT);
    } else if (
      new Date(nicca.endDate).toDateString() === new Date().toDateString() &&
      achievements.some((date) => date.toDateString() === new Date().toDateString())
    ) {
      setMessage(MESSAGES.NICCA_MESSAGE.CONGRATULATIONS);
    } else {
      setMessage(randomEncouragingMessage());
    }
  }, [nicca, achievements]);

  useEffect(() => {
    if (saurusLevel > 1 && achievements.length % (saurusLevel - 1) === 0) {
      setMessage(MESSAGES.NICCA_MESSAGE.SAUR_GROWTH);
    }
  }, [saurusLevel, achievements]);

  useEffect(() => {
    if (nicca) {
      const achievedDates = nicca.achievements
        .filter((achievement) => achievement.achievedDate)
        .map((achievement) => new Date(achievement.achievedDate!));
      setAchievements(achievedDates);
    }
  }, [nicca]);

  const handleComplete = async (date: Date) => {
    if (!nicca) return;
    const result = await addAchievement(nicca.id, date);
    if (result.success) {
      setAchievements((prev) => [...prev, date]);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 5000);
      await fetchNicca();
    }
  };

  const handleCloseResetModal = () => {
    setShowResetModal(false);
    setMessage(MESSAGES.NICCA_MESSAGE.RESTART);
  };

  if (nicca === null) {
    return <div>アクティブな日課がないよー！</div>;
  }

  const isCompletedToday = achievements.some(
    (date) => date.toDateString() === new Date().toDateString(),
  );

  return (
    <>
      <div className="sm:main-background xs mx-auto w-[calc(100%-1rem)] max-w-[280px] rounded-lg p-4 xs:w-[calc(100%-2rem)] xs:max-w-[360px] sm:w-full sm:max-w-[640px] sm:border-2 sm:border-mainColor sm:p-6 md:p-8 lg:mt-8 lg:flex lg:h-auto lg:max-w-[720px] lg:flex-col lg:justify-between">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-stretch lg:mb-8">
          <div className="mb-4 w-full sm:mb-0 sm:w-1/2">
            <div className="nicca-title h-full">
              <div className="nicca-title-text flex h-full items-center justify-center">
                <h2 className="truncate text-2xl lg:text-3xl">{nicca.title || '日課'}</h2>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 sm:pl-4">
            <NiccaMessage
              className="dashboard-component relative flex h-full border-2 border-mainColor p-6 pt-4"
              message={message}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="size-full">
            <CustomCalendar
              className="dashboard-component size-full bg-gray-50"
              achievements={nicca.achievements}
              nicca={nicca}
            />
          </div>
          <div className="dashboard-component flex h-full flex-col justify-between border-2 border-mainColor bg-gray-50 p-6">
            <div className="flex flex-grow transform items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110">
              <SaurusImage nicca={nicca} className="w-full" />
            </div>
            <CompleteButton
              className="mt-4 w-full transform rounded-lg border-2 border-mainColor py-3 text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              niccaId={nicca.id}
              onComplete={handleComplete}
              isCompletedToday={isCompletedToday}
              fetchNicca={fetchNicca}
            />
          </div>
        </div>
      </div>
      <Confetti isAnimating={isAnimating} className="fixed inset-0 z-[9999]" />
      <ResetModal isOpen={showResetModal} onClose={handleCloseResetModal} />
    </>
  );
};
