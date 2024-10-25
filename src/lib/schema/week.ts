import { z } from 'zod';
import { MINIMUM_SELECTED_DAYS } from '@/constants';

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
  .refine((data) => Object.values(data).filter(Boolean).length >= MINIMUM_SELECTED_DAYS, {
    message: `少なくとも${MINIMUM_SELECTED_DAYS}日以上選択してください`,
    path: ['week'],
  });

export type Week = z.infer<typeof WeekSchema>;
