import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { InputTitle } from '../InputTitle';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';
import { JournalCollectedSeafood } from '@/api/journalCreate/types';
import { useEffect, useState, useRef } from 'react';
import { UploadImageButton } from '../UploadImageButton';
import AddAPhotoIcon2 from '@/icons/journal/add-a-photo2.svg?react';
import CloseIcon from '@/icons/journal/close.svg?react';
import { IconButton } from '@/components/IconButton';
import { useJournalStore } from '@/stores';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { CollectedSeafoodCard } from '../CollectedSeafoodCard';
import { RoundedButton } from '@/components/RoundedButton';
import InformationOutlineIcon from '@/icons/information-outline.svg?react';
interface Props {
  collectedSeafoods: JournalCollectedSeafood[];
  onCollectedSeafoodsChange: (
    collectedSeafoods: JournalCollectedSeafood[],
  ) => void;
}

export const SelectCollectedSeafood = ({
  collectedSeafoods,
  onCollectedSeafoodsChange,
}: Props) => {
  const { journalForm } = useJournalStore();
  const [activeObjectKey, setActiveObjectKey] = useState<string>('');
  const [imageSwiperInstance, setImageSwiperInstance] =
    useState<SwiperClass | null>(null);
  const [cardSwiperInstance, setCardSwiperInstance] =
    useState<SwiperClass | null>(null);

  console.log(activeObjectKey);

  const handleSeafoodImageUpload = async (files: File[]) => {
    const newCollectedSeafoods = files.map((file) => ({
      objectKey: `seafood-${file.name}`,
      file,
      seafoods: [],
    }));
    onCollectedSeafoodsChange([...collectedSeafoods, ...newCollectedSeafoods]);
  };

  const handleSeafoodImageDelete = (objectKey: string) => {
    const updatedSeafoods = collectedSeafoods.filter(
      (collectedSeafood) => collectedSeafood.objectKey !== objectKey,
    );
    onCollectedSeafoodsChange(updatedSeafoods);

    if (objectKey === activeObjectKey) {
      if (updatedSeafoods.length > 0) {
        handleSlideChange(updatedSeafoods[0].objectKey);
      } else {
        setActiveObjectKey('');
      }
    }
  };

  const handleSlideChange = (objectKey: string) => {
    const index = collectedSeafoods.findIndex(
      (seafood) => seafood.objectKey === objectKey,
    );
    if (index === -1) return;

    setActiveObjectKey(objectKey);
    imageSwiperInstance?.slideTo(index);
    cardSwiperInstance?.slideTo(index);
  };

  const handleCollectedSeafoodClick = (
    collectedSeafood: JournalCollectedSeafood,
  ) => {
    handleSlideChange(collectedSeafood.objectKey);
  };

  const prevCollectedSeafoodsLengthRef = useRef(collectedSeafoods.length);

  useEffect(() => {
    if (imageSwiperInstance && cardSwiperInstance) {
      const slideChangeHandler = (swiper: SwiperClass) => {
        const currentSeafood = collectedSeafoods[swiper.activeIndex];
        if (currentSeafood) {
          handleSlideChange(currentSeafood.objectKey);
        }
      };

      imageSwiperInstance.on('slideChange', () =>
        slideChangeHandler(imageSwiperInstance),
      );
      cardSwiperInstance.on('slideChange', () =>
        slideChangeHandler(cardSwiperInstance),
      );

      return () => {
        imageSwiperInstance.off('slideChange');
        cardSwiperInstance.off('slideChange');
      };
    }
  }, [imageSwiperInstance, cardSwiperInstance, collectedSeafoods]);

  useEffect(() => {
    if (collectedSeafoods.length > prevCollectedSeafoodsLengthRef.current) {
      const lastSeafood = collectedSeafoods[collectedSeafoods.length - 1];
      handleSlideChange(lastSeafood.objectKey);
    }
    prevCollectedSeafoodsLengthRef.current = collectedSeafoods.length;
  }, [collectedSeafoods]);

  return (
    <>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('seafood').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('seafood').subtitle}
      />

      <motion.div className="flex flex-col gap-6 py-4" {...animationY(0.6)}>
        <div className="flex items-center gap-3 pl-4">
          <UploadImageButton
            onImageUpload={handleSeafoodImageUpload}
            icon={<AddAPhotoIcon2 />}
            className="mt-2"
            text={<span className="text-xs">추가</span>}
            multiple={false}
          />
          <Swiper
            onSwiper={setImageSwiperInstance}
            slidesPerView="auto"
            spaceBetween={12}
            className="w-full pr-4 pt-2"
          >
            {/* 업로드 버튼을 첫 슬라이드에 배치 */}

            {collectedSeafoods.map((collectedSeafood) => (
              <SwiperSlide
                key={collectedSeafood.objectKey}
                className="size-24 select-none"
                onClick={() => handleCollectedSeafoodClick(collectedSeafood)}
              >
                <img
                  src={URL.createObjectURL(collectedSeafood.file)}
                  alt="업로드된 이미지"
                  className="size-full rounded-xl border border-gray-200 object-cover"
                />
                {activeObjectKey !== collectedSeafood.objectKey && (
                  <div className="absolute inset-0 rounded-xl bg-black/45" />
                )}
                <IconButton
                  className="absolute -right-1 -top-1 z-10"
                  variant="black"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSeafoodImageDelete(collectedSeafood.objectKey);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-col gap-9">
          <Swiper
            onSwiper={setCardSwiperInstance}
            slidesPerView={1.1}
            className="w-full"
            centeredSlides={true}
            spaceBetween={8}
          >
            {collectedSeafoods.map((collectedSeafood) => (
              <SwiperSlide key={collectedSeafood.objectKey}>
                <CollectedSeafoodCard collectedSeafood={collectedSeafood} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex items-center justify-between gap-2 px-4">
            {collectedSeafoods.find(
              (seafood) => seafood.objectKey === activeObjectKey,
            ) && (
              <div className="flex items-center gap-2">
                <InformationOutlineIcon className="text-gray-500" />
                <p>정확하지 않나요?</p>
              </div>
            )}
            <RoundedButton buttonType="gray" className="!py-2" type="button">
              직접 입력하기
            </RoundedButton>
          </div>
        </div>
      </motion.div>
    </>
  );
};
