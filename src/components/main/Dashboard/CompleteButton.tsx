import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useFlashMessage } from '@/providers/FlashMessageProvider';

type CompleteButtonProps = {
  className?: string;
  onComplete: (date: Date) => void;
};

export const CompleteButton = ({ className, onComplete }: CompleteButtonProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const { showFlashMessage } = useFlashMessage();

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete(new Date());
    showFlashMessage('本日の日課完了！お疲れさまです！', 'success');
  };

  return (
    <Button
      onClick={handleComplete}
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
