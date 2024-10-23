import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFlashMessage } from '@/providers/FlashMessageProvider';
import { NiccaSchema, NiccaFormValues } from '@/lib/schema/nicca';
import { createNicca } from '@/app/actions/nicca';
import { CustomModal } from '@/components/ui/CustomModal';
import { Nicca } from '@/types/nicca';
import { useCallback } from 'react';

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
  onRegistration: (newNicca: Nicca) => void;
};

// TODO: 曜日が不足している時のエラー表示消してしまったので再度書く
export const NiccaRegistrationModal = ({ isOpen, onClose, onRegistration }: Props) => {
  const { showFlashMessage } = useFlashMessage();

  const form = useForm<NiccaFormValues>({
    resolver: zodResolver(NiccaSchema),
    defaultValues: {
      title: '',
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: NiccaFormValues) => {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    try {
      const result = await createNicca(values);
      // console.log('result', result);
      if (!result.success) {
        showFlashMessage(result.error, 'error');
      } else {
        showFlashMessage('日課が登録されました', 'success');
        onRegistration(result.data);
        form.reset();
      }
    } catch (error) {
      console.error('Nicca registration error:', error);
      showFlashMessage('日課の登録中にエラーが発生しました', 'error');
    }
  };

  const handleNiccaRegistration = useCallback(
    (newNicca: Nicca) => {
      onRegistration(newNicca);
      onClose();
    },
    [onRegistration, onClose],
  );

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <h2 className="mb-4 text-xl font-bold">日課登録</h2>
      <p className="mb-4 text-sm text-gray-600">日課名を入力し、実施する曜日を選択してください。</p>
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
                  form.watch(dayKey)
                    ? 'bg-primary text-white'
                    : 'border-2 border-primary/60 bg-white text-primary'
                } mx-1 size-8 text-xs`}
              >
                <input type="checkbox" {...form.register(dayKey)} className="hidden" />
                <span>{day}</span>
              </label>
            );
          })}
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} className="border-2 border-primary/60">
            戻る
          </Button>
          <Button type="submit" className="text-white">
            登録
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};
