import { HomeContentsCard } from './HomeContentsCard';
import WindBreathIcon from '@/icons/wind-breath.svg?react';
import LungsIcon from '@/icons/lungs.svg?react';
import WarningIcon from '@/icons/warning.svg?react';
import MuscleIcon from '@/icons/muscle.svg?react';
import { AlertBox } from '../AlertBox';
import { useModalContext } from '@/contexts/ModalContext';

export const HomeContentsTraining = () => {
  const { openModal } = useModalContext();
  return (
    <div className="grid w-full grid-cols-4 gap-4 px-4">
      <HomeContentsCard
        label="숨참기"
        sizeType="md"
        type="button"
        view={<WindBreathIcon />}
        onClick={() => {
          openModal('not-yet');
        }}
      />
      <HomeContentsCard
        label="폐활량"
        sizeType="md"
        type="button"
        view={<LungsIcon />}
        onClick={() => {
          openModal('not-yet');
        }}
      />
      <HomeContentsCard
        label="다리 운동"
        sizeType="md"
        type="button"
        view={<MuscleIcon />}
        onClick={() => {
          openModal('not-yet');
        }}
      />
      <HomeContentsCard
        label="주의사항"
        sizeType="md"
        type="button"
        view={<WarningIcon />}
        onClick={() => {
          openModal('not-yet');
        }}
      />
      <AlertBox id="not-yet">
        <div className="flex size-full flex-col items-center justify-center text-center text-lg font-medium text-gray-900">
          <img src="/assets/images/haenyeo.png"></img>
          아직 준비 중인 서비스입니다. 조금만 기다려주세요!
        </div>
      </AlertBox>
    </div>
  );
};
