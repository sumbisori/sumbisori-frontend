import { HomeTrainingCard } from '../HomeTrainingCard';
import WindBreathIcon from '@/icons/home/wind-breath.svg?react';
import LungsIcon from '@/icons/home/lungs.svg?react';
import WarningIcon from '@/icons/home/warning.svg?react';
import MuscleIcon from '@/icons/home/muscle.svg?react';
import { toast } from '@/components/Toast';

export const HomeContentsTraining = () => {
  return (
    <div className="grid w-full grid-cols-4 gap-4 px-4">
      <HomeTrainingCard
        label="숨참기"
        view={<WindBreathIcon />}
        onClick={() => {
          toast.info('준비중입니다.');
        }}
      />
      <HomeTrainingCard
        label="폐활량"
        view={<LungsIcon />}
        onClick={() => {
          toast.info('준비중입니다.');
        }}
      />
      <HomeTrainingCard
        label="다리 운동"
        view={<MuscleIcon />}
        onClick={() => {
          toast.info('준비중입니다.');
        }}
      />
      <HomeTrainingCard
        label="주의사항"
        view={<WarningIcon />}
        onClick={() => {
          toast.info('준비중입니다.');
        }}
      />
    </div>
  );
};
