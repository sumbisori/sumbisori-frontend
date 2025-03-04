import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { InputTitle } from '../InputTitle';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';

import { JournalCreatePlace } from '@/api/journalCreate/types';
import Skeleton from '@/components/Skeleton';
import { ImageWithTextAlert } from '@/components/ImageWithTextAlert';
import { IMAGE_PATHS } from '@/constant';
import { RadioButton } from '@/components/RadioButton';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/query';
import { getJournalCreatePlace } from '@/api/journalCreate';
import { useEffect } from 'react';

interface Props {
  selectedPlace?: number | null;
  onPlaceChange?: (selectedPlace: number | null) => void;
}

export const SelectPlace = ({ selectedPlace, onPlaceChange }: Props) => {
  const { data: places, isLoading: isPlacesLoading } = useQuery<
    JournalCreatePlace[]
  >({
    queryKey: [queryKeys.journalCreatePlace],
    queryFn: () => getJournalCreatePlace(),
    initialData: [],
  });

  useEffect(() => {
    if (places && places.length > 0) {
      onPlaceChange?.(places[0].placeId);
    }
  }, [places]);

  return (
    <>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('place').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('place').subtitle}
      />
      {isPlacesLoading && (
        <div className="flex flex-col gap-4 p-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton variant="circle" width={20} height={20} />
              <Skeleton width={64} height={64} />
              <div className="flex flex-col gap-2">
                <Skeleton width={100} height={28} />
                <Skeleton width={170} height={28} />
              </div>
            </div>
          ))}
        </div>
      )}
      {places && !isPlacesLoading && (
        <motion.div className="p-4" {...animationY(0.6)}>
          <div className="flex flex-col gap-4">
            {places.map((place) => (
              <motion.div
                key={place.placeId}
                className="flex cursor-pointer items-center gap-2"
                onClick={() => onPlaceChange?.(place.placeId)}
              >
                <RadioButton
                  selected={place.placeId === selectedPlace}
                  onClick={() => onPlaceChange?.(place.placeId)}
                />
                <img
                  src={place.imageUrl}
                  alt={place.name}
                  className="size-16 rounded-2xl"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-600">
                    {place.city}
                  </p>
                  <p className="text-lg font-medium">{place.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      {!places && !isPlacesLoading && (
        <div className="p-4">
          <ImageWithTextAlert
            src={`${IMAGE_PATHS.ROOT}/haenyeo_sad.png`}
            alt="해녀"
            text="장소를 찾을 수 없습니다."
          />
        </div>
      )}
    </>
  );
};
