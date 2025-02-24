import { IconButton } from '../IconButton';
import LeftIcon from '@/icons/left.svg?react';
import MdCloseIcon from '@/icons/line-md_close.svg?react';

interface Props {
  onBackClick?: () => void;
  onCloseClick?: () => void;
}

export const TopDetailPageHeader = ({ onBackClick, onCloseClick }: Props) => {
  return (
    <div
      id="map-controls"
      className="fixed inset-x-0 top-0 z-10 m-auto mt-header-height flex w-full min-w-full-layout max-w-full-layout items-center justify-between px-4"
    >
      {onBackClick && (
        <IconButton onClick={onBackClick} className="size-6">
          <LeftIcon />
        </IconButton>
      )}
      {onCloseClick && (
        <IconButton onClick={onCloseClick}>
          <MdCloseIcon className="size-6" />
        </IconButton>
      )}
    </div>
  );
};
