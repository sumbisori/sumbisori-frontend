import { ReactNode, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ModalPortal from '../ModalPotal';
import { useModalController } from '@/contexts/src/ModalContext';

interface Props {
  id: string;
  children: ReactNode;
  type?: 'alert' | 'list';
}

export function Dialog({ id, children, type = 'alert' }: Props) {
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
          {(() => {
            switch (type) {
              case 'alert':
                return (
                  <motion.div
                    onClick={handleBackgroundClick}
                    className="fixed inset-0 z-200 flex items-center justify-center bg-black/30"
                    {...backDropAnimation}
                  >
                    <motion.div
                      {...modalAnimation}
                      className="relative size-80 rounded-lg bg-gray-050 p-6 shadow-lg"
                    >
                      <button
                        onClick={() => closeModal(id)}
                        className="absolute right-3 top-3 flex size-6 items-center justify-center rounded hover:bg-gray-300 active:bg-gray-300"
                      >
                        ✕
                      </button>
                      <>{children}</>
                    </motion.div>
                  </motion.div>
                );
              case 'list':
                return (
                  <motion.div
                    onClick={handleBackgroundClick}
                    className="fixed inset-0 z-200 flex items-center justify-center bg-black/30"
                    {...backDropAnimation}
                  >
                    <motion.div
                      {...modalAnimation}
                      className="flex flex-col gap-9 rounded-2xl bg-gray-050 px-9 py-6 shadow-lg"
                    >
                      <div>{children}</div>
                      <button
                        onClick={() => closeModal(id)}
                        className="flex items-center justify-center rounded text-lg font-medium hover:text-gray-500 active:text-gray-500"
                      >
                        취소
                      </button>
                    </motion.div>
                  </motion.div>
                );
              default:
                return <></>;
            }
          })()}
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
