import { IconButton } from '@/components/IconButton';
import { useNavigate } from 'react-router-dom';
import LeftIcon from '@/icons/left.svg?react';
import HomeIcon from '@/icons/home.svg?react';
import { ImageWithTextAlert } from '@/components/ImageWithTextAlert';
import { IMAGE_PATHS } from '@/constant';
import { routes } from '@/routes/src/routes';
import { MobileLayout } from '@/layouts/MobileLayout';

interface Props {
  resetErrorBoundary?: () => void;
  type?: 'not-found' | 'error';
}

export const ErrorPage = ({ resetErrorBoundary, type = 'error' }: Props) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    }
    navigate(-1);
  };

  const handleHome = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    }
    navigate(routes.home);
  };

  const text =
    type === 'not-found'
      ? '404 Not Found \n 페이지를 찾을 수 없습니다'
      : '에러가 발생했습니다. \n 잠시 후 다시 시도해주세요';

  return (
    <MobileLayout>
      <div className="relative h-screen">
        <div
          id="map-controls2"
          className="absolute left-0 top-header-height z-200 flex w-full items-center justify-between gap-2 px-4"
        >
          <IconButton onClick={handleBack}>
            <LeftIcon className="size-6" />
          </IconButton>
          <IconButton onClick={handleHome}>
            <HomeIcon className="size-6" />
          </IconButton>
        </div>
        <ImageWithTextAlert
          src={`${IMAGE_PATHS.ROOT}/haenyeo_sad.png`}
          alt="해녀"
          text={text}
        />
      </div>
    </MobileLayout>
  );
};
