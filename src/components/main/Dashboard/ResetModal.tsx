import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MESSAGES } from '@/constants/messages';

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
            {MESSAGES.RESET_MODAL.TITLE}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-center">
          <p className="whitespace-pre-line text-sm text-gray-600">
            {MESSAGES.RESET_MODAL.MESSAGE}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
