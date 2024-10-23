import { z } from 'zod';
import { WeekSchema } from './week';

export const NiccaSchema = z.object({
  title: z.string().min(1, '日課を入力してください'),
  ...WeekSchema._def.schema.shape,
});

export type NiccaFormValues = z.infer<typeof NiccaSchema>;
