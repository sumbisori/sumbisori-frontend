import React, { useState } from 'react';
import { HomeYoutube } from './HomeYoutube';
import { HomeYoutubeVideoIframe } from './HomeYoutubeVideoIframe';
import { YoutubeVideoType } from '../../api/home';

interface HomeYoutubeListProps {
  videos: YoutubeVideoType[];
}

export const HomeYoutubeList = ({ videos }: HomeYoutubeListProps) => {
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideoType | null>(
    null,
  );

  const handlePlay = (video: YoutubeVideoType) => {
    setSelectedVideo(video);
  };

  const handleClose = () => {
    setSelectedVideo(null);
  };

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
              onSelectToPlay={(video: YoutubeVideoType) => handlePlay(video)}
              onSelectToClose={handleClose}
            />
          ))}
        </ul>
      )}

      {videos.length === 0 && (
        <div className="flex h-[400px] w-full flex-col items-center justify-center text-lg font-bold text-gray-900">
          관련 영상이 없습니다.
          <img src="/images/haenyeo_sad.png"></img>
        </div>
      )}
    </div>
  );
};
