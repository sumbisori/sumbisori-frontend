import { ReactNode } from 'react';
import AddAPhotoIcon from '@/icons/journal/add-a-photo.svg?react';
import { toast } from '@/components/Toast';
import { ERROR_MESSAGE } from '@/constant/src/error';

interface UploadImageButtonProps {
  icon?: ReactNode;
  text?: ReactNode;
  onImageUpload: (files: File[]) => void;
}

export const UploadImageButton = ({
  icon = <AddAPhotoIcon />,
  text = <span className="text-sm">이미지 추가</span>,
  onImageUpload,
}: UploadImageButtonProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const MAX_SIZE = 10 * 1024 * 1024;

    const validFiles = files.filter((file) => {
      if (file.size > MAX_SIZE) {
        toast.error(ERROR_MESSAGE.MAX_PHOTO_SIZE);
        return false;
      }
      return true;
    });

    onImageUpload(validFiles);
    e.target.value = '';
  };

  //   - URL 요청 개수: 1 ~ 10개
  // - 파일 크기: 1 ~ 10 * 1024 * 1024 bytes (1MB ~ 10MB)
  // - 지원되는 콘텐츠 타입:
  //     - image/jpeg
  //     - image/png
  //     - image/gif

  return (
    <label
      className={clsx(
        'flex size-24 shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-500 bg-white text-gray-500 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700 active:border-blue-700 active:bg-blue-50 active:text-blue-700',
      )}
    >
      <input
        type="file"
        accept="image/jpeg, image/png, image/gif"
        multiple
        className="hidden"
        onChange={handleImageChange}
      />
      <div className="flex flex-col items-center justify-center gap-0.5">
        {icon}
        {text}
      </div>
    </label>
  );
};
