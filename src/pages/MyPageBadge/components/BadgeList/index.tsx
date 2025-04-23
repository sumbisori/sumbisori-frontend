import { Badge } from '@/api/myPageBadge/types';
import { ImageWithTextAlert } from '@/components/ImageWithTextAlert';
import Skeleton from '@/components/Skeleton';
import { SumbiBadge } from '@/components/SumbiBadge';
import { IMAGE_PATHS } from '@/constant';
import { parseBadgeType } from '@/util/parseBadgeType';

interface Props {
  isPending: boolean;
  isError: boolean;
  badgeList: Badge[];
  onBadgeClick: (badge: Badge) => void;
}

export const BadgeList = ({
  isPending,
  isError,
  badgeList,
  onBadgeClick,
}: Props) => {
  if (isPending) {
    return (
      <div className="grid grid-cols-3 gap-y-12">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-4">
            <Skeleton
              className="aspect-square"
              variant="circle"
              width={64}
              height={64}
            />
            <Skeleton width={70} />
          </div>
        ))}
      </div>
    );
  }

  if (isError || !badgeList) {
    return (
      <ImageWithTextAlert
        src={`${IMAGE_PATHS.ROOT}/haenyeo_sad.png`}
        alt="정보없음"
        text="배지를 불러오는 중 문제가 발생했습니다."
      />
    );
  }

  if (badgeList.length === 0) {
    return (
      <ImageWithTextAlert
        src={`${IMAGE_PATHS.ROOT}/haenyeo_sad.png`}
        alt="정보없음"
        text="배지가 없습니다."
      />
    );
  }

  return (
    <div className="grid grid-cols-3 gap-y-12">
      {badgeList.map((badge) => (
        <button
          key={badge.badgeId}
          className={clsx(
            'flex flex-col items-center gap-4',
            !badge.isAcquired && 'cursor-default',
          )}
          onClick={() => {
            if (!badge.isAcquired) return;
            onBadgeClick(badge);
          }}
        >
          <SumbiBadge
            type={
              badge.isAcquired
                ? parseBadgeType(badge.badgeType, badge.badgeLevel)
                : 'default'
            }
          />
          <p className="text-sm">{badge.badgeName}</p>
        </button>
      ))}
    </div>
  );
};
