import React from "react";
import Link from "next/link";

import { API_URL } from "../constants";

const getMovies = async () => {
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
};

export default async function MoviePage() {
  const movies = await getMovies();
  return (
    <div>
      {movies.map((m) => (
        <li key={m.id}>
          <Link href={`/movies/${m.id}`}>{m.title}</Link>
        </li>
      ))}
    </div>
  );
}
