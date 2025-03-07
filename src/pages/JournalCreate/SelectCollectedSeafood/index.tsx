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
  const [selectedCollectedSeafood, setSelectedCollectedSeafood] =
    useState<JournalCollectedSeafood | null>(null);
  const [imageSwiperInstance, setImageSwiperInstance] =
    useState<SwiperClass | null>(null);
  const [cardSwiperInstance, setCardSwiperInstance] =
    useState<SwiperClass | null>(null);

  const handleSeafoodImageUpload = async (files: File[]) => {
    const newCollectedSeafoods = files.map((file) => ({
      objectKey: `seafood-${file.name}`,
      file,
      seafoods: [],
    }));
    onCollectedSeafoodsChange([...collectedSeafoods, ...newCollectedSeafoods]);
  };

  const handleSeafoodImageDelete = (objectKey: string) => {
    onCollectedSeafoodsChange(
      collectedSeafoods.filter(
        (collectedSeafood) => collectedSeafood.objectKey !== objectKey,
      ),
    );
  };

  // 이미지 클릭 시 선택 상태 업데이트
  const handleCollectedSeafoodClick = (
    collectedSeafood: JournalCollectedSeafood,
    index: number,
  ) => {
    if (index < 0 || index >= collectedSeafoods.length) return;
    setSelectedCollectedSeafood(collectedSeafood);

    if (imageSwiperInstance && cardSwiperInstance) {
      imageSwiperInstance.slideTo(index);
      cardSwiperInstance.slideTo(index);
    }
  };

  const prevCollectedSeafoodsLengthRef = useRef(collectedSeafoods.length);

  useEffect(() => {
    if (imageSwiperInstance) {
      if (collectedSeafoods.length > prevCollectedSeafoodsLengthRef.current) {
        setSelectedCollectedSeafood(
          collectedSeafoods[collectedSeafoods.length - 1],
        );
        imageSwiperInstance.slideTo(collectedSeafoods.length);
      }
    }
    prevCollectedSeafoodsLengthRef.current = collectedSeafoods.length;
  }, [imageSwiperInstance, collectedSeafoods]);

  useEffect(() => {
    if (imageSwiperInstance && cardSwiperInstance) {
      // 이미지 스와이퍼 변경 시 카드 스와이퍼 연동
      const imageChangeHandler = () => {
        const currentIndex = imageSwiperInstance.activeIndex;
        cardSwiperInstance.slideTo(currentIndex);
        setSelectedCollectedSeafood(collectedSeafoods[currentIndex]);
      };

      const cardChangeHandler = () => {
        const currentIndex = cardSwiperInstance.activeIndex;
        imageSwiperInstance.slideTo(currentIndex);
        setSelectedCollectedSeafood(collectedSeafoods[currentIndex]);
      };

      imageSwiperInstance.on('slideChange', imageChangeHandler);
      cardSwiperInstance.on('slideChange', cardChangeHandler);

      // 초기 선택 상태 설정
      if (collectedSeafoods.length > 0 && !selectedCollectedSeafood) {
        setSelectedCollectedSeafood(collectedSeafoods[0]);
      }

      return () => {
        imageSwiperInstance.off('slideChange', imageChangeHandler);
        cardSwiperInstance.off('slideChange', cardChangeHandler);
      };
    }
  }, [imageSwiperInstance, cardSwiperInstance, collectedSeafoods]);

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

            {collectedSeafoods.map((collectedSeafood, index) => (
              <SwiperSlide
                key={collectedSeafood.objectKey}
                className="size-24 select-none"
                onClick={() =>
                  handleCollectedSeafoodClick(collectedSeafood, index)
                }
              >
                <img
                  src={URL.createObjectURL(collectedSeafood.file)}
                  alt="업로드된 이미지"
                  className="size-full rounded-xl border border-gray-200 object-cover"
                />
                {(!selectedCollectedSeafood ||
                  selectedCollectedSeafood.objectKey !==
                    collectedSeafood.objectKey) && (
                  <div className="absolute inset-0 rounded-xl bg-black/45" />
                )}
                <IconButton
                  className="absolute -right-1 -top-1 z-10"
                  variant="black"
                  type="button"
                  onClick={() =>
                    handleSeafoodImageDelete(collectedSeafood.objectKey)
                  }
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
            {selectedCollectedSeafood && (
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
