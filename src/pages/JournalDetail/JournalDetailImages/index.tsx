import { Image } from '@/components/Image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface Props {
  imageUrls: string[];
}

export const JournalDetailImages = ({ imageUrls }: Props) => {
  return (
    <div className="bg-gray-050 py-4">
      <Swiper
        spaceBetween={8}
        slidesPerView="auto"
        centeredSlides={imageUrls.length === 1}
      >
        {imageUrls.map((imageUrl, index) => (
          <SwiperSlide
            key={imageUrl}
            className={clsx(
              'size-[16.9rem]',
              'flex items-center',
              index === 0 ? 'ml-4' : '',
              index === imageUrls.length - 1 ? 'mr-4' : '',
            )}
          >
            <Image
              src={imageUrl}
              alt="journal-image"
              className="aspect-square size-full shrink-0 border border-gray-200 object-cover"
              placeholderClassName="bg-white"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
