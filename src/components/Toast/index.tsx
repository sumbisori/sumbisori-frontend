import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createRoot } from 'react-dom/client';
import clsx from 'clsx';
import SuccessIcon from '@/icons/toast/success-icon.svg?react';
import ErrorIcon from '@/icons/toast/error-icon.svg?react';
import WarningIcon from '@/icons/toast/warning-icon.svg?react';
import InfoIcon from '@/icons/toast/info-icon.svg?react';
import CloseIcon from '@/icons/toast/btn-close.svg?react';

interface ToastProps {
  message: string;
  type: 'info' | 'success' | 'error' | 'warning' | 'default';
  actionLabel?: string;
  onActionClick?: () => void;
  onClose?: () => void;
}

const Toast = ({
  message,
  type,
  actionLabel,
  onActionClick,
  onClose,
}: ToastProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={clsx(
        'fixed inset-x-0 bottom-20 z-500 m-auto flex w-80 max-w-full-layout items-center gap-2 rounded-lg px-4 py-3 text-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.20)]',
        TOAST_VARIANTS[type],
      )}
    >
      {TOAST_ICON_VARIANTS[type]}
      <div className="flex flex-1 items-center gap-4 text-sm font-normal">
        {message}
        {actionLabel && (
          <button
            onClick={onActionClick}
            className={clsx(
              'rounded bg-white/15 px-2 py-1 text-xs text-white hover:bg-white/20 focus:outline-none active:bg-white/20',
            )}
          >
            {actionLabel}
          </button>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 flex items-center justify-center text-white hover:opacity-80"
        >
          <CloseIcon className="size-4 text-gray-200 hover:text-white" />
        </button>
      )}
    </motion.div>
  );
};

const ToastWrapper = ({
  message,
  type,
  actionLabel,
  onActionClick,
  onDone,
}: ToastProps & { onDone: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence onExitComplete={onDone}>
      {isVisible && (
        <Toast
          message={message}
          type={type}
          actionLabel={actionLabel}
          onActionClick={onActionClick}
          onClose={handleClose}
        />
      )}
    </AnimatePresence>
  );
};

export const toast = {
  createToast: (
    message: string,
    type: ToastProps['type'],
    actionLabel?: string,
    onActionClick?: () => void,
  ) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const onDone = () => {
      root.unmount();
      container.remove();
    };

    root.render(
      <ToastWrapper
        message={message}
        type={type}
        actionLabel={actionLabel}
        onActionClick={onActionClick}
        onDone={onDone}
      />,
    );
  },
  info: (message: string, actionLabel?: string, onActionClick?: () => void) =>
    toast.createToast(message, 'info', actionLabel, onActionClick),
  success: (
    message: string,
    actionLabel?: string,
    onActionClick?: () => void,
  ) => toast.createToast(message, 'success', actionLabel, onActionClick),
  error: (message: string, actionLabel?: string, onActionClick?: () => void) =>
    toast.createToast(message, 'error', actionLabel, onActionClick),
  warning: (
    message: string,
    actionLabel?: string,
    onActionClick?: () => void,
  ) => toast.createToast(message, 'warning', actionLabel, onActionClick),
  default: (
    message: string,
    actionLabel?: string,
    onActionClick?: () => void,
  ) => toast.createToast(message, 'default', actionLabel, onActionClick),
};

const TOAST_VARIANTS = {
  info: 'bg-blue-500',
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  default: 'bg-gray-900',
};

const TOAST_ICON_VARIANTS = {
  info: <InfoIcon className="size-4 text-white" />,
  success: <SuccessIcon className="size-4 text-white" />,
  error: <ErrorIcon className="size-4 text-white" />,
  warning: <WarningIcon className="size-4 text-white" />,
  default: <SuccessIcon className="size-4 text-white" />,
};
