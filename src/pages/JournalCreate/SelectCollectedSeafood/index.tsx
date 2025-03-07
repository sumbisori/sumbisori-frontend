import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { InputTitle } from '../InputTitle';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';
import { JournalCollectedSeafood } from '@/api/journalCreate/types';
import { useRef, useEffect } from 'react';
import { UploadImageButton } from '../UploadImageButton';
import AddAPhotoIcon2 from '@/icons/journal/add-a-photo2.svg?react';
import CloseIcon from '@/icons/journal/close.svg?react';
import { IconButton } from '@/components/IconButton';
import { useJournalStore } from '@/stores';
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

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const prevPhotosLengthRef = useRef(collectedSeafoods.length);

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

  const handleImageUploadScroll = () => {
    if (
      imageContainerRef.current &&
      collectedSeafoods.length > prevPhotosLengthRef.current
    ) {
      imageContainerRef.current.scrollTo({
        left: imageContainerRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
    prevPhotosLengthRef.current = collectedSeafoods.length;
  };

  useEffect(() => {
    handleImageUploadScroll();
  }, [collectedSeafoods]);

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
              onImageUpload={handleSeafoodImageUpload}
              icon={<AddAPhotoIcon2 />}
              text={<span className="text-xs">추가</span>}
            />
            {collectedSeafoods.map((collectedSeafood, index) => (
              <div
                key={collectedSeafood.objectKey}
                className="relative size-24 shrink-0"
              >
                <div className="relative">
                  <img
                    src={URL.createObjectURL(collectedSeafood.file)}
                    alt="업로드된 이미지"
                    className="size-full rounded-xl border border-gray-200 object-cover"
                    style={{
                      clipPath:
                        "path('M0 10.81% C0 4.84%, 5.59% 0, 12.5% 0 H87.5% C94.44% 0, 100% 4.84%, 100% 10.81% V75.68% C100% 81.61%, 94.44% 86.49%, 87.5% 86.49% H62.63% L53.69% 100% C52.05% 102.4%, 48% 102.4%, 46.41% 100% L37.36% 86.49% H12.5% C5.59% 86.49%, 0 81.61%, 0 75.68% V10.81% Z')",
                      WebkitClipPath:
                        "path('M0 10.81% C0 4.84%, 5.59% 0, 12.5% 0 H87.5% C94.44% 0, 100% 4.84%, 100% 10.81% V75.68% C100% 81.61%, 94.44% 86.49%, 87.5% 86.49% H62.63% L53.69% 100% C52.05% 102.4%, 48% 102.4%, 46.41% 100% L37.36% 86.49% H12.5% C5.59% 86.49%, 0 81.61%, 0 75.68% V10.81% Z')",
                    }}
                  />
                </div>
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
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};
