import { ProfileBadgeSection } from './components/ProfileBadgeSection';
import { BadgeCount } from './components/BadgeCount';
import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/Toast';
import { getMyPageBadge } from '@/api/myPageBadge';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/query';
import { parseBadgeType } from '@/util/parseBadgeType';
import { SumbiBadge } from '@/components/SumbiBadge';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { useState } from 'react';
import { Badge } from '@/api/myPageBadge/types';
import { BadgeInfoBottomSheet } from './components/BadgeInfoBottomSheet';

export const MyPageBadge = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const { data: badgeList } = useQuery<Badge[]>({
    queryKey: [queryKeys.myPageBadge],
    queryFn: getMyPageBadge,
  });

  return (
    <>
      <div className="relative flex h-full min-h-layout-nav-height flex-col pt-header-height">
        <NavigatorHeader
          title="활동"
          onLeftClick={() => navigate(-1)}
          onRightClick={() => toast.info('준비중입니다.')}
          className="bg-gray-100 shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)]"
        />
        <div className="flex flex-1 flex-col gap-3 bg-gray-100 p-5">
          <div className="flex flex-col gap-8">
            <ProfileBadgeSection imageUrl="" />
            <BadgeCount />
          </div>
          <div className="grid grid-cols-3 gap-y-12 rounded-lg bg-white p-6">
            {badgeList?.map((badge) => (
              <button
                key={badge.badgeType}
                className={clsx(
                  'flex flex-col items-center gap-4',
                  !badge.isAcquired && 'cursor-default',
                )}
                onClick={() => {
                  setSelectedBadge(badge);
                  setOpen(true);
                }}
              >
                <SumbiBadge
                  type={
                    badge.isAcquired
                      ? parseBadgeType(badge.badgeType)
                      : 'default'
                  }
                />
                <p className="text-sm">{badge.badgeName}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      {selectedBadge && (
        <BadgeInfoBottomSheet
          open={open}
          setOpen={setOpen}
          selectedBadge={selectedBadge}
        />
      )}
    </>
  );
};
