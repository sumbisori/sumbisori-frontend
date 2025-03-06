import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { InputTitle } from '../InputTitle';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';
import { JournalSeafood } from '@/api/journalCreate/types';
import { useRef, useEffect } from 'react';
import { UploadImageButton } from '../UploadImageButton';
import AddAPhotoIcon2 from '@/icons/journal/add-a-photo2.svg?react';
import CloseIcon from '@/icons/journal/close.svg?react';
import { IconButton } from '@/components/IconButton';
interface Props {
  seafood: JournalSeafood[];
  onSeafoodChange: (seafood: JournalSeafood[]) => void;
}

export const SelectSeafood = ({ seafood, onSeafoodChange }: Props) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const prevPhotosLengthRef = useRef(seafood.length);

  const handleImageUpload = async (files: File[]) => {};

  const handleImageDelete = (objectKey: string) => {
    onSeafoodChange(
      seafood.filter((seafood) => seafood.objectKey !== objectKey),
    );
  };

  const handleImageUploadScroll = () => {
    if (
      imageContainerRef.current &&
      seafood.length > prevPhotosLengthRef.current
    ) {
      imageContainerRef.current.scrollTo({
        left: imageContainerRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
    prevPhotosLengthRef.current = seafood.length;
  };

  useEffect(() => {
    handleImageUploadScroll();
  }, [seafood]);

  return (
    <>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('seafood').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('seafood').subtitle}
      />
      <motion.div className="p-4" {...animationY(0.6)}>
        <div className="flex flex-col gap-6">
          <div
            id="image-container"
            ref={imageContainerRef}
            className="hide-scroll flex gap-3 overflow-x-auto pb-1 pr-1 pt-2"
          >
            <UploadImageButton
              onImageUpload={handleImageUpload}
              icon={<AddAPhotoIcon2 />}
              text={<span className="text-xs">추가</span>}
            />
            {seafood.map((image, index) => (
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
        </div>
      </motion.div>
    </>
  );
};
