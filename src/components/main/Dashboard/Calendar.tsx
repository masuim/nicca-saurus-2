"use client"

import * as React from "react"
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image';

export const CustomCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card className="w-full max-w-xs mx-auto xs:max-w-[300px] md:max-w-[360px] lg:max-w-[432px] transform md:scale-100 lg:scale-120 transition-transform duration-300">
      <CardContent className="p-4 xs:p-2 md:p-5">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          components={{
            Day: ({ day, date }) => (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="md:text-base lg:text-lg">{date.getDate()}</div>
                <Image
                  src="/images/meat/meat-removebg.png"
                  alt="Meat"
                  width={16}
                  height={16}
                  className="w-4 h-4 md:w-5 md:h-5"
                />
              </div>
            ),
          }}
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center md:text-base lg:text-lg",
            caption_label: "text-sm font-medium md:text-base lg:text-lg",
            nav: "space-x-1 flex items-center",
            nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 md:h-8 md:w-8 lg:h-9 lg:w-9",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-muted-foreground rounded-md w-7 min-[320px]:w-adaptive-7-9 min-[360px]:w-9 font-normal text-[0.8rem] md:text-sm lg:text-base md:w-10 lg:w-12",
            row: "flex mt-2 justify-between",
            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 md:text-base lg:text-lg",
            day: "h-9 w-7 min-[320px]:w-adaptive-7-9 min-[360px]:w-9 p-0 font-normal aria-selected:opacity-100 md:h-10 md:w-10 lg:h-12 lg:w-12",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
        />
      </CardContent>
    </Card>
  )
}