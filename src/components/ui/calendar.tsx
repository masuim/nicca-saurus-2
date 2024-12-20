'use client';

import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  components?: {
    Day?: React.ComponentType<any>;
  };
};

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
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
        cell: 'h-8 w-8 p-0 font-normal',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
        ),
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
      }}
      components={{
        Day: props.components?.Day,
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
