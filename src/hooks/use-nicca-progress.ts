import { useState, useEffect } from 'react';
import { Nicca } from '@/types/nicca';
import { WEEK_DAYS } from '@/constants/dates';
import { resetNiccaAchievements } from '@/app/actions/nicca/reset-nicca-achievements';
import { useFlashMessage } from '@/providers/FlashMessageProvider';
import { MESSAGES } from '@/constants/messages';

export const useNiccaProgress = (nicca: Nicca | null) => {
  const [shouldReset, setShouldReset] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [achievements, setAchievements] = useState<Date[]>([]);
  const { showFlashMessage } = useFlashMessage();

  useEffect(() => {
    if (!nicca) return;

    const checkMissedDays = () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      // startDateをDate型に変換
      const startDate = new Date(nicca.startDate);
      startDate.setHours(0, 0, 0, 0);

      // 昨日がstartDate以前の場合はチェックしない
      if (yesterday < startDate) return;

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

  useEffect(() => {
    if (nicca && shouldReset) {
      const resetAchievements = async () => {
        const result = await resetNiccaAchievements(nicca.id);
        if (!result.success) {
          showFlashMessage(result.error || MESSAGES.RESET_NICCA.ERROR, 'error');
        } else if (result.data) {
          // 新しいNicca情報を受け取る
          const updatedNicca = result.data;
          // 必要に応じて状態を更新
          setAchievements(updatedNicca.achievements.map((a) => new Date(a.achievedDate!)));
        }
        setShouldReset(false);
      };
      resetAchievements();
    }
  }, [nicca, shouldReset, showFlashMessage]);

  useEffect(() => {
    if (nicca) {
      const achievedDates = nicca.achievements
        .filter((achievement) => achievement.achievedDate)
        .map((achievement) => new Date(achievement.achievedDate!));
      setAchievements(achievedDates);
    }
  }, [nicca]);

  return { shouldReset, showResetModal, setShowResetModal, achievements };
};
