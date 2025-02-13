import Skeleton from '../../../../components/Skeleton';

export const HomeYoutubeSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="aspect-video" height={'auto'} />
      <div className="flex flex-col gap-1">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
    </div>
  );
};
