import { ReactNode, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ModalPortal from '../Modal/ModalPortal';
import { useModalContext } from '@/contexts/ModalContext';

interface Props {
  id: string;
  children: ReactNode;
}

export function AlertBox({ id, children }: Props) {
  const { openModals, closeModal } = useModalContext();

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <AnimatePresence>
      {openModals[id] && (
        <ModalPortal>
          <div
            onClick={handleBackgroundClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          >
            <motion.div
              {...modalAnimation}
              className="relative size-80 rounded-lg bg-gray-050 p-6 shadow-lg"
            >
              <button
                onClick={closeModal}
                className="absolute right-3 top-3 flex size-6 items-center justify-center rounded hover:bg-gray-300"
              >
                ✕
              </button>
              <div className="h-full overflow-auto">{children}</div>
            </motion.div>
          </div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}

const modalAnimation = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
  transition: { type: 'spring', stiffness: 300, damping: 25 },
};
