import { Chip } from '@/components/Chip';
import { SumbiBadge } from '@/components/SumbiBadge';
import { useNavigate } from 'react-router-dom';
export const MyPageBadge = () => {
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
        <button className="flex items-center justify-between rounded-lg bg-gray-050 px-4 py-3">
          <p className="text-base font-medium text-black">나의 뱃지</p>
          <p className="text-base font-semibold text-black">
            <span className="text-blue-700">5</span>
            <span className="text-gray-500">/19</span>
          </p>
        </button>
      </div>
    </div>
  );
};
