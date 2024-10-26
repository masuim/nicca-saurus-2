import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useFlashMessage } from '@/providers/FlashMessageProvider';
import { addAchievement } from '@/app/actions/nicca';

type CompleteButtonProps = {
  className?: string;
  niccaId: string;
  onComplete: (date: Date) => void;
};

export const CompleteButton = ({ className, niccaId, onComplete }: CompleteButtonProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const { showFlashMessage } = useFlashMessage();

  const handleClick = async () => {
    const today = new Date();
    const result = await addAchievement(niccaId, today);
    console.log('result', result);
    if (result.success) {
      setIsCompleted(true);
      onComplete(today);
      showFlashMessage('本日の日課完了！お疲れさまです！', 'success');
    } else {
      showFlashMessage(result.error || '日課の完了に失敗しました。', 'error');
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`${className} ${
        isCompleted ? 'bg-gray-500' : 'bg-subColor hover:bg-subColor/80'
      } transform rounded-lg border-2 border-mainColor px-4 py-2 transition-all duration-300 ease-in-out hover:scale-105`}
      disabled={isCompleted}
    >
      <span className={`text-sm font-semibold ${isCompleted ? 'text-white' : 'text-mainColor'}`}>
        {isCompleted ? '完了しました！' : '本日の日課完了！'}
      </span>
    </Button>
  );
};
