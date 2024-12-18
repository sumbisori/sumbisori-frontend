import { HomeYoutube } from './HomeYoutube';
import { YoutubeVideoType } from '../../api/home';

interface HomeYoutubeListProps {
  videos: YoutubeVideoType[];
  selectedVideo: YoutubeVideoType | null;
  onSelectToPlay: (video: YoutubeVideoType) => void;
  onSelectToClose: () => void;
}

export const HomeYoutubeList = ({
  videos,
  selectedVideo,
  onSelectToPlay,
  onSelectToClose,
}: HomeYoutubeListProps) => {
  return (
    <div>
      {/* 영상 리스트 */}
      {videos.length > 0 && (
        <ul className="flex flex-col gap-3">
          {videos.map((video) => (
            <HomeYoutube
              key={video.videoId}
              video={video}
              selectedVideoId={selectedVideo?.videoId || null}
              onSelectToPlay={(video: YoutubeVideoType) =>
                onSelectToPlay(video)
              }
              onSelectToClose={onSelectToClose}
            />
          ))}
        </ul>
      )}

      {videos.length === 0 && (
        <div className="flex h-[25rem] w-full flex-col items-center justify-center text-lg font-bold text-gray-900">
          관련 영상이 없습니다.
          <img src="/images/haenyeo_sad.png"></img>
        </div>
      )}
    </div>
  );
};
