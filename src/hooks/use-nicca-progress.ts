// src/hooks/useNiccaProgress.ts
import { useState, useEffect } from 'react';
import { Nicca } from '@/types/nicca';
import { WEEK_DAYS } from '@/constants/dates';

export const useNiccaProgress = (nicca: Nicca | null) => {
  const [shouldReset, setShouldReset] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    if (!nicca) return;

    const checkMissedDays = () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      // 昨日が設定された曜日かどうかチェック
      const yesterdayDay = WEEK_DAYS[yesterday.getDay()];
      if (!nicca[yesterdayDay as keyof Nicca]) return;

      // 昨日の達成記録があるかチェック
      const hasYesterdayAchievement = nicca.achievements.some(
        (achievement) =>
          achievement.achievedDate &&
          new Date(achievement.achievedDate).toDateString() === yesterday.toDateString(),
      );

      if (!hasYesterdayAchievement) {
        setShouldReset(true);
        setShowResetModal(true);
      }
    };

    // 毎日0時にチェック
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    checkMissedDays();
    const midnightTimeout = setTimeout(checkMissedDays, timeUntilMidnight);

    return () => clearTimeout(midnightTimeout);
  }, [nicca]);

  return { shouldReset, showResetModal, setShowResetModal };
};