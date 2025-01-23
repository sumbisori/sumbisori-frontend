import { ReactNode, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ModalPortal from '../BottomSheet/ModalPortal';
import { useModalController } from '@/contexts/ModalContext';

interface Props {
  id: string;
  children: ReactNode;
}

export function Dialog({ id, children }: Props) {
  const { openedModals, closeModal } = useModalController();
  const mounted = openedModals.has(id);

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      closeModal(id);
    }
  };

  return (
    <AnimatePresence>
      {mounted && (
        <ModalPortal>
          <motion.div
            onClick={handleBackgroundClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            {...backDropAnimation}
          >
            <motion.div
              {...modalAnimation}
              className="relative size-80 rounded-lg bg-gray-050 p-6 shadow-lg"
            >
              <button
                onClick={() => closeModal(id)}
                className="absolute right-3 top-3 flex size-6 items-center justify-center rounded hover:bg-gray-300"
              >
                ✕
              </button>
              <>{children}</>
            </motion.div>
          </motion.div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}

const backDropAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

const modalAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.3 },
};
