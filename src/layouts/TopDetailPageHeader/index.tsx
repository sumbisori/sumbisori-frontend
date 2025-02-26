import { useEffect, useState } from 'react';
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
      const maxScroll = 200; // 투명도가 0이 되는 스크롤 위치
      const newOpacity = Math.max(0, 1 - scrollPosition / maxScroll);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="map-controls"
      className="fixed inset-x-0 top-0 z-10 m-auto mt-header-height flex w-full min-w-full-layout max-w-full-layout items-center justify-between px-4"
      style={{ opacity }}
    >
      {onBackClick && (
        <IconButton onClick={onBackClick} className="size-6">
          <LeftIcon className="size-6 text-black" />
        </IconButton>
      )}
      {onCloseClick && (
        <IconButton onClick={onCloseClick}>
          <MdCloseIcon className="size-6 text-black" />
        </IconButton>
      )}
    </div>
  );
};
