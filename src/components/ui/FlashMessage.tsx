'use client';

import { useFlashMessage } from '@/providers/FlashMessageProvider';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export const FlashMessage = () => {
  const { flashMessages, hideFlashMessage } = useFlashMessage();

  return (
    <div className="fixed right-4 top-20 z-50 space-y-2">
      <AnimatePresence>
        {flashMessages.map((flashMessage) => (
          <motion.div
            key={flashMessage.id}
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={cn('max-w-sm rounded-lg border-2 bg-subColor shadow-lg', {
              'border-mainColor': true,
              'text-mainColor': true,
            })}
          >
            <div className="flex items-center justify-between p-4">
              <div className="text-sm font-bold">{flashMessage.message}</div>
              <button
                onClick={() => hideFlashMessage(flashMessage.id)}
                className="ml-4 text-mainColor hover:text-opacity-70"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
