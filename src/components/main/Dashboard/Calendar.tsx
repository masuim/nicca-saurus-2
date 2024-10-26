'use client';

import * as React from 'react';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

type Props = {
  className?: string;
  completedDates: Date[];
};

export const CustomCalendar = ({ className, completedDates }: Props) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

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
            const isCompleted = completedDates.some(
              (completedDate) => completedDate.toDateString() === date.toDateString(),
            );
            return (
              <div
                className={`flex h-full w-full flex-col items-center justify-between rounded-md ${
                  isToday ? 'bg-yellow-200 px-2' : 'px-0.5'
                } ${isOutsideCurrentMonth ? 'opacity-50' : 'font-bold'}`}
              >
                <div className="text-xs sm:text-[0.7rem] md:text-xs lg:text-sm">
                  {date.getDate()}
                </div>
                <div className="h-3 w-3 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5">
                  {isCompleted && (
                    <Image
                      src="/images/meat/meat-removebg.png"
                      alt="Meat"
                      width={12}
                      height={12}
                      className="h-full w-full"
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
      />
    </Card>
  );
};
