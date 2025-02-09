import { HomeTrainingCard } from './HomeTrainingCard';
import WindBreathIcon from '@/icons/wind-breath.svg?react';
import LungsIcon from '@/icons/lungs.svg?react';
import WarningIcon from '@/icons/warning.svg?react';
import MuscleIcon from '@/icons/muscle.svg?react';
import { Dialog } from '../Dialog';
import { useModalController } from '@/contexts/src/ModalContext';
import { ImageWithTextAlert } from '../ImageWithTextAlert';
import { IMAGE_PATHS } from '@/constant';

export const HomeContentsTraining = () => {
  const { openModal } = useModalController();
  return (
    <div className="grid w-full grid-cols-4 gap-4 px-4">
      <HomeTrainingCard
        label="숨참기"
        view={<WindBreathIcon />}
        onClick={() => {
          openModal('not-yet');
        }}
      />
      <HomeTrainingCard
        label="폐활량"
        view={<LungsIcon />}
        onClick={() => {
          openModal('not-yet');
        }}
      />
      <HomeTrainingCard
        label="다리 운동"
        view={<MuscleIcon />}
        onClick={() => {
          openModal('not-yet');
        }}
      />
      <HomeTrainingCard
        label="주의사항"
        view={<WarningIcon />}
        onClick={() => {
          openModal('not-yet');
        }}
      />
      <Dialog id="not-yet">
        <ImageWithTextAlert
          src={`${IMAGE_PATHS.ROOT}/haenyeo.png`}
          alt="준비중"
          text={`아직 준비 중인 서비스입니다.
조금만 기다려주세요!`}
        />
      </Dialog>
    </div>
  );
};
