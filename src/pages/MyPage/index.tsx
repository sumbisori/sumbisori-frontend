import { MyPageContent } from '@/pages/MyPage/components/MyPageContent';
import { Profile } from '@/pages/MyPage/components/Profile';
import { getUserInfo } from '@/api/myPage';
import { UserInfo } from '@/api/myPage/types';
import { Divider } from '@/components/Divider';
import { MyPageBadgeSection } from './components/MyPageBadgeSection';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/query';
import { Navigate } from 'react-router-dom';
import { routes } from '@/routes/src/routes';
import { Spinner } from '@/components/Spinner';
import { MyPageSkeleton } from './components/MyPageSkeleton';

export const MyPage = () => {
  const {
    data: userInfo,
    isPending,
    isError,
  } = useQuery<UserInfo>({
    queryKey: [queryKeys.myPage],
    queryFn: getUserInfo,
  });

  if (isPending) {
    return <MyPageSkeleton />;
  }

  if (isError) {
    return <Navigate to={routes['not-found']} replace />;
  }

  return (
    <div className="flex flex-col">
      <Profile userInfo={userInfo} />
      <Divider height={3} color="bg-gray-050" />
      <MyPageBadgeSection
        badgeName={userInfo.badgeName}
        badgeType={userInfo.badgeType}
        badgeDescription={userInfo.badgeDescription}
        level={userInfo.level}
        totalBadgeCount={userInfo.totalBadgeCount}
        acquiredBadgeCount={userInfo.acquiredBadgeCount}
      />
      <Divider height={3} color="bg-gray-050" />
      <MyPageContent />
    </div>
  );
};
