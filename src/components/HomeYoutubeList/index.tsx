import { IMAGE_PATHS } from '@/constant';
import { ImageWithTextAlert } from '../ImageWithTextAlert';
import { HomeYoutube } from './HomeYoutube';
import { YoutubeVideoType } from '@/api/home';
import { HomeYoutubeSkeleton } from './HomeYoutubeSkeleton';
import { useState } from 'react';

interface HomeYoutubeListProps {
  videos: YoutubeVideoType[];
  youtubeLoading: boolean;
  youtubeError: boolean;
}

export const HomeYoutubeList = ({
  videos,
  youtubeLoading,
  youtubeError,
}: HomeYoutubeListProps) => {
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideoType | null>(
    null,
  );

  const handlePlay = (video: YoutubeVideoType) => {
    setSelectedVideo(video);
  };

  const handleClose = () => {
    setSelectedVideo(null);
  };

  if (youtubeLoading) {
    return (
      <ul className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <HomeYoutubeSkeleton key={index} />
        ))}
      </ul>
    );
  }

  if (youtubeError) {
    return (
      <div className="h-[25rem]">
        <ImageWithTextAlert
          src={`${IMAGE_PATHS.ROOT}/haenyeo_sad.png`}
          alt="정보없음"
          text="관련 영상을 불러오는 중 문제가 발생했습니다."
        />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="h-[25rem]">
        <ImageWithTextAlert
          src={`${IMAGE_PATHS.ROOT}/haenyeo_sad.png`}
          alt="정보없음"
          text="관련 영상이 없습니다."
        />
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {videos.map((video) => (
        <HomeYoutube
          key={video.videoId}
          video={video}
          selectedVideoId={selectedVideo?.videoId ?? null}
          onSelectToPlay={handlePlay}
          onSelectToClose={handleClose}
        />
      ))}
    </ul>
  );
};
