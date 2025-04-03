import { UserInfo } from '@/api/myPage/types';

interface Props {
  userInfo: UserInfo;
}

export const Profile = ({ userInfo }: Props) => {
  return (
    <div className="flex gap-3 p-[1.125rem]">
      <img
        src={userInfo.profileImageUrl}
        alt="profile"
        className="size-[4.5rem] rounded-full border-2 border-gray-500"
      />
      <div className="flex flex-col items-start self-center">
        <div className="text-xl font-semibold">{userInfo.nickname} 님</div>
        <div className="text-sm">채취 횟수 : {userInfo.count}</div>
      </div>
    </div>
  );
};
