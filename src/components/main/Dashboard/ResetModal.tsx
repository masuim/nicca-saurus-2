import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type ResetModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ResetModal = ({ isOpen, onClose }: ResetModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-mainColor">
            リセットのお知らせ
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            前回の予定日に日課を行わなかったため、進行状況がリセットされました。
            <br />
            また最初から一緒に頑張りましょう！
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
