import { BadgeColorType } from '@/api/myPageBadge/types';
import GoldBadgeIcon from '@/icons/badges/gold-badge.svg?react';
import SilverBadgeIcon from '@/icons/badges/silver-badge.svg?react';
import BronzeBadgeIcon from '@/icons/badges/bronze-badge.svg?react';
import GreenBadgeIcon from '@/icons/badges/green-badge.svg?react';
import PurpleBadgeIcon from '@/icons/badges/purple-badge.svg?react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import BadgeCheckIcon from '@/icons/badges/check.svg?react';
import { Image } from '../Image';
import { useMemo } from 'react';
interface Props {
  size?: 'small' | 'large';
  type: BadgeColorType;
  className?: string;
  enableAnimation?: boolean;
  backLevelDescriptionText?: string;
  backAcquisitionDateText?: string;
  initialFlip?: boolean;
  isFlipped?: boolean;
  onFlip?: () => void;
  isRepresentative?: boolean;
}

export const SumbiBadge = ({
  size = 'small',
  type,
  className,
  enableAnimation = false,
  backLevelDescriptionText = '0개 채취',
  backAcquisitionDateText = '2025-01-01',
  initialFlip = false,
  isFlipped = false,
  onFlip,
  isRepresentative = false,
}: Props) => {
  const RANKED = useMemo(() => {
    return type === 'gold' || type === 'silver' || type === 'bronze';
  }, [type]);

  const handleClick = () => {
    if (!initialFlip && type !== 'default' && onFlip) {
      onFlip();
    }
  };

  const BadgeContent = (
    <div
      className={clsx(
        'relative flex items-center justify-center',
        RANKED && size === 'large' ? 'size-full' : 'size-4/6',
      )}
    >
      {type === 'default' && '?'}
      {type !== 'default' && <BadgeIcon type={type} size={size} />}
      {isRepresentative && !['default'].includes(type) && (
        <BadgeCheckIcon className="absolute -right-4 -top-4 size-6 text-blue-700" />
      )}
    </div>
  );

  if (!enableAnimation || type === 'default') {
    return (
      <div
        className={clsx(
          'flex shrink-0 items-center justify-center rounded-full',
          SIZE_VARIANTS[size],
          BORDER_SIZE_VARIANTS[size],
          isRepresentative && !['default'].includes(type)
            ? 'border-blue-700'
            : TYPE_VARIANTS[type],
          className,
        )}
      >
        {BadgeContent}
      </div>
    );
  }

  return (
    <div
      style={{
        perspective: 1000,
        position: 'relative',
        zIndex: isFlipped ? 100 : '',
      }}
      className={clsx(className, initialFlip ? '' : 'cursor-pointer')}
      onClick={handleClick}
    >
      <motion.div
        className={clsx('relative rounded-full', SIZE_VARIANTS[size])}
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isFlipped || initialFlip ? 180 : 0,
          scale: isFlipped ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 20,
          duration: 0.8,
        }}
      >
        {/* 앞면 */}
        <div
          className={clsx(
            'absolute flex size-full items-center justify-center rounded-full',
            RANKED && size === 'large' ? '' : BORDER_SIZE_VARIANTS[size],
            isRepresentative && !['default'].includes(type)
              ? 'border-blue-700'
              : TYPE_VARIANTS[type],
          )}
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          {BadgeContent}
        </div>

        {/* 뒷면 */}
        <div
          className={clsx(
            'absolute flex size-full items-center justify-center rounded-full',
            BORDER_SIZE_VARIANTS[size],
            isRepresentative && !['default'].includes(type)
              ? 'border-blue-700'
              : BACK_TYPE_VARIANTS[type],
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex flex-col items-center gap-1">
            <p className="text-center text-base font-semibold">
              {backLevelDescriptionText}
            </p>
            <p className="text-center text-sm font-medium">
              {backAcquisitionDateText}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const BadgeIcon = ({
  type,
  size,
}: {
  type: BadgeColorType;
  size: 'small' | 'large';
}) => {
  switch (type) {
    case 'gold':
      if (size === 'small') {
        return <GoldBadgeIcon className="size-full" />;
      }
      return <Image src="/assets/images/badges/Medal_Gold.gif" />;
    case 'silver':
      if (size === 'small') {
        return <SilverBadgeIcon className="size-full" />;
      }
      return <Image src="/assets/images/badges/Medal_Silver.gif" />;
    case 'bronze':
      if (size === 'small') {
        return <BronzeBadgeIcon className="size-full" />;
      }
      return <Image src="/assets/images/badges/Medal_Bronze.gif" />;
    case 'green':
      return <GreenBadgeIcon className="size-full" />;
    case 'purple':
      return <PurpleBadgeIcon className="size-full" />;
    default:
      return null;
  }
};

const TYPE_VARIANTS = {
  gold: 'border-yellow-500 bg-yellow-050 text-yellow-500',
  silver: 'border-gray-500 bg-gray-050 text-gray-500',
  bronze: 'border-redbrown-500 bg-redbrown-050 text-redbrown-500',
  green: 'border-green-500 bg-green-050 text-green-500',
  purple: 'border-violet-500 bg-violet-050 text-violet-500',
  default:
    'border-gray-300 bg-gray-050 flex items-center justify-center text-2xl font-medium text-gray-400',
};

const BACK_TYPE_VARIANTS = {
  gold: 'border-yellow-500 bg-yellow-050 text-yellow-900',
  silver: 'border-gray-500 bg-gray-050 text-gray-900',
  bronze: 'border-redbrown-500 bg-redbrown-050 text-redbrown-900',
  green: 'border-green-500 bg-green-050 text-green-900',
  purple: 'border-violet-500 bg-violet-050 text-violet-900',
  default:
    'border-gray-300 bg-gray-050 flex items-center justify-center text-2xl font-medium text-gray-900',
};

const SIZE_VARIANTS = {
  small: 'size-16',
  large: 'size-32',
};

const BORDER_SIZE_VARIANTS = {
  small: 'border-2',
  large: 'border-4',
};
