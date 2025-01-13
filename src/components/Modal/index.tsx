import { ReactNode, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModalPortal from './ModalPortal';
import { useModalContext } from '@/contexts/ModalContext';

interface Props {
  id: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ id, children, size = 'md' }: Props) {
  const { openModals, closeModal } = useModalContext();

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const modalHeight =
    size === 'sm' ? 'h-[21.875rem]' : size === 'lg' ? 'h-full' : 'h-2/3';

  return (
    <AnimatePresence>
      {openModals[id] && (
        <ModalPortal>
          <div
            onClick={(e) => handleBackgroundClick(e)}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/20"
          >
            <motion.div
              {...modalAnimation}
              drag="y"
              dragConstraints={{ top: 0, bottom: 200 }}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100 && info.velocity.y > 0) {
                  closeModal();
                }
              }}
              className={`flex ${modalHeight} min-w-full-layout max-w-full-layout w-full flex-col justify-between rounded-t-lg bg-gray-050 shadow-lg`}
            >
              <div className="mt-4 h-0.5 w-2/3 cursor-pointer self-center bg-gray-600" />
              <div className="h-full overflow-auto px-4 pb-4 pt-6">
                {children}
              </div>
            </motion.div>
          </div>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
}

const modalAnimation = {
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '100%', opacity: 0 },
  transition: { type: 'spring', stiffness: 300, damping: 30 },
};
