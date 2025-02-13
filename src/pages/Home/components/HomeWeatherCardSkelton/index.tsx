import Skeleton from '../../../../components/Skeleton';

export const HomeWeatherCardSkelton = () => {
  return (
    <div className="flex flex-col items-center gap-1">
      <Skeleton height={'70px'} className="rounded-2xl" />
      <Skeleton variant="text" width={'40px'} />
    </div>
  );
};
