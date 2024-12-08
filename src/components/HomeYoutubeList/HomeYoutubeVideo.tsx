interface HomeYoutubeVideoProps {
  selectedVideoId: string;
  onClose: () => void;
}

export const HomeYoutubeVideo = ({
  selectedVideoId,
  onClose,
}: HomeYoutubeVideoProps) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-[37.5rem]">
        <iframe
          className="h-[50vh] w-full min-w-80 rounded-md"
          src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>

        <img
          src="icons/back.svg"
          alt="Close"
          onClick={onClose}
          className="absolute -top-12 left-0 size-8 cursor-pointer"
        />
      </div>
    </div>
  );
};
