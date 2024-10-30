import { Button } from '@/components/ui/button';
import { useFlashMessage } from '@/providers/FlashMessageProvider';
import { addAchievement } from '@/app/actions/nicca/add-achievement';

type CompleteButtonProps = {
  className?: string;
  niccaId: string;
  onComplete: (date: Date) => void;
  isCompletedToday: boolean;
  fetchNicca: () => Promise<void>;
};

export const CompleteButton = ({
  className,
  niccaId,
  onComplete,
  isCompletedToday,
  fetchNicca,
}: CompleteButtonProps) => {
  const { showFlashMessage } = useFlashMessage();

  const handleClick = async () => {
    if (isCompletedToday) {
      showFlashMessage('本日の日課は既に完了しています！', 'info');
      return;
    }

    const today = new Date();
    const result = await addAchievement(niccaId, today);
    if (result.success) {
      onComplete(today);
      showFlashMessage('本日の日課完了！お疲れさまです！', 'success');
      await fetchNicca();
    } else {
      showFlashMessage(result.error || '日課の完了に失敗しました。', 'error');
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`${className} ${
        isCompletedToday ? 'bg-gray-500' : 'bg-subColor hover:bg-subColor/80'
      } transform rounded-lg border-2 border-mainColor px-4 py-2 transition-all duration-300 ease-in-out hover:scale-105`}
      disabled={isCompletedToday}
    >
      <span
        className={`text-sm font-semibold ${isCompletedToday ? 'text-white' : 'text-mainColor'}`}
      >
        {isCompletedToday ? '完了しました！' : '本日の日課完了！'}
      </span>
    </Button>
  );
};
