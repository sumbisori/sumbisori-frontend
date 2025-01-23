import { ReactNode, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModalPortal from './ModalPortal';
import { useModalController } from '@/contexts/ModalContext';

interface Props {
  id: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function BottomSheet({ id, children, size = 'md' }: Props) {
  const { openedModals, closeModal } = useModalController();
  const mounted = openedModals.has(id);

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      closeModal(id);
    }
  };

  const modalHeight =
    size === 'sm' ? 'h-[21.875rem]' : size === 'lg' ? 'h-full' : 'h-2/3';

  return (
    <AnimatePresence>
      {mounted && (
        <ModalPortal>
          <motion.div
            {...backDropAnimation}
            onClick={(e) => handleBackgroundClick(e)}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/20"
          >
            <motion.div
              {...modalAnimation}
              drag="y"
              dragConstraints={{ top: 0, bottom: 200 }}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100 && info.velocity.y > 0) {
                  closeModal(id);
                }
              }}
              className={`flex ${modalHeight} w-full min-w-full-layout max-w-full-layout flex-col justify-between rounded-t-lg bg-gray-050 shadow-lg`}
            >
              <div className="mt-4 h-0.5 w-2/3 cursor-pointer self-center bg-gray-600" />
              <div className="h-full overflow-auto px-4 pb-4 pt-6">
                {children}
              </div>
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
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '100%', opacity: 0 },
  transition: { type: 'spring', stiffness: 250, damping: 30 },
};
