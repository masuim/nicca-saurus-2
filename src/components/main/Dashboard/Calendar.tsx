'use client';

import * as React from 'react';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

type Props = {
  className?: string;
  completedDates: Date[];
};

export const CustomCalendar = ({ className, completedDates }: Props) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className={`w-full rounded-lg border-2 border-mainColor bg-white ${className}`}>
      <CardContent className="p-1 xs:p-2">
        <Calendar
          mode="single"
          selected={date}
          components={{
            Day: ({ day, date }) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const isOutsideCurrentMonth = date.getMonth() !== new Date().getMonth();
              const isCompleted = completedDates.some(
                (completedDate) => completedDate.toDateString() === date.toDateString(),
              );
              return (
                <div
                  className={`flex h-full w-full flex-col items-center justify-center rounded-md p-1 ${
                    isToday ? 'bg-yellow-200' : ''
                  } ${isOutsideCurrentMonth ? 'opacity-50' : 'font-bold'}`}
                >
                  <div className="text-xs sm:text-sm md:text-base lg:text-lg">{date.getDate()}</div>
                  {isCompleted && (
                    <Image
                      src="/images/meat/meat-removebg.png"
                      alt="Meat"
                      width={12}
                      height={12}
                      className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"
                    />
                  )}
                </div>
              );
            },
          }}
          classNames={{
            months: 'flex flex-col sm:flex-row space-y-2 sm:space-x-2 sm:space-y-0 justify-center',
            month: 'space-y-2 sm:space-y-4',
            caption:
              'flex justify-center pt-1 relative items-center text-xs sm:text-sm md:text-base lg:text-lg',
            caption_label: 'text-xs font-bold sm:text-sm md:text-base lg:text-lg',
            nav: 'space-x-1 flex items-center',
            nav_button:
              'h-6 w-6 sm:h-7 sm:w-7 bg-transparent p-0 opacity-50 hover:opacity-100 md:h-8 md:w-8 lg:h-9 lg:w-9',
            nav_button_previous: 'absolute left-1',
            nav_button_next: 'absolute right-1',
            table: 'w-full border-collapse space-y-1',
            head_row: 'flex justify-between w-full',
            head_cell:
              'text-muted-foreground w-6 sm:w-8 font-normal text-[0.7rem] sm:text-[0.8rem] md:text-sm lg:text-base',
            row: 'flex mt-2 justify-between',
          }}
        />
      </CardContent>
    </Card>
  );
};
