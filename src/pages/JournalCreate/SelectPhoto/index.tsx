import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { InputTitle } from '../InputTitle';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';
import { UploadImageButton } from '../UploadImageButton';
import { useEffect, useState, useRef } from 'react';
import AddAPhotoIcon from '@/icons/journal/add-a-photo.svg?react';
import CloseIcon from '@/icons/journal/close.svg?react';
import { IconButton } from '@/components/IconButton';
import { Textarea } from '@/components/Textarea';
import { useMutation } from '@tanstack/react-query';
import { Spinner } from '@/components/Spinner';
import { SatisfactionStars } from '../SatisfactionStars';
import { getPresignedUrl, putAmazonS3 } from '@/api/file';
import { PresignedUrlRequest } from '@/api/file/types';
import { toast } from '@/components/Toast';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/api/types';
import { ERROR_MESSAGE } from '@/constant/src/error';
import { JournalPhoto } from '@/api/journalCreate/types';
import { useJournalStore } from '@/stores';
import { Divider } from '@/components/Divider';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
interface Props {
  files: JournalPhoto[];
  onFilesChange: (files: JournalPhoto[]) => void;
  experience: string;
  onExperienceChange: (experience: string) => void;
  satisfaction: number | null;
  onSatisfactionChange: (satisfaction: number) => void;
}

export const SelectPhoto = ({
  files,
  onFilesChange,
  experience,
  onExperienceChange,
  satisfaction,
  onSatisfactionChange,
}: Props) => {
  const { journalForm } = useJournalStore();
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const prevPhotoLengthRef = useRef(files.length);

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

  const handleImageUpload = async (newPhoto: File[]) => {
    if (journalForm.files.length + newPhoto.length > 10) {
      toast.warning(ERROR_MESSAGE.MAX_PHOTO_COUNT);
      return;
    }
    try {
      const req: PresignedUrlRequest = {
        fileInfos: newPhoto.map((file) => ({
          contentType: file.type,
          size: file.size,
        })),
      };
      const presignedData = await mutation.mutateAsync(req);

      await Promise.all(
        newPhoto.map((file, index) =>
          putMutation.mutateAsync({
            presignedUrl: presignedData[index].url,
            image: file,
          }),
        ),
      );

      const newPhotos: JournalPhoto[] = newPhoto.map((file, index) => ({
        imageIdentifier: presignedData[index].imageIdentifier,
        file: file,
        sequence: files.length + index + 1,
      }));

      onFilesChange([...files, ...newPhotos]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageDelete = (imageIdentifier: string) => {
    onFilesChange(
      files.filter((photo) => photo.imageIdentifier !== imageIdentifier),
    );
  };

  useEffect(() => {
    if (files.length > 0 && swiperInstance) {
      if (files.length > prevPhotoLengthRef.current) {
        swiperInstance.slideTo(files.length);
      }
      prevPhotoLengthRef.current = files.length;
    }
  }, [swiperInstance, files]);

  return (
    <>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('photo').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('photo').subtitle}
      />
      {mutation.isPending && (
        <Spinner className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2" />
      )}
      <motion.div className="flex flex-col gap-6 py-4" {...animationY(0.6)}>
        <div className="flex items-center gap-3 pl-4">
          <UploadImageButton
            onImageUpload={handleImageUpload}
            icon={<AddAPhotoIcon />}
            className="mt-2"
            text={
              <span className="text-xs">
                <span className="text-blue-700">{files.length}</span>
                <span>/</span>
                <span>10</span>
              </span>
            }
          />
          <Swiper
            onSwiper={setSwiperInstance}
            slidesPerView="auto"
            spaceBetween={12}
            className="w-full pr-4 pt-2"
          >
            {files.map((photo, index) => (
              <SwiperSlide
                key={photo.imageIdentifier}
                className="size-24 select-none"
              >
                <img
                  src={URL.createObjectURL(photo.file)}
                  alt="업로드된 이미지"
                  className="size-full rounded-xl border border-gray-200 object-cover"
                />
                <IconButton
                  className="absolute -right-1 -top-1 z-10"
                  variant="black"
                  type="button"
                  onClick={() => handleImageDelete(photo.imageIdentifier)}
                >
                  <CloseIcon />
                </IconButton>
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 z-10 flex h-5 w-24 items-center justify-center rounded-b-xl bg-black/40 text-white">
                    <span className="text-xs">대표 사진</span>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-col gap-6 px-4">
          <Textarea
            placeholder="체험하며 느낀 점들을 최소 10자 이상 작성해주세요."
            value={experience}
            onChange={(e) => onExperienceChange(e.target.value)}
            maxLength={150}
            minLength={10}
          />
          <Divider />
          <div
            id="satisfaction-stars"
            className="flex flex-nowrap items-center gap-2"
          >
            <p className="text-lg font-medium">체험 만족도</p>
            <SatisfactionStars
              satisfaction={satisfaction ?? 0}
              onSatisfactionChange={onSatisfactionChange}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};
