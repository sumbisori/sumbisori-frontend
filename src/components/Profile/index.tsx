import { UserInfo } from '../../api/myPage';

interface Props {
  userInfo: UserInfo;
}

export const Profile = ({ userInfo }: Props) => {
  return (
    <div className="flex gap-3 px-[18px] pb-[18px]">
      <img
        src={userInfo.profileImageUrl}
        alt="profile"
        className="size-[72px] rounded-full border-2 border-gray-500"
      />
      <div className="flex flex-col items-start self-center">
        <div className="text-[20px] font-semibold">{userInfo.nickname} 님</div>
        <div className="text-[14px]">채취 횟수 : {userInfo.count}</div>
      </div>
    </div>
  );
};
