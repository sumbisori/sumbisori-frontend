import { YoutubeVideoType } from '../../api/home';
import { formatYoutubeDate } from '../../util/formatYoutubeDate';
import { truncateTitle } from '../../util/truncateTitle';

interface HomeYoutubeProps {
  video: YoutubeVideoType;
  onSelectToPlay: (video: YoutubeVideoType) => void;
}

export const HomeYoutube = ({ video, onSelectToPlay }: HomeYoutubeProps) => {
  return (
    <div className="grid grid-cols-[4fr_6fr] gap-2 rounded-sm">
      <div className="relative">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          style={{
            aspectRatio: '16 / 9', // 16:9 비율 유지
          }}
          className="w-full cursor-pointer rounded-md object-cover"
          onClick={() => onSelectToPlay(video)}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70"
          onClick={() => onSelectToPlay(video)}
        >
          <img src="/icons/play.svg" className="size-10" alt="play"></img>
        </div>
      </div>
      <div>
        <h5
          className="cursor-pointer text-sm leading-tight text-blue-700 hover:underline"
          onClick={() => onSelectToPlay(video)}
        >
          {truncateTitle(video.title, 60)}
        </h5>
        <p className="text-xs text-gray-600">
          Youtube<span>•</span>
          {formatYoutubeDate(video.publishTime)}
        </p>
      </div>
    </div>
  );
};
