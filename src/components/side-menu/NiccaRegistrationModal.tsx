import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFlashMessage } from '@/providers/FlashMessageProvider';
import { NiccaSchema, NiccaFormValues } from '@/lib/schema/nicca';
import { createNicca } from '@/app/actions/nicca';
import { CustomModal } from '@/components/ui/CustomModal';
import { Nicca } from '@/types/nicca';
import { useEffect } from 'react';
import { NUMBERS } from '@/constants/numbers';
import { MESSAGES } from '@/constants/messages';

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
  canClose: boolean;
};

export const NiccaRegistrationModal = ({ isOpen, onClose, onRegistration, canClose }: Props) => {
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

  const selectedDays = form.watch(dayKeys);

  useEffect(() => {
    const selectedCount = selectedDays.filter(Boolean).length;
    const currentError = form.formState.errors.root?.message;

    if (selectedCount < NUMBERS.MINIMUM_SELECTED_DAYS) {
      if (
        currentError !== MESSAGES.VALIDATION.MINIMUM_DAYS_SELECTION(NUMBERS.MINIMUM_SELECTED_DAYS)
      ) {
        form.setError('root', {
          type: 'manual',
          message: MESSAGES.VALIDATION.MINIMUM_DAYS_SELECTION(NUMBERS.MINIMUM_SELECTED_DAYS),
        });
      }
    } else {
      if (currentError) {
        form.clearErrors('root');
      }
    }
  }, [selectedDays, form]);

  const onSubmit = async (values: NiccaFormValues) => {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    try {
      const result = await createNicca(values);
      if (!result.success) {
        showFlashMessage(MESSAGES.FLASH_MESSAGES.NICCA_REGISTRATION_ERROR, 'error');
      } else if (result.data) {
        showFlashMessage(MESSAGES.FLASH_MESSAGES.NICCA_REGISTRATION_SUCCESS, 'success');
        onRegistration(result.data);
        form.reset();
      } else {
        showFlashMessage(MESSAGES.FLASH_MESSAGES.NICCA_REGISTRATION_UNEXPECTED_ERROR, 'error');
      }
    } catch (error) {
      console.error('Nicca registration error:', error);
      showFlashMessage(MESSAGES.FLASH_MESSAGES.NICCA_REGISTRATION_UNEXPECTED_ERROR, 'error');
    }
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} canClose={canClose}>
      <h2 className="mb-4 text-xl font-bold">{MESSAGES.FORM.NICCA_REGISTRATION_TITLE}</h2>
      <p className="mb-4 text-sm text-gray-600">{MESSAGES.FORM.NICCA_REGISTRATION_INSTRUCTION}</p>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input
          placeholder={MESSAGES.FORM.NICCA_TITLE_PLACEHOLDER}
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
        {form.formState.errors.root && (
          <p className="mt-2 text-sm text-red-500">{form.formState.errors.root.message}</p>
        )}
        <div className="mt-6 flex justify-end">
          <Button type="submit" className="text-white">
            {MESSAGES.FORM.REGISTER}
          </Button>
        </div>
      </form>
    </CustomModal>
  );
};
