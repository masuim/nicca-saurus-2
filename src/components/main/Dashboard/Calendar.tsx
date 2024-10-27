'use client';

import * as React from 'react';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Achievement, Nicca } from '@/types/nicca';
import { WEEK_DAYS } from '@/constants/dates';
import { calendarClassNames } from '@/constants/calendar-class-names';

type CustomCalendarProps = {
  className?: string;
  achievements: Achievement[];
  nicca: Nicca;
};

export const CustomCalendar = ({ className, achievements, nicca }: CustomCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const isScheduledDay = (date: Date) => {
    const dayOfWeek = date.getDay();
    const currentDay = WEEK_DAYS[dayOfWeek];

    const startDate = new Date(nicca.startDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(nicca.endDate);
    endDate.setHours(23, 59, 59, 999);

    return nicca[currentDay as keyof typeof nicca] && date >= startDate && date <= endDate;
  };

  const goToToday = () => {
    setDate(new Date());
  };

  const goToPreviousMonth = () => {
    if (date) {
      const prevMonth = new Date(date);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      setDate(prevMonth);
    }
  };

  const goToNextMonth = () => {
    if (date) {
      const nextMonth = new Date(date);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setDate(nextMonth);
    }
  };

  return (
    <Card className={`w-full rounded-lg border-2 border-mainColor bg-mainColor ${className}`}>
      <div className="relative p-4">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={goToToday}
            className="rounded-md border border-mainColor bg-subColor p-2 text-mainColor hover:bg-subColor/10"
          >
            今日
          </button>
          <div className="flex items-center space-x-2">
            <div className="text-lg font-bold text-mainColor">
              {date?.toLocaleString('ja-JP', { year: 'numeric', month: 'long' })}
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={goToPreviousMonth}
                className="rounded-md p-1 font-bold text-mainColor"
              >
                &lt;
              </button>
              <button onClick={goToNextMonth} className="rounded-md p-1 font-bold text-mainColor">
                &gt;
              </button>
            </div>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={date}
          onMonthChange={setDate}
          components={{
            Caption: () => null,
            Day: ({ date, ...props }: { date: Date } & React.HTMLAttributes<HTMLDivElement>) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const isOutsideCurrentMonth = date.getMonth() !== new Date().getMonth();
              const isCompleted = achievements.some(
                (achievement) =>
                  achievement.achievedDate &&
                  new Date(achievement.achievedDate).toDateString() === date.toDateString(),
              );
              const isScheduled = isScheduledDay(date);

              return (
                <div
                  {...props}
                  className={`flex h-full w-full flex-col items-center justify-between rounded-md ${
                    isOutsideCurrentMonth ? 'opacity-50' : 'font-bold'
                  }`}
                >
                  <div
                    className={`flex w-full flex-col items-center justify-between pb-1 ${
                      isToday ? 'rounded-md bg-subColor' : ''
                    }`}
                  >
                    <div className="flex w-full justify-center px-0.5 py-1 text-center text-xs sm:text-[0.7rem] md:text-xs lg:text-sm">
                      {date.getDate()}
                    </div>
                    <div className="flex h-3 w-3 items-center justify-center sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5">
                      {isCompleted ? (
                        <Image
                          src="/images/meat/meat-removebg.png"
                          alt="Meat"
                          width={16}
                          height={16}
                          className="h-full w-full object-contain"
                        />
                      ) : isScheduled ? (
                        <div className="h-2 w-2 rounded-md bg-subColor sm:h-2 sm:w-2 md:h-3 md:w-3 lg:h-4 lg:w-4" />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            },
          }}
          classNames={{
            ...calendarClassNames,
            nav: 'hidden', // 既存のナビゲーションを非表示にする
          }}
        />
      </div>
    </Card>
  );
};
