import { ProfileBadgeSection } from './components/ProfileBadgeSection';
import { BadgeCount } from './components/BadgeCount';
import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import { useNavigate } from 'react-router-dom';
import { getMyPageBadge } from '@/api/myPageBadge';
import { useState } from 'react';
import { Badge } from '@/api/myPageBadge/types';
import { BadgeInfoBottomSheet } from './components/BadgeInfoBottomSheet';
import { BadgeList } from './components/BadgeList';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/query';
import { UserInfo } from '@/api/myPage/types';
import { getUserInfo } from '@/api/myPage';

export const MyPageBadge = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const {
    data: userInfo,
    isPending: userInfoPending,
    isError: userInfoError,
  } = useQuery<UserInfo>({
    queryKey: [queryKeys.myPage],
    queryFn: getUserInfo,
  });

  const {
    data: badgeList,
    isPending: badgeListPending,
    isError: badgeListError,
  } = useQuery<Badge[]>({
    queryKey: [queryKeys.myPageBadge],
    queryFn: getMyPageBadge,
  });

  return (
    <>
      <NavigatorHeader
        title="배지"
        onLeftClick={() => navigate(-1)}
        className="bg-gray-100 shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)]"
      />
      <div className="relative flex h-full min-h-layout-nav-height flex-col pt-header-height">
        <div className="flex flex-1 flex-col gap-3 bg-gray-100 p-5">
          <div className="flex flex-col gap-8">
            <ProfileBadgeSection
              userInfo={userInfo}
              isPending={userInfoPending}
              isError={userInfoError}
            />
            <BadgeCount
              count={userInfo?.acquiredBadgeCount || 0}
              total={userInfo?.totalBadgeCount || 0}
            />
          </div>
          <div className="flex-1 rounded-lg bg-white p-6">
            <BadgeList
              badgeList={badgeList || []}
              onBadgeClick={(badge) => {
                setSelectedBadge(badge);
                setOpen(true);
              }}
              isPending={badgeListPending}
              isError={badgeListError}
            />
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
