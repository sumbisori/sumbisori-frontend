import { SuitabilityStatus } from '@/api/home';
import { homeTitleMessage } from '@/constant/src/homeTitleMessage';
import Skeleton from '../../../../components/Skeleton';

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
    return <span>정보를 불러오는 중 문제가 발생했어요</span>;
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
