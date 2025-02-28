import { useEffect, useMemo, useState } from 'react';
import { IconButton } from '@/components/IconButton';
import LeftIcon from '@/icons/left.svg?react';
import MdCloseIcon from '@/icons/line-md_close.svg?react';

interface Props {
  onBackClick?: () => void;
  onCloseClick?: () => void;
}

export const TopDetailPageHeader = ({ onBackClick, onCloseClick }: Props) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 200;
      const newOpacity = Math.max(0, 1 - scrollPosition / maxScroll);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isButtonTransparent = useMemo(() => opacity === 0, [opacity]);

  const handleBackClick = () => {
    if (isButtonTransparent) return;
    onBackClick?.();
  };

  const handleCloseClick = () => {
    if (isButtonTransparent) return;
    onCloseClick?.();
  };

  return (
    <div
      id="map-controls"
      className="fixed inset-x-0 top-0 z-10 m-auto mt-header-height flex w-full min-w-full-layout max-w-full-layout items-center justify-between px-4"
      style={{ opacity }}
    >
      {onBackClick && (
        <IconButton
          onClick={handleBackClick}
          className={clsx(
            isButtonTransparent ? 'cursor-default' : 'cursor-pointer',
          )}
        >
          <LeftIcon className="size-6 text-black" />
        </IconButton>
      )}
      {onCloseClick && (
        <IconButton
          onClick={handleCloseClick}
          className={clsx(
            isButtonTransparent ? 'cursor-default' : 'cursor-pointer',
          )}
        >
          <MdCloseIcon className="size-6 text-black" />
        </IconButton>
      )}
    </div>
  );
};
