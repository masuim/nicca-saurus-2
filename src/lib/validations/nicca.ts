import { z } from 'zod';

export const NiccaSchema = z.object({
  title: z.string().min(1, '日課を入力してください'),
  week: z
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
      message: '少なくとも4日は選択してください',
    }),
});

export type NiccaFormValues = z.infer<typeof NiccaSchema>;
