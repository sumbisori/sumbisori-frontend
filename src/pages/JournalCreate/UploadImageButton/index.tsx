interface UploadImageButtonProps {
  selected?: boolean;
  image?: string | null;
  onImageUpload: (file: File) => void;
}

export const UploadImageButton = ({
  selected,
  image,
  onImageUpload,
}: UploadImageButtonProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <label
      className={`flex size-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 ${!selected ? 'border-gray-500 bg-white text-gray-500' : ''} ${selected ? 'border-blue-700 bg-blue-50 text-blue-700' : ''} `}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {image ? (
        <img
          src={image}
          alt="업로드된 이미지"
          className="size-full rounded-lg object-cover"
        />
      ) : (
        <>
          <svg
            className="mb-2 size-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-sm">이미지 추가</span>
        </>
      )}
    </label>
  );
};
