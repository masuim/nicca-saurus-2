import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FaPlus } from 'react-icons/fa';

export const NiccaRegistrationModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-left transition-colors hover:bg-white/10"
          onClick={() => setIsOpen(true)}
        >
          <FaPlus className="mr-3 text-lg" /> 日課登録
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>日課登録</DialogTitle>
          <DialogDescription>
            新しい日課を登録します。日課名と実施する曜日を選択してください。
          </DialogDescription>
        </DialogHeader>
        {/* ここにフォーム要素を追加します */}
      </DialogContent>
    </Dialog>
  );
};
