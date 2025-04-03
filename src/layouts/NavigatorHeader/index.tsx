import ThinLeftIcon from '@/icons/thin-left-icon.svg?react';
import ThinCloseIcon from '@/icons/thin-close-icon.svg?react';
import { useHeaderVisibility } from '@/contexts/src/HeaderVisibilityContext';
import { StepBar } from '@/pages/JournalCreate/StepBar';

interface NavigatorHeaderProps {
  title: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  stepBar?: {
    current: number;
    total: number;
  };
}

export const NavigatorHeader = ({
  title,
  onLeftClick,
  onRightClick,
  leftIcon = <ThinLeftIcon />,
  rightIcon = <ThinCloseIcon />,
  className,
  stepBar,
}: NavigatorHeaderProps) => {
  return (
    <div
      className={clsx(
        'fixed inset-x-0 top-0 z-10 m-auto w-full min-w-full-layout max-w-full-layout',
        className,
      )}
    >
      <div className="flex h-header-height items-center justify-between px-4 transition-transform duration-300 ease-in-out">
        {onLeftClick ? (
          <button
            className="flex size-6 items-center gap-2 hover:text-gray-500 active:text-gray-500"
            onClick={onLeftClick}
          >
            {leftIcon}
          </button>
        ) : (
          <div className="size-6" />
        )}
        <div className="flex-1 text-center text-lg font-semibold">{title}</div>
        {onRightClick ? (
          <button
            className="flex size-6 items-center gap-2 hover:text-gray-500 active:text-gray-500"
            onClick={onRightClick}
          >
            {rightIcon}
          </button>
        ) : (
          <div className="size-6" />
        )}
      </div>
      {stepBar && (
        <div className="px-4 pt-2">
          <StepBar current={stepBar.current} total={stepBar.total} />
        </div>
      )}
    </div>
  );
};
