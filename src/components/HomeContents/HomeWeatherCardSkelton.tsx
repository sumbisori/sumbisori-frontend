import Skeleton from '../Skeleton';

export const HomeWeatherCardSkelton = () => {
  return (
    <div className="flex flex-col items-center gap-1">
      <Skeleton height={'70px'} />
      <Skeleton variant="text" width={'40px'} />
    </div>
  );
};
