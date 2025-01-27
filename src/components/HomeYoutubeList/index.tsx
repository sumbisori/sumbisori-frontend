import { ImageWithTextAlert } from '../ImageWithTextAlert';
import { HomeYoutube } from './HomeYoutube';
import { YoutubeVideoType } from '@/api/home';

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
        <div className="h-[25rem]">
          <ImageWithTextAlert
            src="/assets/images/haenyeo_sad.png"
            alt="정보없음"
            text="관련 영상이 없습니다."
          />
        </div>
      )}
    </div>
  );
};
