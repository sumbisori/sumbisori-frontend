import Skeleton from '@/components/Skeleton';
import { Divider } from '@/components/Divider';

export const MyPageSkeleton = () => {
  return (
    <div className="flex flex-col">
      {/* 프로필 섹션 스켈레톤 */}
      <div className="flex items-center gap-4 p-4">
        <Skeleton variant="circle" width={80} height={80} />
        <div className="flex flex-col gap-2">
          <Skeleton variant="text" width={120} height={24} />
        </div>
      </div>

      <Divider height={3} color="bg-gray-050" />

      {/* 뱃지 섹션 스켈레톤 */}
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton variant="text" width={100} height={24} />
            <Skeleton variant="text" width={140} height={20} />
          </div>
          <Skeleton variant="circle" width={60} height={60} />
        </div>
        <Skeleton variant="text" width={'100%'} height={40} />
      </div>

      <Divider height={3} color="bg-gray-050" />

      {/* 컨텐츠 섹션 스켈레톤 */}
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <Skeleton variant="square" width="100%" height={60} />
          <Skeleton variant="square" width="100%" height={60} />
          <Skeleton variant="square" width="100%" height={60} />
          <Skeleton variant="square" width="100%" height={60} />
        </div>
      </div>
    </div>
  );
};
