import { useEffect, useState } from 'react';
import { MyPageContent } from '@/pages/MyPage/components/MyPageContent';
import { Profile } from '@/pages/MyPage/components/Profile';
import { getUserInfo } from '@/api/myPage';
import { UserInfo } from '@/api/myPage/types';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Divider } from '@/components/Divider';
import { MyPageBadge } from './components/MyPageBadge';

export const MyPage = () => {
  const { handleError } = useErrorHandler();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: '',
    count: 0,
    profileImageUrl: '/assets/images/default-profile.webp',
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
      <MyPageBadge />
      <Divider height={3} color="bg-gray-050" />
      <MyPageContent />
    </div>
  );
};
