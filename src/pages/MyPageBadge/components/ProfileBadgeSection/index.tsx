import { Chip } from '@/components/Chip';
import { Image } from '@/components/Image';
import { SumbiBadge } from '@/components/SumbiBadge';

interface Props {
  imageUrl: string;
}

export const ProfileBadgeSection = ({ imageUrl }: Props) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-1">
        <Image
          src={imageUrl}
          alt="profile"
          className="size-custom-72px-spacer rounded-full border-2 border-gray-500"
        />
        <p className="text-center text-xs font-semibold">숨비 님</p>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 pl-2">
            <Chip type="secondary">대표배지</Chip>
            <div className="flex flex-col gap-1">
              <h5 className="text-xl font-semibold text-black">혼저옵서예</h5>
              <p className="text-sm text-black">해녀의 초대장이 도착했어요</p>
            </div>
          </div>
          <SumbiBadge type="gold" />
        </div>
      </div>
    </div>
  );
};
