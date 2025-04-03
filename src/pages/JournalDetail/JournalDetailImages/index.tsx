import { Image } from '@/components/Image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

interface Props {
  imageUrls: string[];
}

export const JournalDetailImages = ({ imageUrls }: Props) => {
  return (
    <>
      {imageUrls.length >= 1 && (
        <Swiper
          className="[&_.swiper-pagination-bullet-active]:!bg-white"
          spaceBetween={8}
          slidesPerView="auto"
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
        >
          {imageUrls.map((imageUrl, index) => (
            <SwiperSlide key={imageUrl} className="h-[16.875rem] w-full">
              <Image
                src={imageUrl}
                alt="journal-image"
                className="size-full object-contain"
                placeholderClassName="bg-white"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {imageUrls.length === 0 && (
        <Image
          src={'#'}
          alt="journal-image"
          className="size-full object-cover"
          placeholderClassName="bg-white"
        />
      )}
    </>
  );
};
