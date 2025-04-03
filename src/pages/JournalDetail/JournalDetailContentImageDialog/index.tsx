import { Dialog } from '@/components/Dialog';
import { CollectionResultType } from '@/api/journalDetail/types';
import { Image } from '@/components/Image';
import { SeafoodImage } from '@/components/SeafoodImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface Props {
  result: CollectionResultType;
}

export const JournalDetailContentImageDialog = ({ result }: Props) => {
  return (
    <Dialog
      id={`journal-detail-content-image-dialog-${result.imageUrl}`}
      type="empty"
    >
      <div className="flex flex-col gap-4 p-4">
        <Image
          src={result.imageUrl}
          alt="분석 이미지"
          className="size-[18.75rem]"
        />
        <div className="flex flex-col gap-2">
          <p className="font-medium text-black">
            채취물({result.seafoodCollectionInfos.length})
          </p>
          <Swiper slidesPerView="auto" spaceBetween={12} className="w-full">
            {result.seafoodCollectionInfos.map((seafood) => (
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
                  <span className="text-gray-700">{seafood.koreanName}</span> x{' '}
                  {seafood.count}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Dialog>
  );
};
