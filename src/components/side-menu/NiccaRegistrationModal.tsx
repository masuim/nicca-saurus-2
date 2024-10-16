import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFlashMessage } from '@/providers/FlashMessageProvider';
import { NiccaSchema, NiccaFormValues } from '@/lib/validations/nicca';
import { createNicca } from '@/app/actions/nicca';

const dayMap = ['月', '火', '水', '木', '金', '土', '日'];

const dayKeys = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRegistration: (nicca: { title: string }) => void;
};

export const NiccaRegistrationModal = ({ isOpen, onClose, onRegistration }: Props) => {
  const { showFlashMessage } = useFlashMessage();

  const form = useForm<NiccaFormValues>({
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

  const toggleDay = (
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
  ) => {
    form.setValue(`week.${day}`, !form.getValues(`week.${day}`), { shouldValidate: true });
    form.trigger('week');
  };

  const onSubmit = async (values: NiccaFormValues) => {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    try {
      const result = await createNicca(values);
      if (result.error) {
        showFlashMessage(result.error, 'error');
      } else {
        showFlashMessage('日課が登録されました', 'success');
        onRegistration({ title: values.title });
        form.reset();
      }
    } catch (error) {
      console.error('Nicca registration error:', error);
      showFlashMessage('日課の登録中にエラーが発生しました', 'error');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>日課登録</DialogTitle>
          <DialogDescription>日課名を入力し、実施する曜日を選択してください。</DialogDescription>
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
            <Button variant="outline" onClick={onClose} className="border-2 border-primary/60">
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
