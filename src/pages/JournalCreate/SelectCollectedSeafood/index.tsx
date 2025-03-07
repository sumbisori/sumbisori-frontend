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
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

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
  ) => {
    setSelectedCollectedSeafood(collectedSeafood);
  };

  const prevCollectedSeafoodsLengthRef = useRef(collectedSeafoods.length);

  useEffect(() => {
    if (collectedSeafoods.length > prevCollectedSeafoodsLengthRef.current) {
      setSelectedCollectedSeafood(
        collectedSeafoods[collectedSeafoods.length - 1],
      );
      swiperInstance.slideTo(collectedSeafoods.length);
    }
    prevCollectedSeafoodsLengthRef.current = collectedSeafoods.length;
  }, [collectedSeafoods, swiperInstance]);

  return (
    <>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('seafood').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('seafood').subtitle}
      />

      <motion.div className="p-4" {...animationY(0.6)}>
        <div className="flex flex-col gap-6">
          <Swiper
            onSwiper={setSwiperInstance}
            slidesPerView="auto"
            centeredSlides={collectedSeafoods.length > 1}
            spaceBetween={12}
            slideToClickedSlide={true}
            className="w-full pr-1 pt-2"
          >
            {/* 업로드 버튼을 첫 슬라이드에 배치 */}
            <SwiperSlide className="size-24">
              <UploadImageButton
                onImageUpload={handleSeafoodImageUpload}
                icon={<AddAPhotoIcon2 />}
                text={<span className="text-xs">추가</span>}
                multiple={false}
              />
            </SwiperSlide>

            {collectedSeafoods.map((collectedSeafood) => (
              <SwiperSlide
                key={collectedSeafood.objectKey}
                className="relative size-24 cursor-pointer select-none"
                onClick={() => handleCollectedSeafoodClick(collectedSeafood)}
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
      </motion.div>
    </>
  );
};
