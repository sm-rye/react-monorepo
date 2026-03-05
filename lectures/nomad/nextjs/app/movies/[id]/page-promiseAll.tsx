import { API_URL } from "@/app/constants";
import React from "react";

const getMovieInfo = async (id: string) => {
  // Promise는  "나 이제 다 끝났어!"라고 외쳐주기 전까지는 계속 기다리는 성질이 있다.
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();

  return data;
};

const getMovieVideos = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}/videos`);
  const data = await response.json();

  return data;
};

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [info, videos] = await Promise.all([
    getMovieInfo(id),
    getMovieVideos(id),
  ]);

  return (
    <div>
      <h1>{id} MovieDetailPage</h1>
      <div>
        <h4>Movie INFO</h4>
        <div>{JSON.stringify(info)}</div>
      </div>
      <div>
        <h4>Movie VIDEO</h4>
        <div>{JSON.stringify(videos)}</div>
      </div>
    </div>
  );
}
