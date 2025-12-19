import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideoDetail, fectchChannelInfo } from "../../api/Video";

import VideoCard from "../../Components/Video/VideoCard";
import { useVideoDetail } from "../../hooks/useGetVideos";

export default function VideoDetailPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const { video, channel, isLoading, error } = useVideoDetail(videoId || "");

  if (isLoading) return <div className="p-4">정보를 불러오는 중...</div>;
  if (error || !video)
    return <div className="p-4">비디오 정보를 조회할 수 없습니다.</div>;

  const { title, channelTitle, publishedAt, description } = video.snippet;

  return (
    <div className="p-4">
      <VideoCard
        videoCardObj={{ title, publishedAt, description }}
        player={video.player?.embedHtml}
        // 채널 정보가 로딩 중일 때를 대비해 옵셔널 체이닝 처리
        channelObj={{
          channelTitle,
          thumb: channel?.snippet?.thumbnails,
        }}
      />
      <div className="mt-8 font-bold text-xl">연관 비디오</div>
      {/* 여기에 연관 비디오 리스트 컴포넌트 추가 가능 */}
    </div>
  );
}
