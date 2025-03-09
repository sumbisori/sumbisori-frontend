import { SeafoodType } from '@/api/types';
import { IMAGE_PATHS } from '@/constant';

interface Props {
  className?: string;
  grayscale?: boolean;
  seafoodName: SeafoodType;
  variant: 'img' | 'div' | 'text';
}

export const SeafoodImage = ({
  className,
  seafoodName,
  grayscale,
  variant = 'div',
}: Props) => {
  if (variant === 'img') {
    return (
      <img
        src={`${IMAGE_PATHS.SEAFOOD}/${seafoodName}.svg`}
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
          backgroundImage: `url(${IMAGE_PATHS.SEAFOOD}/${seafoodName}.svg)`,
        }}
        id={`seafood-${seafoodName}`}
      ></div>
    );
  }

  if (variant === 'text') {
    return `${IMAGE_PATHS.SEAFOOD}/${seafoodName}.svg`;
  }
};
