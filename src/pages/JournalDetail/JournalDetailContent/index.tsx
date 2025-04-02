import dayjs from '@/util/dayjs';
import ArrowBottomIcon from '@/icons/arrow_bottom.svg?react';
import { SeafoodImage } from '@/components/SeafoodImage';
import { useQuery } from '@tanstack/react-query';
import { getJournalDetailCollections } from '@/api/journalDetail';
import { JournalDetailCollectionsType } from '@/api/journalDetail/types';
import { queryKeys } from '@/query';
import Skeleton from '@/components/Skeleton';
import { useState, Fragment } from 'react';
import { Image } from '@/components/Image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ExpandIcon from '@/icons/journal/expand.svg?react';
import { useModalController } from '@/contexts/src/ModalContext';
import { JournalDetailContentImageDialog } from '../JournalDetailContentImageDialog';

interface Props {
  impression: string;
  companion: string;
  weather: string;
  experienceDate: string;
  experienceId: number;
}

export const JournalDetailContent = ({
  impression,
  companion,
  weather,
  experienceDate,
  experienceId,
}: Props) => {
  const daysAgo = Math.abs(dayjs(experienceDate).diff(dayjs(), 'day'));
  const [showAnalysis, setShowAnalysis] = useState(false);
  const { openModal } = useModalController();

  const { data: journalDetailCollections, isPending } =
    useQuery<JournalDetailCollectionsType>({
      queryKey: [queryKeys.journalDetailCollections, experienceId],
      queryFn: () => {
        if (!experienceId) {
          throw new Error('experienceId is required');
        }
        return getJournalDetailCollections(experienceId);
      },
      enabled: !!experienceId,
    });

  return (
    <>
      <div id="journal-detail-container" className="bg-white py-6">
        <div id="journal-content-wrapper" className="flex flex-col gap-6">
          <div id="seafood-section" className="flex flex-col gap-4">
            <div
              id="seafood-header"
              className="flex items-center justify-between px-4"
            >
              <p id="seafood-title" className="font-medium">
                이날의 채취물 (
                {journalDetailCollections?.seafoodCollectionInfos.length || 0})
              </p>
              <button
                id="analysis-button"
                className="flex items-center gap-1 text-sm text-gray-700"
                onClick={() => setShowAnalysis(!showAnalysis)}
              >
                분석보기
                <ArrowBottomIcon
                  className={clsx(showAnalysis ? 'rotate-180' : '')}
                />
              </button>
            </div>
            {/* <div id="seafood-list" className="grid grid-cols-4 gap-2 px-4">
              {journalDetailCollections?.seafoodCollectionInfos.map(
                (seafood) => (
                  <div
                    id="seafood-item"
                    className="flex size-full flex-col items-center justify-center"
                    key={seafood.seafoodId}
                  >
                    <div className="relative flex size-[5.625rem] items-center justify-center">
                      <SeafoodImage
                        seafoodName={seafood.englishName}
                        variant="img"
                        className="size-3/5"
                      />
                    </div>
                    <p
                      id="seafood-count"
                      className="w-full min-w-[4.188rem] rounded border border-gray-300 bg-gray-050 px-2 py-1 text-center text-xs font-medium"
                    >
                      <span className="text-gray-700">
                        {seafood.koreanName}
                      </span>{' '}
                      x {seafood.count}
                    </p>
                  </div>
                ),
              )}
              {isPending && (
                <>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div className="flex flex-col gap-1" key={index}>
                      <Skeleton width="5.625rem" height="5.625rem" />
                      <Skeleton width="5.625rem" height="1.5rem" />
                    </div>
                  ))}
                </>
              )}
            </div> */}
            <Swiper
              slidesPerView="auto"
              spaceBetween={12}
              className="w-full px-4"
            >
              {journalDetailCollections?.seafoodCollectionInfos.map(
                (seafood) => (
                  <SwiperSlide
                    id="seafood-item"
                    className="flex w-[5.625rem] flex-col items-center justify-center"
                    key={seafood.seafoodId}
                  >
                    <div className="relative flex size-[5.625rem] items-center justify-center">
                      <SeafoodImage
                        seafoodName={seafood.englishName}
                        variant="img"
                        className="size-3/5"
                      />
                    </div>
                    <p
                      id="seafood-count"
                      className="w-[5.625rem] rounded border border-gray-300 bg-gray-050 px-2 py-1 text-center text-xs font-medium"
                    >
                      <span className="text-gray-700">
                        {seafood.koreanName}
                      </span>{' '}
                      x {seafood.count}
                    </p>
                  </SwiperSlide>
                ),
              )}
            </Swiper>
            {showAnalysis && (
              <div className="flex flex-col gap-2">
                <p className="px-4 text-base font-medium">분석 이미지</p>
                <Swiper
                  slidesPerView="auto"
                  spaceBetween={8}
                  className="w-full px-4"
                >
                  {journalDetailCollections?.collectionResult.map((result) => (
                    <SwiperSlide
                      key={result.imageUrl}
                      className={'size-[8.5rem]'}
                    >
                      <Image
                        src={result.imageUrl}
                        alt="분석 이미지"
                        className="size-full rounded-xl border border-gray-200 object-cover"
                        placeholderClassName="bg-white"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <button
                        className="absolute bottom-2.5 right-2.5 z-10"
                        onClick={() =>
                          openModal(
                            `journal-detail-content-image-dialog-${result.imageUrl}`,
                          )
                        }
                      >
                        <ExpandIcon />
                      </button>
                      <JournalDetailContentImageDialog result={result} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
          <div id="journal-info" className="flex flex-col gap-4 px-4">
            <div id="journal-text" className="flex flex-col gap-2">
              <div
                id="journal-tags"
                className="text-base font-medium text-blue-700"
              >
                #{companion} #{weather}
              </div>
              <p id="journal-impression" className="text-base font-medium">
                {impression}
              </p>
            </div>
            <div
              id="journal-date"
              className="text-base font-medium text-gray-600"
            >
              {daysAgo}일 전
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
