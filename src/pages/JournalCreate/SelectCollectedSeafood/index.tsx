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
import { CollectedSeafoodCard } from '../CollectedSeafoodCard';
import { RoundedButton } from '@/components/RoundedButton';
import InformationOutlineIcon from '@/icons/information-outline.svg?react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Controller } from 'swiper/modules';
import { CollectedSeafoodCardBottomSheet } from '../CollectedSeafoodCardBottomSheet';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/query';
import { analyzeSeafoodImage, getSeafoods } from '@/api/journalCreate';
import { toast } from '@/components/Toast';
import { ERROR_MESSAGE } from '@/constant/src/error';
import { getPresignedUrl, putAmazonS3 } from '@/api/file';
import { AxiosError } from 'axios';
import { PresignedUrlRequest } from '@/api/file/types';
import { ErrorResponse } from '@/api/types';
import { Image } from '@/components/Image';

interface Props {
  collections: JournalCollectedSeafood[];
  onCollectionsChange: (collections: JournalCollectedSeafood[]) => void;
  onSkipClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SelectCollectedSeafood = ({
  collections,
  onCollectionsChange,
  onSkipClick,
}: Props) => {
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
    queryKey: [queryKeys.seafoods],
    queryFn: () => getSeafoods(),
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
      const updatedSeafoods: JournalCollectedSeafood[] = collections.map(
        (item) =>
          item.imageIdentifier === imageIdentifier
            ? { ...item, collectionInfos: data, analysisStatus: 'success' }
            : item,
      );
      onCollectionsChange(updatedSeafoods);
    },
    onError: (error, imageIdentifier) => {
      const updatedSeafoods: JournalCollectedSeafood[] = collections.map(
        (item) =>
          item.imageIdentifier === imageIdentifier
            ? { ...item, analysisStatus: 'failed' }
            : item,
      );
      onCollectionsChange(updatedSeafoods);
    },
  });

  useEffect(() => {
    if (collections.length > 0 && !activeImageIdentifier) {
      setActiveImageIdentifier(collections[0].imageIdentifier);
    }
  }, [collections]);

  const handleSeafoodImageUpload = async (files: File[]) => {
    if (collections.length + files.length > 5) {
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
          collectionInfos: [],
          analysisStatus: 'pending',
        }),
      );
      const updatedSeafoods = [...collections, ...newSeafoods];
      onCollectionsChange(updatedSeafoods);

      // 상태 업데이트 후에 분석 API 호출 (각 이미지별로 순차 처리)
      for (let i = 0; i < files.length; i++) {
        await analysisMutation.mutateAsync(presignedData[i].imageIdentifier);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeafoodImageDelete = (imageIdentifier: string) => {
    const updatedSeafoods = collections.filter(
      (collectedSeafood) =>
        collectedSeafood.imageIdentifier !== imageIdentifier,
    );
    onCollectionsChange(updatedSeafoods);

    if (imageIdentifier === activeImageIdentifier) {
      if (updatedSeafoods.length > 0) {
        handleSlideChange(updatedSeafoods[0].imageIdentifier);
      } else {
        setActiveImageIdentifier(null);
      }
    }
  };

  // activeImageIdentifier의 해당되는 seafood를 삭제
  const handleSeafoodDelete = (imageIdentifier: string, seafoodId: number) => {
    const updatedSeafoods = collections.map((seafood) =>
      seafood.imageIdentifier === imageIdentifier
        ? {
            ...seafood,
            collectionInfos: seafood.collectionInfos.filter(
              (s) => s.seafoodId !== seafoodId,
            ),
          }
        : seafood,
    );
    onCollectionsChange(updatedSeafoods);
  };

  const handleSlideChange = (swiperOrKey: SwiperClass | string) => {
    if (typeof swiperOrKey === 'string') {
      setActiveImageIdentifier(swiperOrKey);
      const index = collections.findIndex(
        (seafood) => seafood.imageIdentifier === swiperOrKey,
      );
      if (index !== -1) {
        imageSwiperInstance?.slideTo(index);
        cardSwiperInstance?.slideTo(index);
      }
    } else {
      const currentSeafood = collections[swiperOrKey.activeIndex];
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
    const index = collections.findIndex(
      (seafood) => seafood.imageIdentifier === collectedSeafood.imageIdentifier,
    );
    if (index !== -1) {
      setActiveImageIdentifier(collectedSeafood.imageIdentifier);
      imageSwiperInstance?.slideTo(index);
      cardSwiperInstance?.slideTo(index);
    }
  };

  const handleSeafoodUpdate = (updatedSeafood: JournalCollectedSeafood) => {
    const updatedSeafoods = collections.map((seafood) =>
      seafood.imageIdentifier === activeImageIdentifier
        ? updatedSeafood
        : seafood,
    );
    onCollectionsChange(updatedSeafoods);
  };

  const prevcollectionsLengthRef = useRef(collections.length);

  useEffect(() => {
    if (collections.length > prevcollectionsLengthRef.current) {
      const lastSeafood = collections[collections.length - 1];
      setActiveImageIdentifier(lastSeafood.imageIdentifier);

      // 스와이퍼 인스턴스가 있다면 마지막 슬라이드로 이동
      if (imageSwiperInstance) {
        imageSwiperInstance.slideTo(collections.length - 1);
      }
      if (cardSwiperInstance) {
        cardSwiperInstance.slideTo(collections.length - 1);
      }
    }
    prevcollectionsLengthRef.current = collections.length;
  }, [collections]);

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
            text={
              <span className="text-xs">
                <span className="text-blue-700">{collections.length}</span>
                <span>/</span>
                <span>5</span>
              </span>
            }
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
            {collections.map((collectedSeafood) => (
              <SwiperSlide
                key={collectedSeafood.imageIdentifier}
                className="size-24 select-none"
                onClick={() => handleCollectedSeafoodClick(collectedSeafood)}
              >
                <Image
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
            {collections.map((collectedSeafood) => (
              <SwiperSlide key={collectedSeafood.imageIdentifier}>
                <CollectedSeafoodCard
                  collectedSeafood={collectedSeafood}
                  editMode={seafoodEditMode}
                  onPlusClick={() => setSeafoodPickerOpen(true)}
                  onSeafoodDelete={handleSeafoodDelete}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex items-center justify-between gap-2 px-4">
            {collections.find(
              (seafood) => seafood.imageIdentifier === activeImageIdentifier,
            ) && (
              <>
                <div className="flex items-center gap-2">
                  <InformationOutlineIcon className="text-gray-500" />
                  <p>정확하지 않나요?</p>
                </div>

                <RoundedButton
                  buttonType={seafoodEditMode ? 'secondary' : 'gray'}
                  className="!py-2"
                  type="button"
                  onClick={() => setSeafoodEditMode(!seafoodEditMode)}
                  disabled={
                    mutation.isPending ||
                    putMutation.isPending ||
                    analysisMutation.isPending
                  }
                >
                  {seafoodEditMode ? '입력 완료' : '직접 입력하기'}
                </RoundedButton>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {collections.length === 0 && (
        <div className="fixed inset-x-0 bottom-custom-72px-spacer z-10 m-auto flex w-full min-w-full-layout max-w-full-layout items-center justify-center">
          <button
            className="text-gray-600 underline"
            type="button"
            onClick={onSkipClick}
          >
            건너뛰기
          </button>
        </div>
      )}

      {/* 직업 입력 BottomSheet */}
      <CollectedSeafoodCardBottomSheet
        open={seafoodPickerOpen}
        onDismiss={() => setSeafoodPickerOpen(false)}
        seafoods={seafoodsType}
        onSeafoodsChange={handleSeafoodUpdate}
        collectedSeafood={
          collections.find(
            (seafood) => seafood.imageIdentifier === activeImageIdentifier,
          )!
        }
      />
    </>
  );
};
