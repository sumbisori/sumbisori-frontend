import { MyPageContent } from '../../components/MyPageContent';
import { Profile } from '../../components/Profile';

export const MyPage = () => {
  return (
    <div className="flex flex-col">
      <Profile profileName="김해녀" seafoodCount={10} />
      <div className="h-[5px] w-full bg-[#F7F7FA]"></div>
      <MyPageContent />
    </div>
  );
};
