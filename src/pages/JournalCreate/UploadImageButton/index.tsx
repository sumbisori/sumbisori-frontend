import { ReactNode } from 'react';
import AddAPhotoIcon from '@/icons/journal/add-a-photo.svg?react';

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
    onImageUpload(files);
    e.target.value = '';
  };

  return (
    <label
      className={clsx(
        'flex size-24 shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-500 bg-white text-gray-500 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700 active:border-blue-700 active:bg-blue-50 active:text-blue-700',
      )}
    >
      <input
        type="file"
        accept="image/*"
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
