import { Chip } from '@/components/Chip';
import { Image } from '@/components/Image';
import { SumbiBadge } from '@/components/SumbiBadge';
import { UserInfo } from '@/api/myPage/types';
import { parseBadgeType } from '@/util/parseBadgeType';
import { ProfileBadgeSectionSkeleton } from '../ProfileBadegeSectionSkeleton';
import { Navigate } from 'react-router-dom';
import { routes } from '@/routes/src/routes';
interface Props {
  userInfo?: UserInfo;
  isPending: boolean;
  isError: boolean;
}

export const ProfileBadgeSection = ({
  userInfo,
  isPending,
  isError,
}: Props) => {
  if (isPending) {
    return <ProfileBadgeSectionSkeleton />;
  }

  if (isError || !userInfo) {
    return <Navigate to={routes['not-found']} replace />;
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-1">
        <Image
          src={userInfo.profileImageUrl}
          alt="profile"
          className="size-custom-72px-spacer rounded-full border-2 border-gray-500"
        />
        <p className="text-center text-xs font-semibold">
          {userInfo.nickname} 님
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 pl-2">
            <Chip type="secondary">대표배지</Chip>
            <div className="flex flex-col gap-1">
              <h5 className="text-xl font-semibold text-black">
                {userInfo.badgeName}
              </h5>
              <p className="text-sm text-black">{userInfo.badgeDescription}</p>
            </div>
          </div>
          <SumbiBadge
            type={parseBadgeType(userInfo.badgeType, userInfo.level)}
          />
        </div>
      </div>
    </div>
  );
};
