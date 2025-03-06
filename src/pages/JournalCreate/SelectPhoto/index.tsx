import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { InputTitle } from '../InputTitle';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';
import { UploadImageButton } from '../UploadImageButton';
import { useEffect, useRef, useState } from 'react';
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
interface Props {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
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
  const [localPhotos, setLocalPhotos] = useState<File[]>([]);

  const mutation = useMutation({
    mutationFn: getPresignedUrl,
  });

  const putMutation = useMutation({
    mutationFn: putAmazonS3,
  });

  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (files: File[]) => {
    const req: PresignedUrlRequest = {
      fileInfo: files.map((file) => ({
        contentType: file.type,
        size: file.size,
      })),
    };
    mutation.mutate(req);
    if (mutation.data) {
      mutation.data.forEach((data) => {
        putMutation.mutate({
          presignedUrl: data.url,
          image: files[0],
        });
      });
    }
    if (putMutation.isSuccess) {
      setLocalPhotos([...localPhotos, ...files]);
    }
    if (mutation.isError || putMutation.isError) {
      toast.error('이미지 업로드에 실패했습니다.');
    }
  };

  const handleImageDelete = (index: number) => {
    const newImageList = photos.filter((_, i) => i !== index);
    onPhotosChange(newImageList);
  };

  useEffect(() => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollTo({
        left: imageContainerRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
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
            {localPhotos.map((image, index) => (
              <div key={index} className="relative size-24 shrink-0">
                <img
                  src={URL.createObjectURL(image)}
                  alt="업로드된 이미지"
                  className="size-full rounded-xl border border-gray-200 object-cover"
                />
                <IconButton
                  className="absolute -right-1 -top-1 z-10"
                  variant="black"
                  type="button"
                  onClick={() => handleImageDelete(index)}
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
