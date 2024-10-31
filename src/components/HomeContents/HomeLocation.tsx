import { HomeChangeButton } from './HomeChangeButton';

export const HomeLocation = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-1">
        <img src="/icons/location.svg" />
        <p className="text-[16px]">제주시 한림읍</p>
      </div>
      <div>
        <HomeChangeButton />
      </div>
    </div>
  );
};
