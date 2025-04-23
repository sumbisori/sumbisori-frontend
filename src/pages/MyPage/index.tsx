import { useEffect, useState } from 'react';
import { MyPageContent } from '@/pages/MyPage/components/MyPageContent';
import { Profile } from '@/pages/MyPage/components/Profile';
import { getUserInfo } from '@/api/myPage';
import { UserInfo } from '@/api/myPage/types';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Divider } from '@/components/Divider';
import { MyPageBadgeSection } from './components/MyPageBadgeSection';

export const MyPage = () => {
  const { handleError } = useErrorHandler();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: '',
    profileImageUrl: '/assets/images/default-profile.webp',
    badgeName: '',
    badgeType: 'BASIC',
    badgeDescription: '',
    level: 0,
    totalBadgeCount: 0,
    acquiredBadgeCount: 0,
  });

  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo();
      setUserInfo(response);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

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
