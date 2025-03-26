import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import ThinLeftIcon from '@/icons/thin-left-icon.svg?react';
import BellBlackIcon from '@/icons/Icon_bell_black.svg?react';

import { useNavigate } from 'react-router-dom';
import { routes } from '@/routes/src/routes';
import { toast } from '@/components/Toast';

export const JournalDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full min-h-layout-nav-height flex-col pt-header-height">
      <NavigatorHeader
        title="체험 일지"
        leftIcon={<ThinLeftIcon />}
        rightIcon={<BellBlackIcon />}
        onLeftClick={() => navigate(routes.myPage)}
        onRightClick={() => toast.info('준비중입니다.')}
        className="bg-white shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)]"
      />
      <div className="flex flex-1 flex-col bg-gray-050 pb-[4.5rem]">
        <div className="flex flex-1 flex-col gap-4 px-4 pt-6"></div>
      </div>
    </div>
  );
};
