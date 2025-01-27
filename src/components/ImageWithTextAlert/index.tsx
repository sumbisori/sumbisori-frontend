interface Props {
  src: string;
  alt: string;
  text: string;
}

export const ImageWithTextAlert = ({ src, alt, text }: Props) => {
  return (
    <div className="flex size-full flex-col items-center justify-center text-center text-lg font-bold text-gray-900">
      {/* 이미지 */}
      <img className="size-[8.5rem]" src={src} alt={alt}></img>
      {/* 텍스트 */}
      <span className="whitespace-pre-wrap">{text}</span>
    </div>
  );
};
