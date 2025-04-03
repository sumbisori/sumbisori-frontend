interface HomeYoutubeVideoIframeProps {
  src: string;
  allow?: string;
  allowFullScreen?: boolean;
}

export const HomeYoutubeVideoIframe = ({
  src,
  allow = 'autoplay; encrypted-media',
  allowFullScreen = true,
}: HomeYoutubeVideoIframeProps) => {
  return (
    <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
      <iframe
        className="absolute left-0 top-0 size-full rounded-md"
        src={src}
        allow={allow}
        allowFullScreen={allowFullScreen}
      ></iframe>
    </div>
  );
};
