'use client';

import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { calendarClassNames } from './calendar-styles';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  components?: {
    Day?: React.ComponentType<any>;
  };
};

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('flex justify-center p-3', className)}
      classNames={{
        ...calendarClassNames,
        months: cn('flex flex-col sm:flex-row space-y-0 justify-center', classNames?.months),
        month: cn('space-y-2 sm:space-y-4', classNames?.month),
        table: cn('w-full border-collapse space-y-1', classNames?.table),
        head_row: cn('flex justify-between w-full', classNames?.head_row),
        head_cell: cn(
          'text-muted-foreground w-6 sm:w-8 font-normal text-[0.7rem] sm:text-[0.8rem] md:text-sm lg:text-base',
          classNames?.head_cell,
        ),
        row: cn('flex mt-2 justify-between', classNames?.row),
        cell: cn('h-8 w-8 p-0 font-normal', classNames?.cell),
        day: cn('h-8 w-8 p-0 font-normal', classNames?.day),
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
