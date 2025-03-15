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
  selectedPlace?: { id: number; name: string } | null;
  onPlaceChange?: (selectedPlace: { id: number; name: string } | null) => void;
}

export const SelectPlace = ({ selectedPlace, onPlaceChange }: Props) => {
  const { data: places, isPending: isPlacesPending } = useQuery<
    JournalCreatePlace[]
  >({
    queryKey: [queryKeys.journalCreatePlace],
    queryFn: () => getJournalCreatePlace(),
    initialData: [],
  });

  return (
    <>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('place').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('place').subtitle}
      />
      {isPlacesPending && (
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
      {places && !isPlacesPending && (
        <motion.div className="p-4" {...animationY(0.6)}>
          <div className="flex flex-col gap-4">
            {places.map((place) => (
              <motion.div
                key={place.placeId}
                className="flex cursor-pointer items-center gap-2"
                onClick={() =>
                  onPlaceChange?.({ id: place.placeId, name: place.name })
                }
              >
                <RadioButton
                  selected={place.placeId === selectedPlace?.id}
                  onClick={() =>
                    onPlaceChange?.({ id: place.placeId, name: place.name })
                  }
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
      {!places && !isPlacesPending && (
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
