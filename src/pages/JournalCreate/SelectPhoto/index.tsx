import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { InputTitle } from '../InputTitle';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';
import { UploadImageButton } from '../UploadImageButton';
import { useEffect, useRef } from 'react';
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
import { WARNING_MESSAGE } from '@/constant/src/warning';
interface Props {
  photos: JournalPhoto[];
  onPhotosChange: (photos: JournalPhoto[]) => void;
  experience: string;
  onExperienceChange: (experience: string) => void;
  satisfaction: number;
  onSatisfactionChange: (satisfaction: number) => void;
}

export const SelectPhoto = ({
  photos,
  onPhotosChange,
  experience,
  onExperienceChange,
  satisfaction,
  onSatisfactionChange,
}: Props) => {
  const { journalForm } = useJournalStore();
  const mutation = useMutation({
    mutationFn: getPresignedUrl,
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.name === 'INVALID_IMAGE_CONTENT_TYPE') {
        toast.error(ERROR_MESSAGE.INVALID_IMAGE_CONTENT_TYPE);
      } else {
        toast.error(ERROR_MESSAGE.IMAGE_UPLOAD_FAILED);
      }
    },
  });

  const putMutation = useMutation({
    mutationFn: putAmazonS3,
    onError: () => {
      toast.error(ERROR_MESSAGE.IMAGE_UPLOAD_FAILED);
    },
  });

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const prevPhotosLengthRef = useRef(photos.length);

  const handleImageUpload = async (files: File[]) => {
    if (journalForm.photos.length + files.length > 10) {
      toast.warning(WARNING_MESSAGE.MAX_PHOTO_COUNT);
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

      const newPhotos: JournalPhoto[] = files.map((file, index) => ({
        objectKey: presignedData[index].objectKey,
        file: file,
      }));

      onPhotosChange([...photos, ...newPhotos]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageDelete = (objectKey: string) => {
    onPhotosChange(photos.filter((photo) => photo.objectKey !== objectKey));
  };

  const handleImageUploadScroll = () => {
    if (
      imageContainerRef.current &&
      photos.length > prevPhotosLengthRef.current
    ) {
      imageContainerRef.current.scrollTo({
        left: imageContainerRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
    prevPhotosLengthRef.current = photos.length;
  };

  useEffect(() => {
    handleImageUploadScroll();
  }, [photos]);

  return (
    <>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('photo').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('photo').subtitle}
      />
      {mutation.isPending && (
        <Spinner className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2" />
      )}
      <motion.div className="p-4" {...animationY(0.6)}>
        <div className="flex flex-col gap-6">
          <div
            id="image-container"
            ref={imageContainerRef}
            className="hide-scroll flex gap-3 overflow-x-auto pb-1 pr-1 pt-2"
          >
            <UploadImageButton
              onImageUpload={handleImageUpload}
              icon={<AddAPhotoIcon />}
              text={
                <span className="text-xs">
                  <span className="text-blue-700">{photos.length}</span>
                  <span>/</span>
                  <span>10</span>
                </span>
              }
            />
            {photos.map((image, index) => (
              <div key={index} className="relative size-24 shrink-0">
                <img
                  src={URL.createObjectURL(image.file)}
                  alt="업로드된 이미지"
                  className="size-full rounded-xl border border-gray-200 object-cover"
                />
                <IconButton
                  className="absolute -right-1 -top-1 z-10"
                  variant="black"
                  type="button"
                  onClick={() => handleImageDelete(image.objectKey)}
                >
                  <CloseIcon />
                </IconButton>
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 z-10 flex h-5 w-24 items-center justify-center rounded-b-xl bg-black/40 text-white">
                    <span className="text-xs">대표 사진</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Textarea
            placeholder="체험하며 느낀 점들을 자유롭게 남겨주세요."
            value={experience}
            onChange={(e) => onExperienceChange(e.target.value)}
          />
          <div id="divider" className="h-px w-full bg-gray-200" />
          <div
            id="satisfaction-stars"
            className="flex flex-nowrap items-center gap-2"
          >
            <p className="text-lg font-medium">체험 만족도</p>
            <SatisfactionStars
              satisfaction={satisfaction}
              onSatisfactionChange={onSatisfactionChange}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};
