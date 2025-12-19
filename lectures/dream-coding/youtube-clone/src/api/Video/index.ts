import axiosInstance from "../axiosInstance";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const MAX = 25;

export const fetchPopularVideos = async () => {
  const res = await axiosInstance.get("/videos", {
    params: {
      part: "snippet",
      chart: "mostPopular",
      maxResults: MAX,
      key: API_KEY,
    },
  });

  return res.data;
};

export const fetchSearchedVideos = async (keyword: string) => {
  const res = await axiosInstance.get("/search", {
    params: {
      q: keyword,
      part: "snippet",
      maxResults: MAX,
      key: API_KEY,
    },
  });

  return res.data;
};

export const fetchVideoDetail = async (videoId: string) => {
  const res = await axiosInstance.get("/search", {
    params: {
      id: videoId,
      part: "snippet",
      key: API_KEY,
    },
  });

  return res.data;
};
