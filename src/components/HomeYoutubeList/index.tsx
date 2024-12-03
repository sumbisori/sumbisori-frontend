import React, { useState } from 'react';
import { HomeYoutube } from './HomeYoutubeThumbnail';
import { HomeYoutubeVideo } from './HomeYoutubeVideo';
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
        <div className="flex flex-col gap-3">
          {videos.map((video) => (
            <HomeYoutube
              key={video.videoId}
              video={video}
              onSelectToPlay={(video: YoutubeVideoType) => handlePlay(video)}
            />
          ))}
        </div>
      )}

      {videos.length === 0 && (
        <div className="flex h-[400px] w-full flex-col items-center justify-center text-lg font-bold text-gray-900">
          관련 영상이 없습니다.
          <img src="/images/haenyeo_sad.png"></img>
        </div>
      )}

      {/* iframe 팝업 */}
      {selectedVideo && (
        <HomeYoutubeVideo
          selectedVideoId={selectedVideo.videoId}
          onClose={handleClose}
        />
      )}
    </div>
  );
};
