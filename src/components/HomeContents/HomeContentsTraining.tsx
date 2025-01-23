import { HomeTrainingCard } from './HomeTrainingCard';
import WindBreathIcon from '@/icons/wind-breath.svg?react';
import LungsIcon from '@/icons/lungs.svg?react';
import WarningIcon from '@/icons/warning.svg?react';
import MuscleIcon from '@/icons/muscle.svg?react';
import { Dialog } from '../Dialog';
import { useModalController } from '@/contexts/ModalContext';

export const HomeContentsTraining = () => {
  const { openModal } = useModalController();
  return (
    <div className="grid w-full grid-cols-4 gap-4 px-4">
      <HomeTrainingCard
        label="숨참기"
        type="button"
        view={<WindBreathIcon />}
        onClick={() => {
          openModal('not-yet');
        }}
      />
      <HomeTrainingCard
        label="폐활량"
        type="button"
        view={<LungsIcon />}
        onClick={() => {
          openModal('not-yet');
        }}
      />
      <HomeTrainingCard
        label="다리 운동"
        type="button"
        view={<MuscleIcon />}
        onClick={() => {
          openModal('not-yet');
        }}
      />
      <HomeTrainingCard
        label="주의사항"
        type="button"
        view={<WarningIcon />}
        onClick={() => {
          openModal('not-yet');
        }}
      />
      <Dialog id="not-yet">
        <div className="flex size-full flex-col items-center justify-center text-center text-lg font-medium text-gray-900">
          <img src="/assets/images/haenyeo.png" className="size-40"></img>
          <span className="whitespace-pre-wrap">
            {'아직 준비 중인 서비스입니다. \n 조금만 기다려주세요!'}
          </span>
        </div>
      </Dialog>
    </div>
  );
};
