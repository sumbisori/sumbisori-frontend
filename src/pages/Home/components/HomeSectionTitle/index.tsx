import { SuitabilityStatus } from '@/api/home/types';
import Skeleton from '@/components/Skeleton';
import { homeTitleMessage } from '@/constant';

interface HomeTitle {
  weatherSuitability: SuitabilityStatus;
  waterTemperatureSuitability: SuitabilityStatus;
  waveHeightSuitability: SuitabilityStatus;
  titleError: boolean;
  titleLoading: boolean;
}

export const HomeSectionTitle = ({
  weatherSuitability,
  waterTemperatureSuitability,
  waveHeightSuitability,
  titleError,
  titleLoading,
}: HomeTitle) => {
  if (titleLoading) {
    return <Skeleton variant="text" width="100%" height="1.5rem" />;
  }
  if (titleError) {
    return <span>데이터가 존재하지 않아요</span>;
  }

  if (
    weatherSuitability === 'DEFAULT' ||
    waterTemperatureSuitability === 'DEFAULT' ||
    waveHeightSuitability === 'DEFAULT'
  ) {
    return <span>정보가 없어요</span>;
  }

  return homeTitleMessage[weatherSuitability][waterTemperatureSuitability][
    waveHeightSuitability
  ];
};
