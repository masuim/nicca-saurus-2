import { z } from 'zod';
import { NUMBERS } from '@/constants/numbers';
import { MESSAGES } from '@/constants/messages';

export const WeekSchema = z
  .object({
    monday: z.boolean(),
    tuesday: z.boolean(),
    wednesday: z.boolean(),
    thursday: z.boolean(),
    friday: z.boolean(),
    saturday: z.boolean(),
    sunday: z.boolean(),
  })
  .refine((data) => Object.values(data).filter(Boolean).length >= NUMBERS.MINIMUM_SELECTED_DAYS, {
    message: MESSAGES.VALIDATION.MINIMUM_DAYS_SELECTION(NUMBERS.MINIMUM_SELECTED_DAYS),
    path: ['week'],
  });

export type Week = z.infer<typeof WeekSchema>;
