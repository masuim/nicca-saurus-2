import { CustomModal } from '@/components/ui/CustomModal';
import { MESSAGES } from '@/constants/messages';

type ResetModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ResetModal = ({ isOpen, onClose }: ResetModalProps) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} canClose={true}>
      <h2 className="mb-4 text-center text-xl font-bold text-mainColor">
        {MESSAGES.RESET_MODAL.TITLE}
      </h2>
      <div className="mt-4 text-center">
        <p className="whitespace-pre-line text-sm text-gray-600">{MESSAGES.RESET_MODAL.MESSAGE}</p>
      </div>
    </CustomModal>
  );
};
