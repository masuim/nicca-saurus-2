import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { GiPlesiosaurus } from 'react-icons/gi';

export const CompleteButton = ({ className }: { className?: string }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    alert('本日の日課完了！お疲れさまです！');
  };

  return (
    <Button
      onClick={handleComplete}
      className={`${className} ${
        isCompleted ? 'bg-gray-500' : 'bg-subColor hover:bg-subColor/80'
      } transform rounded-lg border-2 border-mainColor px-4 py-2 transition-all duration-300 ease-in-out hover:scale-105`}
      disabled={isCompleted}
    >
      <span className="text-sm font-semibold text-mainColor">
        {isCompleted ? '完了しました！' : '本日の日課完了！'}
      </span>
    </Button>
  );
};
