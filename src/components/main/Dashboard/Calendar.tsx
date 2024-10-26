'use client';

import * as React from 'react';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Achievement } from '@/types/nicca';

type CustomCalendarProps = {
  className?: string;
  achievements: Achievement[];
};

export const CustomCalendar = ({ className, achievements }: CustomCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const isAchieved = achievements.some(
        (achievement) =>
          achievement.achievedDate.getDate() === date.getDate() &&
          achievement.achievedDate.getMonth() === date.getMonth() &&
          achievement.achievedDate.getFullYear() === date.getFullYear(),
      );

      return isAchieved ? (
        <div className="flex items-center justify-center">
          <Image src="/images/nicca-icon.png" alt="Completed" width={20} height={20} />
        </div>
      ) : null;
    }
    return null;
  };

  return (
    <Card className={`w-full rounded-lg border-2 border-mainColor bg-white ${className}`}>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        components={{
          Day: ({ day, date }) => {
            const isToday = date.toDateString() === new Date().toDateString();
            const isOutsideCurrentMonth = date.getMonth() !== new Date().getMonth();
            const isCompleted = achievements.some(
              (achievement) =>
                achievement.achievedDate.getDate() === date.getDate() &&
                achievement.achievedDate.getMonth() === date.getMonth() &&
                achievement.achievedDate.getFullYear() === date.getFullYear(),
            );
            return (
              <div
                className={`flex h-full w-full flex-col items-center justify-between rounded-md ${
                  isToday
                    ? 'bg-yellow-200 px-1 pb-1 xs:px-2 xs:pb-1'
                    : 'xs:by-1 px-1 pb-0.5 xs:px-2'
                } ${isOutsideCurrentMonth ? 'opacity-50' : 'font-bold'}`}
              >
                <div className="w-full px-0.5 py-1 text-center text-xs sm:text-[0.7rem] md:text-xs lg:text-sm">
                  {date.getDate()}
                </div>
                <div className="flex h-3 w-3 items-center justify-center sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5">
                  {isCompleted && (
                    <Image
                      src="/images/meat/meat-removebg.png"
                      alt="Meat"
                      width={16}
                      height={16}
                      className="h-full w-full object-contain"
                    />
                  )}
                </div>
              </div>
            );
          },
        }}
        classNames={{
          months: 'flex flex-col sm:flex-row space-y-0 justify-center px-4 xs:px-6 lg:py-2',
          month: 'space-y-2 sm:space-y-4',
          caption:
            'flex justify-center pt-1 relative items-center text-xs sm:text-sm md:text-base lg:text-lg',
          caption_label: 'text-xs font-bold sm:text-sm md:text-base lg:text-lg',
          nav: 'space-x-1 flex items-center',
          nav_button:
            'h-6 w-6 sm:h-7 sm:w-7 p-0 opacity-50 hover:opacity-100 md:h-8 md:w-8 lg:h-9 lg:w-9',
          nav_button_previous: 'absolute left-1',
          nav_button_next: 'absolute right-1',
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex justify-between w-full',
          head_cell:
            'text-muted-foreground w-6 sm:w-8 font-normal text-[0.7rem] sm:text-[0.8rem] md:text-sm lg:text-base',
          row: 'flex mt-2 justify-between',
        }}
        tileContent={tileContent}
      />
    </Card>
  );
};
