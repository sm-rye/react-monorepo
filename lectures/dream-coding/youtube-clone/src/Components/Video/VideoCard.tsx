import React from "react";

export default function VideoCard({
  videoCardObj,
  thumb,
  onClick,
}: {
  videoCardObj: { title: string; channelTitle: string; publishedAt: string };
  thumb: any;
  onClick: () => void;
}) {
  const { title, channelTitle, publishedAt } = videoCardObj;

  return (
    <div onClick={onClick}>
      <div>
        <img src={thumb.high.url} alt="thumb" />
      </div>
      <h1>{title}</h1>
      <div>
        <p>{channelTitle}</p>
        <p>{publishedAt}</p>
      </div>
    </div>
  );
}
