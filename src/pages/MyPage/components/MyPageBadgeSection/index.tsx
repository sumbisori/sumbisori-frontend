import { Chip } from '@/components/Chip';
import { SumbiBadge } from '@/components/SumbiBadge';
import { routes } from '@/routes/src/routes';
import { useNavigate } from 'react-router-dom';
import ArrowRightIcon from '@/icons/arrow_right.svg?react';

export const MyPageBadgeSection = () => {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-5">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 pl-2">
            <div className="flex items-center gap-1">
              <h5 className="text-xl font-semibold text-black">혼저옵서예</h5>
              <Chip type="primary">대표배지</Chip>
            </div>
            <p className="text-sm text-black">해녀의 초대장이 도착했어요</p>
          </div>
          <SumbiBadge type="gold" />
        </div>
        <button
          onClick={() => navigate(routes.myPageBadge)}
          className="flex items-center justify-between rounded-lg bg-gray-050 px-4 py-3 hover:bg-gray-100 active:bg-gray-100"
        >
          <p className="text-base font-medium text-black">나의 배지</p>
          <div className="flex items-center gap-2 text-base font-semibold text-black">
            <div>
              <span className="text-blue-700">5</span>
              <span className="text-gray-500">/19</span>
            </div>
            <ArrowRightIcon className="size-3 text-gray-700" />
          </div>
        </button>
      </div>
    </div>
  );
};
