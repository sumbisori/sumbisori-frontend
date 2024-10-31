interface Props {
  profileName: string;
  seafoodCount: number;
}

export const Profile = ({ profileName, seafoodCount }: Props) => {
  return (
    <div className="flex gap-2 px-[18px] pb-[18px]">
      <img src="/icons/profile.svg" alt="profile" />
      <div className="flex flex-col items-start self-center">
        <div className="text-[20px] font-semibold">{profileName} 님</div>
        <div className="text-[14px]">채취 횟수 : {seafoodCount}</div>
      </div>
    </div>
  );
};
