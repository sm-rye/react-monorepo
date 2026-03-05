import React from "react";

import { API_URL } from "../constants";

const getMovieVideos = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}/videos`);
  const data = await response.json();

  return data;
};

export default async function MovieVideos({ id }: { id: string }) {
  const movies = await getMovieVideos(id);
  return (
    <div>
      <div>
        <h4>Movie movies - SUSPENSE</h4>
        <div>{JSON.stringify(movies)}</div>
      </div>
    </div>
  );
}
