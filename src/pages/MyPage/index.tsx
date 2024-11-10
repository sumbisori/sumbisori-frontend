import { useEffect, useState } from 'react';
import { MyPageContent } from '../../components/MyPageContent';
import { Profile } from '../../components/Profile';
import { UserInfo, getUserInfo } from '../../api/myPage';
import { useErrorHandler } from '../../hooks/useErrorHandler';

export const MyPage = () => {
  const { handleError } = useErrorHandler();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: '',
    count: 0,
    profileImageUrl:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
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
      <div className="h-[5px] w-full bg-[#F7F7FA]"></div>
      <MyPageContent />
    </div>
  );
};
