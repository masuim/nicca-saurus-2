import { Button } from "@/components/ui/button";
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
        isCompleted ? 'bg-gray-500' : 'bg-mainColor hover:bg-primary/80'
      } text-white rounded-lg border-2 border-mainColor transition-all duration-300 ease-in-out transform hover:scale-105 px-4 py-2`}
      disabled={isCompleted}
    >
      <span className="text-sm font-medium">
        {isCompleted ? '完了しました！' : '本日の日課完了！'}
      </span>
    </Button>
  );
};
