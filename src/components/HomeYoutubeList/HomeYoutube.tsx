import { YoutubeVideoType } from '@/api/home';
import { formatViewCount } from '@/util/formatViewCount';
import { formatYoutubeDate } from '@/util/formatYoutubeDate';
import { truncateTitle } from '@/util/truncateTitle';
import { HomeYoutubeVideoIframe } from './HomeYoutubeVideoIframe';
import PlayIcon from '@/icons/play.svg?react';
import CloseIcon from '@/icons/close.svg?react';

interface HomeYoutubeProps {
  video: YoutubeVideoType;
  selectedVideoId: string | null;
  onSelectToPlay: (video: YoutubeVideoType) => void;
  onSelectToClose: () => void;
}

export const HomeYoutube = ({
  video,
  selectedVideoId,
  onSelectToPlay,
  onSelectToClose,
}: HomeYoutubeProps) => {
  const isPlaying = video.videoId === selectedVideoId;
  const handleControl = () => {
    if (isPlaying) {
      onSelectToClose();
    } else {
      onSelectToPlay(video);
    }
  };

  return (
    <li className="flex flex-col gap-3">
      <div className="grid grid-cols-[4fr_6fr] gap-2 rounded-sm">
        <div className="relative">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            style={{
              aspectRatio: '16 / 9', // 16:9 비율 유지
            }}
            className="w-full cursor-pointer rounded-md object-cover"
            onClick={handleControl}
          />
          {isPlaying && (
            <div className="absolute inset-0 rounded-md bg-black opacity-60"></div>
          )}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70"
            onClick={handleControl}
          >
            {!isPlaying && <PlayIcon className="size-10" />}
            {isPlaying && (
              <div className="flex items-center gap-1">
                <span className="text-white">닫기</span>
                <CloseIcon className="size-5" />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[0.1rem]">
          <h5
            className="cursor-pointer text-sm leading-tight text-blue-700 hover:underline"
            onClick={() => onSelectToPlay(video)}
          >
            {truncateTitle(video.title, 50)}
          </h5>
          <div className="text-xs text-gray-600">{video.channelTitle}</div>
          <div className="flex flex-nowrap gap-[0.1rem] text-xs text-gray-600">
            <p>Youtube</p>
            <p>•</p>
            <p>{formatYoutubeDate(video.publishTime)}</p>
            <p>•</p>
            <p>조회수 {formatViewCount(video.viewCount)}</p>
          </div>
        </div>
      </div>

      {isPlaying && (
        <HomeYoutubeVideoIframe
          src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}
    </li>
  );
};
