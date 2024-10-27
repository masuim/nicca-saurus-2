'use client';

import * as React from 'react';
import { useState } from 'react';
import { Calendar } from './CalendarUI';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Achievement, Nicca } from '@/types/nicca';
import { WEEK_DAYS } from '@/constants/dates';
import { calendarClassNames } from './calendar-styles';

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
      <div className="relative p-2 sm:p-4">
        <div className="flex flex-col items-center">
          <div className="mb-4 flex w-full items-center justify-between px-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPreviousMonth}
                className="rounded-md p-1 text-mainColor hover:bg-subColor/10"
              >
                &lt;
              </button>
              <div className="text-lg font-bold text-mainColor">
                {date?.toLocaleString('ja-JP', { year: 'numeric', month: 'long' })}
              </div>
              <button
                onClick={goToNextMonth}
                className="rounded-md p-1 text-mainColor hover:bg-subColor/10"
              >
                &gt;
              </button>
            </div>
            <button
              onClick={goToToday}
              className="rounded-md border border-mainColor bg-subColor px-3 py-1 text-sm text-mainColor transition-colors duration-200 hover:bg-subColor/80"
            >
              今日
            </button>
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
                    className={`flex h-full w-full flex-col items-center justify-center rounded-md ${
                      isOutsideCurrentMonth ? 'opacity-50' : 'font-bold'
                    } ${isToday ? 'bg-subColor' : ''}`}
                  >
                    <div className="text-xs sm:text-[0.7rem] md:text-xs lg:text-sm">
                      {date.getDate()}
                    </div>
                    <div className="mt-1 h-3 w-3 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5">
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
                );
              },
            }}
            classNames={{
              ...calendarClassNames,
              nav: 'hidden', // 既存のナビゲーションを非表示にする
              months: 'flex flex-col sm:flex-row space-y-0 justify-center',
              month: 'space-y-2 sm:space-y-4',
              table: 'w-full border-collapse space-y-1',
              head_row: 'flex justify-between w-full',
              head_cell:
                'text-muted-foreground w-6 sm:w-8 font-normal text-[0.7rem] sm:text-[0.8rem] md:text-sm lg:text-base',
              row: 'flex mt-2 justify-between',
              cell: 'h-8 w-8 p-0 font-normal',
              day: 'h-8 w-8 p-0 font-normal',
            }}
          />
        </div>
      </div>
    </Card>
  );
};
