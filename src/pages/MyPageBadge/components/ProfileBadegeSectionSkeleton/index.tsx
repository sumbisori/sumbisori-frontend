import Skeleton from '@/components/Skeleton';
import { Chip } from '@/components/Chip';

export const ProfileBadgeSectionSkeleton = () => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-1">
        <Skeleton
          variant="circle"
          width={72}
          height={72}
          className="border-2 border-gray-500"
        />
        <Skeleton width={60} height={16} className="mx-auto" />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 pl-2">
            <Chip type="secondary">대표배지</Chip>
            <div className="flex flex-col gap-1">
              <Skeleton width={120} height={24} />
              <Skeleton width={200} height={16} />
            </div>
          </div>
          <Skeleton variant="circle" width={72} height={72} />
        </div>
      </div>
    </div>
  );
};
