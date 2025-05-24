"use client";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "./button";
import { cn } from "@project/lib/utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames: {
    months?: string;
    month_caption?: string;
  } = {};
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: `relative flex ${defaultClassNames?.months ?? ""}`,
        weeknumber: cn(
          "w-8 text-sm font-normal text-muted-foreground",
          classNames?.weeknumber
        ),
        month: cn("w-full", classNames?.month),

        caption_label: cn(
          "truncate text-sm font-medium",
          classNames?.caption_label
        ),
        nav_button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1 [&_svg]:fill-foreground",
          classNames?.nav_button_next
        ),
        nav_button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1 [&_svg]:fill-foreground",
          classNames?.nav_button_previous
        ),
        nav: cn("flex items-start", classNames?.nav),
        day: cn(
          "flex size-8 flex-1 items-center justify-center p-0 text-sm",
          classNames?.day
        ),
        button: cn(
          "size-8 rounded-md p-0 font-normal transition-none aria-selected:opacity-100",
          classNames?.button
        ),
        day_range_start: cn(
          "bg-accent [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground day-range-start rounded-s-md",
          classNames?.day_range_start
        ),
        day_range_middle: cn(
          "bg-accent !text-foreground [&>button]:bg-transparent [&>button]:!text-foreground [&>button]:hover:bg-transparent [&>button]:hover:!text-foreground",
          classNames?.day_range_middle
        ),
        day_range_end: cn(
          "bg-accent [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground day-range-end rounded-e-md",
          classNames?.day_range_end
        ),
        day_selected: cn(
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
          classNames?.day_selected
        ),
        day_today: cn(
          "[&>button]:bg-accent [&>button]:text-accent-foreground",
          classNames?.day_today
        ),
        day_outside: cn(
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          classNames?.day_outside
        ),
        day_disabled: cn(
          "text-muted-foreground opacity-50",
          classNames?.day_disabled
        ),
        day_hidden: cn("invisible flex-1", classNames?.day_hidden),
        ...classNames,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
