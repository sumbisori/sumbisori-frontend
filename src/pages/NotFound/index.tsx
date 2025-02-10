import { IconButton } from '@/components/IconButton';
import { useNavigate } from 'react-router-dom';
import LeftIcon from '@/icons/left.svg?react';
import HomeIcon from '@/icons/home.svg?react';

import { ImageWithTextAlert } from '@/components/ImageWithTextAlert';
import { IMAGE_PATHS } from '@/constant';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen">
      <div
        id="map-controls2"
        className="absolute left-0 top-[3.75rem] z-200 flex w-full items-center justify-between gap-2 px-4"
      >
        <IconButton onClick={() => navigate(-1)} className="size-6">
          <LeftIcon />
        </IconButton>
        <IconButton onClick={() => navigate('/home')} className="size-6">
          <HomeIcon />
        </IconButton>
      </div>
      <ImageWithTextAlert
        src={`${IMAGE_PATHS.ROOT}/haenyeo_sad.png`}
        alt="해녀"
        text="페이지를 찾을 수 없습니다"
      />
    </div>
  );
};
