import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createRoot } from 'react-dom/client';
import clsx from 'clsx';
import SuccessIcon from '@/icons/toast/success.svg?react';
import ErrorIcon from '@/icons/toast/error.svg?react';
import WarningIcon from '@/icons/toast/warning.svg?react';
import InfoIcon from '@/icons/toast/info.svg?react';

interface ToastProps {
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const Toast = ({ message, type }: ToastProps) => {
  const getToastStyles = () => {
    switch (type) {
      case 'info':
        return 'bg-blue-400 text-white';
      case 'success':
        return 'bg-green-400 text-white';
      case 'error':
        return 'bg-red-400 text-white';
      case 'warning':
        return 'bg-yellow-400 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const ToastIcon = ({ className }: { className?: string }) => {
    switch (type) {
      case 'info':
        return <InfoIcon className={className} />;
      case 'success':
        return <SuccessIcon className={className} />;
      case 'error':
        return <ErrorIcon className={className} />;
      case 'warning':
        return <WarningIcon className={className} />;
      default:
        return <InfoIcon className={className} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={clsx(
        'fixed inset-x-0 bottom-20 z-500 m-auto flex w-fit min-w-20 max-w-full-layout items-center justify-center gap-2 rounded-2xl px-4 py-3 shadow-lg',
        getToastStyles(),
      )}
    >
      <ToastIcon className="size-6 text-white" />
      {message}
    </motion.div>
  );
};

const ToastWrapper = ({
  message,
  type,
  onDone,
}: ToastProps & { onDone: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {isVisible && <Toast message={message} type={type} />}
    </AnimatePresence>
  );
};

export const toast = {
  createToast: (message: string, type: ToastProps['type']) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const onDone = () => {
      root.unmount();
      container.remove();
    };

    root.render(<ToastWrapper message={message} type={type} onDone={onDone} />);
  },
  info: (message: string) => toast.createToast(message, 'info'),
  success: (message: string) => toast.createToast(message, 'success'),
  error: (message: string) => toast.createToast(message, 'error'),
  warning: (message: string) => toast.createToast(message, 'warning'),
};
