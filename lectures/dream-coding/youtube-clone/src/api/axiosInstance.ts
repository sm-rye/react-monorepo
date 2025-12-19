import axios from "axios";

const axiosInstance = axios.create({
  // 환경 변수 사용
  baseURL: import.meta.env.VITE_YOUTUBE_URL,
  timeout: 5000, // 5초 이상 걸리면 에러
  headers: {
    "Content-Type": "application/json",
  },
});

// (선택) 인터셉터를 설정해두면 나중에 토큰 삽입이나 에러 처리가 매우 쉬워집니다.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 에러 발생:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
