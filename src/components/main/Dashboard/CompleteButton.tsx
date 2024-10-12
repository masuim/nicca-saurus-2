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
        isCompleted ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-primary/90'
      } transition-all duration-300 ease-in-out transform hover:scale-105`}
      disabled={isCompleted}
    >
      <GiPlesiosaurus className="mr-2" />
      {isCompleted ? '完了しました！' : '本日の日課完了！'}
    </Button>
  );
};
