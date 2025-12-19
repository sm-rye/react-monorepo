import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import VideoCard from "../../Components/Video/VideoCard";

import { useVideos } from "../../hooks/useGetVideos";

export default function VideoListPage() {
  const { q } = useParams<{ q: string }>();
  const navigate = useNavigate();

  const { data: videos, isLoading, error } = useVideos(q);

  const handleVideoClick = (videoId: string) => {
    navigate(`/videos/watch/${videoId}`);
  };

  if (!videos) return <div>데이터 없음</div>;

  if (isLoading) return <div className="p-4 text-center">로딩 중...</div>;
  if (error)
    return (
      <div className="p-4 text-red-500 text-center">
        데이터를 가져오지 못했습니다.
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {videos?.map((video) => (
        <VideoCard
          key={video.id}
          videoCardObj={{
            title: video.snippet.title,
            publishedAt: `${video.snippet.publishedAt} (가공 예정)`,
          }}
          channelObj={{ channelTitle: video.snippet.channelTitle }}
          thumb={video.snippet.thumbnails}
          onClick={() => handleVideoClick(video.id)}
        />
      ))}
    </div>
  );
}
