import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { InputTitle } from '../InputTitle';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';
import { UploadImageButton } from '../UploadImageButton';
import { useState } from 'react';
import AddAPhotoIcon from '@/icons/journal/add-a-photo.svg?react';
import CloseIcon from '@/icons/journal/close.svg?react';
import { IconButton } from '@/components/IconButton';

export const SelectPhoto = () => {
  const [imageList, setImageList] = useState<string[]>([]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageList((prev) => [...prev, reader.result as string]);
    };

    reader.readAsDataURL(file);
  };

  const handleImageDelete = (index: number) => {
    setImageList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <InputTitle
        title={JOURNAL_CREATE_INPUT_TITLE('photo').title}
        subtitle={JOURNAL_CREATE_INPUT_TITLE('photo').subtitle}
      />

      <motion.div className="p-4" {...animationY(0.6)}>
        <div className="flex flex-col gap-6">
          <div
            id="image-container"
            className="hide-scroll flex gap-3 overflow-x-auto pb-1 pr-1 pt-2"
          >
            <UploadImageButton
              onImageUpload={handleImageUpload}
              icon={<AddAPhotoIcon />}
              text={
                <span className="text-xs">
                  <span className="text-blue-700">{imageList.length}</span>
                  <span>/</span>
                  <span>10</span>
                </span>
              }
            />
            {imageList.map((image, index) => (
              <div key={index} className="relative size-24 shrink-0">
                <img
                  src={image}
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
                  <div className="absolute bottom-0 left-0 z-10 flex h-6 w-24 items-center justify-center rounded-b-xl bg-black/40 text-white">
                    <span className="text-xs">대표 사진</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div id="divider" className="h-px w-full bg-gray-200" />
        </div>
      </motion.div>
    </>
  );
};
