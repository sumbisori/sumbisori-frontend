import { BadgeColorType } from '@/api/myPageBadge/types';
import GoldBadgeIcon from '@/icons/badges/gold-badge.svg?react';
import SilverBadgeIcon from '@/icons/badges/silver-badge.svg?react';
import BronzeBadgeIcon from '@/icons/badges/bronze-badge.svg?react';
import GreenBadgeIcon from '@/icons/badges/green-badge.svg?react';
import PurpleBadgeIcon from '@/icons/badges/purple-badge.svg?react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

interface Props {
  size?: 'small' | 'large';
  type: BadgeColorType;
  className?: string;
  enableAnimation?: boolean;
  backLevelDescriptionText?: string;
  backAcquisitionDateText?: string;
  initialFlip?: boolean;
  open?: boolean;
}

export const SumbiBadge = ({
  size = 'small',
  type,
  className,
  enableAnimation = false,
  backLevelDescriptionText = '0개 채취',
  backAcquisitionDateText = '2025-01-01',
  initialFlip = false,
  open = true,
}: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (!open) {
      setIsFlipped(false);
    }
  }, [open]);

  const handleClick = () => {
    if (!initialFlip && type !== 'default') {
      setIsFlipped(!isFlipped);
    }
  };

  const BadgeContent = (
    <div className="flex size-4/6 items-center justify-center">
      {type === 'default' && '?'}
      {type !== 'default' && <BadgeIcon type={type} />}
    </div>
  );

  if (!enableAnimation || type === 'default') {
    return (
      <div
        className={clsx(
          'flex shrink-0 items-center justify-center rounded-full',
          SIZE_VARIANTS[size],
          BORDER_SIZE_VARIANTS[size],
          TYPE_VARIANTS[type],
          className,
        )}
      >
        {BadgeContent}
      </div>
    );
  }

  return (
    <div
      style={{ perspective: 1000 }}
      className={clsx(className, initialFlip ? '' : 'cursor-pointer')}
      onClick={handleClick}
    >
      <motion.div
        className={clsx('relative rounded-full', SIZE_VARIANTS[size])}
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateY: isFlipped || initialFlip ? 180 : 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          duration: 2,
        }}
      >
        {/* 앞면 */}
        <div
          className={clsx(
            'absolute flex size-full items-center justify-center rounded-full',
            BORDER_SIZE_VARIANTS[size],
            TYPE_VARIANTS[type],
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
            BACK_TYPE_VARIANTS[type],
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

const BadgeIcon = ({ type }: { type: BadgeColorType }) => {
  switch (type) {
    case 'gold':
      return <GoldBadgeIcon className="size-full" />;
    case 'silver':
      return <SilverBadgeIcon className="size-full" />;
    case 'bronze':
      return <BronzeBadgeIcon className="size-full" />;
    case 'green':
      return <GreenBadgeIcon className="size-full" />;
    case 'purple':
      return <PurpleBadgeIcon className="size-full" />;
    default:
      return null;
  }
};

const TYPE_VARIANTS = {
  gold: 'border-yellow-600 bg-yellow-050 text-yellow-600',
  silver: 'border-gray-600 bg-gray-050 text-gray-600',
  bronze: 'border-redbrown-600 bg-redbrown-050 text-redbrown-600',
  green: 'border-green-600 bg-green-050 text-green-600',
  purple: 'border-purple-600 bg-purple-050 text-purple-600',
  default:
    'border-gray-300 bg-gray-050 flex items-center justify-center text-2xl font-medium text-gray-400',
};

const BACK_TYPE_VARIANTS = {
  gold: 'border-yellow-600 bg-yellow-200 text-yellow-900',
  silver: 'border-gray-600 bg-gray-200 text-gray-900',
  bronze: 'border-redbrown-600 bg-redbrown-200 text-redbrown-900',
  green: 'border-green-600 bg-green-200 text-green-900',
  purple: 'border-purple-600 bg-purple-200 text-purple-900',
  default:
    'border-gray-300 bg-gray-200 flex items-center justify-center text-2xl font-medium text-gray-900',
};

const SIZE_VARIANTS = {
  small: 'size-16',
  large: 'size-32',
};

const BORDER_SIZE_VARIANTS = {
  small: 'border-2',
  large: 'border-4',
};
