import React from "react";

import MovieInfo from "@/app/components/MovieInfo";
import MovieVideos from "@/app/components/MovieVideos";
import { Suspense } from "react";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-y-5">
      <h1>SUSPENSE compo</h1>
      <Suspense fallback={<div>열심히 로딩중인데요</div>}>
        <MovieInfo id={id} />
      </Suspense>

      <Suspense fallback={<div>열심히 로딩중인데요! 비됴</div>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
