import { useState } from 'react';
import OutlinePictureIcon from '@/icons/outline-picture.svg?react';
import clsx from 'clsx';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Image = ({ className, ...props }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <>
      {(isLoading || hasError) && (
        <div className={clsx('flex items-center justify-center', className)}>
          <OutlinePictureIcon />
        </div>
      )}

      {!isLoading && !hasError && (
        <img
          {...props}
          className={clsx(className)}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* 숨겨진 img 태그로 로딩 및 에러 감지용 */}
      <img
        {...props}
        className="hidden"
        onLoad={handleLoad}
        onError={handleError}
      />
    </>
  );
};
