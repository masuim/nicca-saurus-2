import { z } from 'zod';

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
  .refine((data) => Object.values(data).filter(Boolean).length >= 4, {
    message: '少なくとも4日以上選択してください',
  });

export type Week = z.infer<typeof WeekSchema>;
