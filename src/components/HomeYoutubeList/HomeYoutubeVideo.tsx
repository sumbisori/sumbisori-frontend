import { Button } from '../Button';

interface HomeYoutubeVideoProps {
  selectedVideoId: string;
  onClose: () => void;
}

export const HomeYoutubeVideo = ({
  selectedVideoId,
  onClose,
}: HomeYoutubeVideoProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative">
        <iframe
          className="h-[50vh] w-[393px] rounded-md"
          src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>

        <img
          src="icons/back.svg"
          alt="Close"
          onClick={onClose}
          className="absolute -top-10 left-0 size-8 cursor-pointer"
        />
      </div>
    </div>
  );
};
