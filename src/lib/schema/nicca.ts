import { z } from 'zod';

export const NiccaSchema = z
  .object({
    title: z.string().min(1, '日課を入力してください'),
    monday: z.boolean(),
    tuesday: z.boolean(),
    wednesday: z.boolean(),
    thursday: z.boolean(),
    friday: z.boolean(),
    saturday: z.boolean(),
    sunday: z.boolean(),
  })
  .refine(
    (data) => {
      const days = [
        data.monday,
        data.tuesday,
        data.wednesday,
        data.thursday,
        data.friday,
        data.saturday,
        data.sunday,
      ];
      return days.filter(Boolean).length >= 4;
    },
    {
      // TODO: 4日以上のバリデーション2箇所でやってるので１つにする
      message: '少なくとも4日は選択してください',
    },
  );

export type NiccaFormValues = z.infer<typeof NiccaSchema>;
