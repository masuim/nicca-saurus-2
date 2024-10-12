'use client';

import * as React from 'react';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

type Props = {
  className?: string;
};

export const CustomCalendar = ({ className }: Props) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className={`w-full rounded-lg border-2 border-mainColor bg-white ${className}`}>
      <CardContent className="p-2 xs:p-3 sm:p-4 md:p-5">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          components={{
            Day: ({ day, date }) => (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="text-xs sm:text-sm md:text-base lg:text-lg">{date.getDate()}</div>
                <Image
                  src="/images/meat/meat-removebg.png"
                  alt="Meat"
                  width={12}
                  height={12}
                  className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5"
                />
              </div>
            ),
          }}
          classNames={{
            months: 'flex flex-col sm:flex-row space-y-2 sm:space-x-2 sm:space-y-0',
            month: 'space-y-2 sm:space-y-4',
            caption:
              'flex justify-center pt-1 relative items-center text-xs sm:text-sm md:text-base lg:text-lg',
            caption_label: 'text-xs font-medium sm:text-sm md:text-base lg:text-lg',
            nav: 'space-x-1 flex items-center',
            nav_button:
              'h-6 w-6 sm:h-7 sm:w-7 bg-transparent p-0 opacity-50 hover:opacity-100 md:h-8 md:w-8 lg:h-9 lg:w-9',
            nav_button_previous: 'absolute left-1',
            nav_button_next: 'absolute right-1',
            table: 'w-full border-collapse space-y-1',
            head_row: 'flex',
            head_cell:
              'text-muted-foreground rounded-md w-6 sm:w-8 font-normal text-[0.7rem] sm:text-[0.8rem] md:text-sm lg:text-base',
            row: 'flex mt-2 justify-between',
            cell: 'text-center text-xs sm:text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 md:text-base lg:text-lg',
            day: 'h-6 w-6 sm:h-8 sm:w-8 p-0 font-normal aria-selected:opacity-100 md:h-10 md:w-10 lg:h-12 lg:w-12',
            day_selected:
              'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
            day_today: 'bg-accent text-accent-foreground',
            day_outside:
              'text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
            day_disabled: 'text-muted-foreground opacity-50',
            day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
            day_hidden: 'invisible',
          }}
        />
      </CardContent>
    </Card>
  );
};
