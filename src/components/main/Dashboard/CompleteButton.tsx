import { Button } from '@/components/ui/button';
import { useFlashMessage } from '@/providers/FlashMessageProvider';
import { addAchievement } from '@/app/actions/nicca/add-achievement';

type CompleteButtonProps = {
  className?: string;
  niccaId: string;
  onComplete: (date: Date) => void;
  isCompletedToday: boolean;
  fetchNiccas: () => Promise<void>;
};

export const CompleteButton = ({
  className,
  niccaId,
  onComplete,
  isCompletedToday,
  fetchNiccas,
}: CompleteButtonProps) => {
  const { showFlashMessage } = useFlashMessage();

  const handleClick = async () => {
    // TODO: この分岐がtrueになることはあり得るのか？
    if (isCompletedToday) {
      showFlashMessage('本日の日課は既に完了しています！', 'info');
      return;
    }

    const today = new Date();
    const result = await addAchievement(niccaId, today);
    if (result.success) {
      onComplete(today);
      showFlashMessage('お疲れさまです！これからも頑張りましょう！', 'success');
      await fetchNiccas();
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
        {isCompletedToday ? '達成済み！' : '日課を達成したらクリック！'}
      </span>
    </Button>
  );
};
