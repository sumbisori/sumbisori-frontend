import { useEffect, useState } from 'react';
import { MyPageContent } from '../../components/MyPageContent';
import { Profile } from '../../components/Profile';
import { UserInfo, getUserInfo } from '../../api/myPage';

export const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: '',
    count: 0,
  });

  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo();
      setUserInfo(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="flex flex-col">
      <Profile profileName={userInfo.nickname} seafoodCount={userInfo.count} />
      <div className="h-[5px] w-full bg-[#F7F7FA]"></div>
      <MyPageContent />
    </div>
  );
};
