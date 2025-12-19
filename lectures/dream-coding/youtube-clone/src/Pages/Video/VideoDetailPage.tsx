import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideoDetail, fectchRelatedVideo } from "../../api/Video";

import VideoCard from "../../Components/Video/VideoCard";
import RelatedVideoList from "../../Components/Video/RelatedVideoList";

export default function VideoDetailPage() {
  const [videoDetail, setVideoDetail] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const { videoId } = useParams();

  const getVideoDetail = async (videoId: string) => {
    const result = await fetchVideoDetail(videoId);
    if (result.items[0].snippet.channelId) {
      const channelResult = await fectchRelatedVideo(
        result.items[0].snippet.channelId
      );
      setRelatedVideos(channelResult);
    }
    setVideoDetail(result.items[0]);
  };

  useEffect(() => {
    if (videoId) {
      getVideoDetail(videoId);
    }
  }, [videoId]);

  if (!videoId || !videoDetail) return <div> 조회할 수 없읍니다. </div>;

  const { title, channelTitle, publishedAt, description } = videoDetail.snippet;

  return (
    <div>
      <VideoCard
        videoCardObj={{ title, publishedAt, description }}
        player={videoDetail?.player?.embedHtml}
        channelObj={{ channelTitle }}
      />
    </div>
  );
}
