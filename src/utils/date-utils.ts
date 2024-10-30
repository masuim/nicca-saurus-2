import { WEEK_DAYS } from '@/constants/dates';

export const calculateStartDate = (weekData: Record<string, boolean>): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dayOfWeek = today.getDay();
  const todayWeekDay = WEEK_DAYS[dayOfWeek];

  // 今日が選択された曜日の場合、今日をstartDateとする
  if (weekData[todayWeekDay as keyof typeof weekData]) {
    return today;
  }

  // 今日以降で最初の選択された曜日を見つける
  for (let i = 1; i <= 7; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);
    const futureDayOfWeek = futureDate.getDay();
    const futureWeekDay = WEEK_DAYS[futureDayOfWeek];

    if (weekData[futureWeekDay as keyof typeof weekData]) {
      return futureDate;
    }
  }

  // ここには到達しないはずですが、安全のため
  return today;
};

export const calculateEndDate = (startDate: Date): Date => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 35);
  return endDate;
};
