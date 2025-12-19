import { useQuery } from "@tanstack/react-query";
import {
  fetchPopularVideos,
  fetchSearchedVideos,
  fetchVideoDetail,
  fectchChannelInfo,
} from "../api/Video";

// 비디오 데이터 타입 정의
export interface VideoItem {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: any;
  };
}

export function useVideos(keyword?: string) {
  return useQuery({
    // 키워드가 바뀌면 캐시도 따로 관리됨
    queryKey: ["videos", keyword || "popular"],

    // 실제 API 호출 로직
    queryFn: () =>
      keyword ? fetchSearchedVideos(keyword) : fetchPopularVideos(),

    // UI에서 쓰기 좋게 데이터 정규화 (Select 레이어)
    select: (data): VideoItem[] =>
      data.items.map((item: any) => {
        // 1. ID 통합 추출 로직
        // 검색 결과(object)일 경우 videoId, channelId, playlistId 중 있는 것을 사용
        // 인기 비디오(string)일 경우 그대로 사용
        const id =
          typeof item.id === "string"
            ? item.id
            : item.id.videoId || item.id.channelId || item.id.playlistId;

        return {
          ...item,
          id: id || item.etag, // 만약의 경우를 대비해 etag를 fallback으로 사용
        };
      }),

    // 추가 옵션 (예: 5분간 캐시 유지)
    staleTime: 1000 * 60 * 5,
  });
}

export function useVideoDetail(videoId: string) {
  const videoQuery = useQuery({
    queryKey: ["video", videoId],
    queryFn: async () => {
      const res = await fetchVideoDetail(videoId);
      // 데이터가 없으면 null을 반환하거나 에러를 throw하여 undefined를 방지합니다.
      if (!res.items || res.items.length === 0) {
        throw new Error("Video not found");
      }
      return res.items[0];
    },
    enabled: !!videoId,
    retry: false, // 없는 비디오일 경우 여러 번 재시도할 필요 없음
  });

  const channelId = videoQuery.data?.snippet?.channelId;

  const channelQuery = useQuery({
    queryKey: ["channel", channelId],
    queryFn: () => fectchChannelInfo(channelId!).then((res) => res.items[0]),
    enabled: !!channelId,
  });

  return {
    video: videoQuery.data,
    channel: channelQuery.data,
    isLoading: videoQuery.isLoading || channelQuery.isLoading,
    // videoQuery에서 던진 에러를 UI에 전달
    error: videoQuery.error || channelQuery.error,
  };
}
