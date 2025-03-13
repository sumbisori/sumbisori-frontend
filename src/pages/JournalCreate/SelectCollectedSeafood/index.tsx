import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { InputTitle } from '../InputTitle';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';
import {
  JournalCollectedSeafood,
  SeafoodsTypeList,
} from '@/api/journalCreate/types';
import { useEffect, useState, useRef } from 'react';
import { UploadImageButton } from '../UploadImageButton';
import AddAPhotoIcon2 from '@/icons/journal/add-a-photo2.svg?react';
import CloseIcon from '@/icons/journal/close.svg?react';
import { IconButton } from '@/components/IconButton';
import { useJournalStore } from '@/stores';

import { CollectedSeafoodCard } from '../CollectedSeafoodCard';
import { RoundedButton } from '@/components/RoundedButton';
import InformationOutlineIcon from '@/icons/information-outline.svg?react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Controller } from 'swiper/modules';
import { CollectedSeafoodCardBottomSheet } from '../CollectedSeafoodCardBottomSheet';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/query';
import { analyzeSeafoodImage, getSeafoodsType } from '@/api/journalCreate';
import { toast } from '@/components/Toast';
import { ERROR_MESSAGE } from '@/constant/src/error';
import { getPresignedUrl, putAmazonS3 } from '@/api/file';
import { AxiosError } from 'axios';
import { PresignedUrlRequest } from '@/api/file/types';
import { ErrorResponse } from '@/api/types';

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
  const [activeImageIdentifier, setActiveImageIdentifier] = useState<
    string | null
  >(null);
  const [imageSwiperInstance, setImageSwiperInstance] =
    useState<SwiperClass | null>(null);
  const [cardSwiperInstance, setCardSwiperInstance] =
    useState<SwiperClass | null>(null);
  const [seafoodEditMode, setSeafoodEditMode] = useState(false);
  const [seafoodPickerOpen, setSeafoodPickerOpen] = useState(false);

  const { data: seafoodsType } = useQuery<SeafoodsTypeList[]>({
    queryKey: [queryKeys.seafoodsType],
    queryFn: () => getSeafoodsType(),
    initialData: [],
  });

  const mutation = useMutation({
    mutationFn: getPresignedUrl,
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.name === 'INVALID_IMAGE_CONTENT_TYPE') {
        toast.error(ERROR_MESSAGE.INVALID_IMAGE_CONTENT_TYPE);
        return;
      }
      if (error.response?.data.name === 'VALIDATION_FAILED') {
        toast.error(ERROR_MESSAGE.IMAGE_VALIDATION_FAILED);
        return;
      }
    },
  });

  const putMutation = useMutation({
    mutationFn: putAmazonS3,
    onError: () => {
      toast.error(ERROR_MESSAGE.IMAGE_UPLOAD_FAILED);
    },
  });

  const analysisMutation = useMutation({
    mutationFn: (imageIdentifier: string) =>
      analyzeSeafoodImage(imageIdentifier),
    onSuccess: (data, imageIdentifier) => {
      const updatedSeafoods = collectedSeafoods.map((item) =>
        item.imageIdentifier === imageIdentifier
          ? { ...item, seafoods: data, analysisStatus: 'success' }
          : item,
      );
      onCollectedSeafoodsChange(updatedSeafoods);
    },
    onError: (error, imageIdentifier) => {
      const updatedSeafoods = collectedSeafoods.map((item) =>
        item.imageIdentifier === imageIdentifier
          ? { ...item, analysisStatus: 'failed' }
          : item,
      );
      onCollectedSeafoodsChange(updatedSeafoods);
    },
  });

  useEffect(() => {
    if (collectedSeafoods.length > 0 && !activeImageIdentifier) {
      setActiveImageIdentifier(collectedSeafoods[0].imageIdentifier);
    }
  }, [collectedSeafoods]);

  const handleSeafoodImageUpload = async (files: File[]) => {
    if (collectedSeafoods.length + files.length > 5) {
      toast.warning(ERROR_MESSAGE.MAX_COLLECTED_SEAFOOD_COUNT);
      return;
    }
    try {
      const req: PresignedUrlRequest = {
        fileInfos: files.map((file) => ({
          contentType: file.type,
          size: file.size,
        })),
      };
      const presignedData = await mutation.mutateAsync(req);

      await Promise.all(
        files.map((file, index) =>
          putMutation.mutateAsync({
            presignedUrl: presignedData[index].url,
            image: file,
          }),
        ),
      );

      // 이미지 업로드가 끝나면, 새로운 항목을 'pending' 상태로 추가
      const newSeafoods: JournalCollectedSeafood[] = files.map(
        (file, index) => ({
          imageIdentifier: presignedData[index].imageIdentifier,
          file,
          seafoods: [],
          analysisStatus: 'pending',
        }),
      );
      onCollectedSeafoodsChange([...collectedSeafoods, ...newSeafoods]);

      // 각 파일에 대해 분석 API를 호출하여 결과 업데이트
      files.forEach((file, index) => {
        analysisMutation.mutate(presignedData[index].imageIdentifier);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeafoodImageDelete = (imageIdentifier: string) => {
    const updatedSeafoods = collectedSeafoods.filter(
      (collectedSeafood) =>
        collectedSeafood.imageIdentifier !== imageIdentifier,
    );
    onCollectedSeafoodsChange(updatedSeafoods);

    if (imageIdentifier === activeImageIdentifier) {
      if (updatedSeafoods.length > 0) {
        handleSlideChange(updatedSeafoods[0].imageIdentifier);
      } else {
        setActiveImageIdentifier(null);
      }
    }
  };

  const handleSlideChange = (swiperOrKey: SwiperClass | string) => {
    if (typeof swiperOrKey === 'string') {
      setActiveImageIdentifier(swiperOrKey);
      const index = collectedSeafoods.findIndex(
        (seafood) => seafood.imageIdentifier === swiperOrKey,
      );
      if (index !== -1) {
        imageSwiperInstance?.slideTo(index);
        cardSwiperInstance?.slideTo(index);
      }
    } else {
      const currentSeafood = collectedSeafoods[swiperOrKey.activeIndex];
      if (currentSeafood) {
        setActiveImageIdentifier(currentSeafood.imageIdentifier);

        if (swiperOrKey === imageSwiperInstance && cardSwiperInstance) {
          cardSwiperInstance.slideTo(swiperOrKey.activeIndex);
        } else if (swiperOrKey === cardSwiperInstance && imageSwiperInstance) {
          imageSwiperInstance.slideTo(swiperOrKey.activeIndex);
        }
      }
    }
  };

  const handleCollectedSeafoodClick = (
    collectedSeafood: JournalCollectedSeafood,
  ) => {
    const index = collectedSeafoods.findIndex(
      (seafood) => seafood.imageIdentifier === collectedSeafood.imageIdentifier,
    );
    if (index !== -1) {
      setActiveImageIdentifier(collectedSeafood.imageIdentifier);
      imageSwiperInstance?.slideTo(index);
      cardSwiperInstance?.slideTo(index);
    }
  };

  const handleSeafoodUpdate = (updatedSeafood: JournalCollectedSeafood) => {
    const updatedSeafoods = collectedSeafoods.map((seafood) =>
      seafood.imageIdentifier === activeImageIdentifier
        ? updatedSeafood
        : seafood,
    );
    onCollectedSeafoodsChange(updatedSeafoods);
  };

  const prevCollectedSeafoodsLengthRef = useRef(collectedSeafoods.length);

  useEffect(() => {
    if (collectedSeafoods.length > prevCollectedSeafoodsLengthRef.current) {
      const lastSeafood = collectedSeafoods[collectedSeafoods.length - 1];
      setActiveImageIdentifier(lastSeafood.imageIdentifier);

      // 스와이퍼 인스턴스가 있다면 마지막 슬라이드로 이동
      if (imageSwiperInstance) {
        imageSwiperInstance.slideTo(collectedSeafoods.length - 1);
      }
      if (cardSwiperInstance) {
        cardSwiperInstance.slideTo(collectedSeafoods.length - 1);
      }
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
            multiple={true}
          />
          <Swiper
            modules={[Controller]}
            onSwiper={setImageSwiperInstance}
            slidesPerView="auto"
            spaceBetween={12}
            className="w-full pr-4 pt-2"
            onSlideChange={(swiper) => handleSlideChange(swiper)}
          >
            {collectedSeafoods.map((collectedSeafood) => (
              <SwiperSlide
                key={collectedSeafood.imageIdentifier}
                className="size-24 select-none"
                onClick={() => handleCollectedSeafoodClick(collectedSeafood)}
              >
                <img
                  src={URL.createObjectURL(collectedSeafood.file)}
                  alt="업로드된 이미지"
                  className="size-full rounded-xl border border-gray-200 object-cover"
                />
                {activeImageIdentifier !== collectedSeafood.imageIdentifier && (
                  <div className="absolute inset-0 cursor-pointer rounded-xl bg-black/45" />
                )}
                <IconButton
                  className="absolute -right-1 -top-1 z-10"
                  variant="black"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSeafoodImageDelete(collectedSeafood.imageIdentifier);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-col gap-6">
          <Swiper
            modules={[Controller]}
            onSwiper={setCardSwiperInstance}
            slidesPerView={1.1}
            className="w-full"
            centeredSlides={true}
            spaceBetween={8}
            onSlideChange={(swiper) => handleSlideChange(swiper)}
          >
            {collectedSeafoods.map((collectedSeafood) => (
              <SwiperSlide key={collectedSeafood.imageIdentifier}>
                <CollectedSeafoodCard collectedSeafood={collectedSeafood} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex items-center justify-between gap-2 px-4">
            {collectedSeafoods.find(
              (seafood) => seafood.imageIdentifier === activeImageIdentifier,
            ) && (
              <>
                <div className="flex items-center gap-2">
                  <InformationOutlineIcon className="text-gray-500" />
                  <p>정확하지 않나요?</p>
                </div>
                <RoundedButton
                  buttonType="gray"
                  className="!py-2"
                  type="button"
                  onClick={() => setSeafoodPickerOpen(true)}
                >
                  직접 입력하기
                </RoundedButton>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* 직업 입력 BottomSheet */}
      <CollectedSeafoodCardBottomSheet
        open={seafoodPickerOpen}
        onDismiss={() => setSeafoodPickerOpen(false)}
        seafoods={seafoodsType}
        onSeafoodsChange={handleSeafoodUpdate}
        collectedSeafood={
          collectedSeafoods.find(
            (seafood) => seafood.imageIdentifier === activeImageIdentifier,
          )!
        }
      />
    </>
  );
};
