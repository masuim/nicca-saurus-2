import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { FaPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFlashMessage } from '@/providers/FlashMessageProvider';

const dayMap = ['月', '火', '水', '木', '金', '土', '日'];

const NiccaSchema = z.object({
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

const dayKeys = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

export const NiccaRegistrationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { showFlashMessage } = useFlashMessage();

  const form = useForm<z.infer<typeof NiccaSchema>>({
    resolver: zodResolver(NiccaSchema),
    defaultValues: {
      title: '',
      week: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
    },
    mode: 'onChange',
  });

  const toggleDay = (day: keyof z.infer<typeof NiccaSchema>['week']) => {
    form.setValue(`week.${day}`, !form.getValues(`week.${day}`), { shouldValidate: true });
    form.trigger('week');
  };

  const onSubmit = async (values: z.infer<typeof NiccaSchema>) => {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    // ここでデータを送信する処理を実装します（現在は省略）
    console.log(values);

    showFlashMessage('日課が登録されました', 'success');
    setIsOpen(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-left transition-colors hover:bg-white/10"
        >
          <FaPlus className="mr-3 text-lg" /> 日課登録
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>日課登録</DialogTitle>
          <DialogDescription>実施する曜日を選択してください。</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <input
            placeholder="日課を入力してください"
            {...form.register('title')}
            className="mb-4 w-full rounded-md border-2 border-primary/60 p-2 focus:outline-none focus:ring-2"
          />
          {form.formState.errors.title && (
            <p className="mb-2 text-sm text-red-500">{form.formState.errors.title.message}</p>
          )}
          <div className="mt-4 flex justify-between">
            {dayMap.map((day, index) => {
              const dayKey = dayKeys[index];
              return (
                <label
                  key={index}
                  className={`flex items-center justify-center rounded-full ${
                    form.watch(`week.${dayKey}`)
                      ? 'bg-primary text-white'
                      : 'border-2 border-primary/60 bg-white text-primary'
                  } mx-1 size-8 text-xs`}
                >
                  <input
                    type="checkbox"
                    {...form.register(`week.${dayKey}`)}
                    onChange={() => toggleDay(dayKey)}
                    className="hidden"
                  />
                  <span>{day}</span>
                </label>
              );
            })}
          </div>
          {form.formState.errors.week && (
            <p className="mt-2 text-sm text-red-500">{form.formState.errors.week.message}</p>
          )}
          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-2 border-primary/60"
            >
              戻る
            </Button>
            <Button type="submit" className="text-white">
              登録
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
