import ThinLeftIcon from '@/icons/thin-left-icon.svg?react';
import ThinCloseIcon from '@/icons/thin-close-icon.svg?react';
import { useHeaderVisibility } from '@/contexts/src/HeaderVisibilityContext';
import { StepBar } from '@/pages/JournalCreate/StepBar';

interface NavigatorHeaderProps {
  title: string;
  onBackClick?: () => void;
  onCloseClick?: () => void;
  className?: string;
  stepBar?: {
    current: number;
    total: number;
  };
}

export const NavigatorHeader = ({
  title,
  onBackClick,
  onCloseClick,
  className,
  stepBar,
}: NavigatorHeaderProps) => {
  return (
    <>
      <div
        className={clsx(
          'fixed inset-x-0 top-0 z-10 m-auto flex h-header-height w-full min-w-full-layout max-w-full-layout items-center justify-between px-4 transition-transform duration-300 ease-in-out',
          className,
        )}
      >
        {onBackClick && (
          <button
            className="flex size-6 items-center gap-2 hover:text-gray-500 active:text-gray-500"
            onClick={onBackClick}
          >
            <ThinLeftIcon />
          </button>
        )}
        {!onBackClick && <div className="size-6" />}
        <div className="flex-1 text-center text-lg font-semibold">{title}</div>
        {onCloseClick && (
          <button
            className="flex size-6 items-center gap-2 hover:text-gray-500 active:text-gray-500"
            onClick={onCloseClick}
          >
            <ThinCloseIcon />
          </button>
        )}
        {!onCloseClick && <div className="size-6" />}
      </div>
      {stepBar && (
        <div className="px-4 pt-2">
          <StepBar current={stepBar.current} total={stepBar.total} />
        </div>
      )}
    </>
  );
};
