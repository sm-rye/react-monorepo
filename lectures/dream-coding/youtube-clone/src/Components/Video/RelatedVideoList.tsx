import React, { useEffect } from "react";

import VideoCard from "./VideoCard";

export default function RelatedVideoList({
  relatedVideos,
}: {
  relatedVideos: any;
}) {
  if (!relatedVideos) return <div>채널 아이디를 찾을 수 없숨 </div>;

  return (
    <div>
      {/* <VideoCard /> */}
      {relatedVideos.map((video) => (
        <VideoCard
          videoCardObj={{ title, channelTitle, publishedAt, description }}
        />
      ))}
    </div>
  );
}
