import ThinLeftIcon from '@/icons/thin-left-icon.svg?react';
import ThinCloseIcon from '@/icons/thin-close-icon.svg?react';
import { useHeaderVisibility } from '@/contexts/src/HeaderVisibilityContext';

interface NavigatorHeaderProps {
  title: string;
  onBackClick?: () => void;
  onCloseClick?: () => void;
}

export const NavigatorHeader = ({
  title,
  onBackClick,
  onCloseClick,
}: NavigatorHeaderProps) => {
  const { showHeader } = useHeaderVisibility();

  return (
    <div
      className={clsx(
        'fixed inset-x-0 top-0 z-10 m-auto flex h-header-height w-full min-w-full-layout max-w-full-layout items-center justify-between bg-white px-5 transition-transform duration-300 ease-in-out',

        {
          'translate-y-0': showHeader,
          '-translate-y-full': !showHeader,
        },
      )}
    >
      {onBackClick && (
        <button
          className="flex size-6 items-center gap-2"
          onClick={onBackClick}
        >
          <ThinLeftIcon />
        </button>
      )}
      {!onBackClick && <div className="size-6" />}
      <div className="flex-1 text-center text-lg font-semibold">{title}</div>
      {onCloseClick && (
        <button
          className="flex size-6 items-center gap-2"
          onClick={onCloseClick}
        >
          <ThinCloseIcon />
        </button>
      )}
      {!onCloseClick && <div className="size-6" />}
    </div>
  );
};
