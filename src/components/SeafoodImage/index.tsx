import { SeafoodType } from '@/api/types';
import { IMAGE_PATHS } from '@/constant';
import { Image } from '../Image';

interface Props {
  className?: string;
  grayscale?: boolean;
  seafoodName: SeafoodType;
  variant: 'img' | 'div' | 'text';
  fileType?: 'png' | 'svg';
}

export const SeafoodImage = ({
  className,
  seafoodName,
  grayscale,
  variant = 'div',
  fileType = 'png',
}: Props) => {
  if (variant === 'img') {
    return (
      <Image
        src={`${IMAGE_PATHS.SEAFOOD}/${seafoodName}.${fileType}`}
        alt={seafoodName}
        className={clsx(className, grayscale ? 'grayscale' : '')}
        id={`seafood-${seafoodName}`}
      />
    );
  }

  if (variant === 'div') {
    return (
      <div
        className={clsx(
          'relative self-center bg-cover bg-center bg-no-repeat',
          className,
          grayscale ? 'grayscale' : '',
        )}
        style={{
          backgroundImage: `url(${IMAGE_PATHS.SEAFOOD}/${seafoodName}.${fileType})`,
        }}
        id={`seafood-${seafoodName}`}
      ></div>
    );
  }

  if (variant === 'text') {
    return `${IMAGE_PATHS.SEAFOOD}/${seafoodName}.${fileType}`;
  }
};
