import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import VideoCard from "../../Components/Video/VideoCard";
import { fetchPopularVideos, fetchSearchedVideos } from "../../api/Video";

export default function VideoListPage() {
  const { q } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [videos, setVideos] = useState<undefined | any>();

  const getPopularsVideos = async () => await fetchPopularVideos();
  const getSearchedVideos = async (keyword: string) =>
    await fetchSearchedVideos(keyword);

  const getVideos = async () => {
    const result = q ? await getSearchedVideos(q) : await getPopularsVideos();

    if (q) {
      setVideos(
        result.items.map((video) => {
          return { ...video, id: video.videoId };
        })
      );
    } else if (!location.pathname.includes("watch")) {
      setVideos(result.items);
    }

    console.log(location);
  };

  const handleClick = (videoId: string) => {
    navigate(`/videos/watch/${videoId}`);
  };

  useEffect(() => {
    getVideos();
  }, [q]);

  if (!videos) return <div>데이터 없음</div>;

  return (
    <div>
      {videos?.map((item) => {
        const { title, channelTitle, publishedAt, thumbnails } = item.snippet;
        const AGO = `${publishedAt} 가공예정`;

        return (
          <VideoCard
            key={item.id}
            videoCardObj={{ title, channelTitle, publishedAt: AGO }}
            thumb={thumbnails}
            onClick={() => handleClick(item.id)}
          />
        );
      })}
    </div>
  );
}
