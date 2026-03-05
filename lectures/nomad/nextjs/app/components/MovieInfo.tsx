import React from "react";
import { API_URL } from "../constants";

const getMovieInfo = async (id: string) => {
  // Promise는  "나 이제 다 끝났어!"라고 외쳐주기 전까지는 계속 기다리는 성질이 있다.
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();

  return data;
};

export default async function MovieInfo({ id }: { id: string }) {
  const info = await getMovieInfo(id);

  return (
    <div>
      <div>
        <h4>Movie INFO - SUSPENSE</h4>
        <div>{JSON.stringify(info)}</div>
      </div>
    </div>
  );
}
