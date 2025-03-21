import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import ThinLeftIcon from '@/icons/thin-left-icon.svg?react';
import BellBlackIcon from '@/icons/Icon_bell_black.svg?react';
import { LargeButton } from '@/components/LargeButton';

export const Journals = () => {
  return (
    <div className="relative flex h-full min-h-layout-nav-height flex-col pt-header-height">
      <NavigatorHeader
        title="체험 일지"
        leftIcon={<ThinLeftIcon />}
        rightIcon={<BellBlackIcon />}
        onLeftClick={() => console.log('back')}
        onRightClick={() => console.log('close')}
        className="bg-white shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1)]"
      />
      <div className="flex flex-1 flex-col bg-gray-050 pb-[4.5rem]">
        <div className="flex-1">안녕하세요</div>
        <div className="fixed inset-x-0 bottom-nav-height z-10 m-auto flex w-full min-w-full-layout max-w-full-layout px-5 pb-5 pt-3">
          <LargeButton onClick={() => console.log('register')} type="button">
            일지 작성 및 도감 등록
          </LargeButton>
        </div>
      </div>
    </div>
  );
};
