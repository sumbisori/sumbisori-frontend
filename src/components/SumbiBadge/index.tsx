import { BadgeColorType } from '@/api/myPageBadge/types';

interface Props {
  size?: number;
  type: BadgeColorType;
}

export const SumbiBadge = ({ size = 64, type }: Props) => {
  return (
    <div
      className={clsx('shrink-0 rounded-full', TYPE_VARIANTS[type])}
      style={{
        width: size,
        height: size,
      }}
    >
      {type === 'default' && '?'}
    </div>
  );
};

const TYPE_VARIANTS = {
  gold: 'border-2 border-yellow-600 bg-center bg-no-repeat bg-yellow-050 bg-[url(/assets/images/Badge/gold.png)]',
  silver:
    'border-2 border-blue-600 bg-center bg-no-repeat bg-blue-050 bg-[url(/assets/images/Badge/silver.png)]',
  bronze:
    'border-2 border-redbrown-600 bg-center bg-no-repeat bg-redbrown-050 bg-[url(/assets/images/Badge/bronze.png)]',
  green:
    'border-2 border-green-600 bg-center bg-no-repeat bg-green-050 bg-[url(/assets/images/Badge/green.png)]',
  purple:
    'border-2 border-purple-600 bg-center bg-no-repeat bg-purple-050 bg-[url(/assets/images/Badge/purple.png)]',
  default:
    'border-2 border-gray-300 bg-center bg-no-repeat bg-gray-050 flex items-center justify-center text-2xl font-medium text-gray-400',
};
