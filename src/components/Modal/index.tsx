import { ReactNode, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModalPortal from './ModalPortal';
import { useModalContext } from '../../contexts/ModalContext';

interface Props {
  id: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg'; // New size prop with default as 'md'
}

export function Modal({ id, children, size = 'md' }: Props) {
  const { openModals, closeModal } = useModalContext();
  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Adjust modal height based on size prop
  const modalHeight =
    size === 'sm' ? 'h-[350px]' : size === 'lg' ? 'h-full' : 'h-2/3';

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
              className={`flex ${modalHeight} w-[393px] flex-col justify-between rounded-t-lg bg-gray-050 shadow-lg`}
            >
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
