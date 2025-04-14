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

export const MyPageBadge = () => {
  const navigate = useNavigate();
  const { data: badgeList } = useQuery({
    queryKey: [queryKeys.myPageBadge],
    queryFn: getMyPageBadge,
  });

  return (
    <div className="relative flex h-full min-h-layout-nav-height flex-col pt-header-height">
      <NavigatorHeader
        title="체험 일지"
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
            <div
              key={badge.badgeType}
              className="flex flex-col items-center gap-4"
            >
              <SumbiBadge type={parseBadgeType(badge.badgeType)} />
              <p className="text-sm">{badge.badgeName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
