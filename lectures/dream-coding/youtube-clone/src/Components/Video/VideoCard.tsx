import React from "react";

export default function VideoCard({
  videoCardObj,
  channelObj,
  thumb,
  player,
  onClick,
}: {
  videoCardObj: {
    title: string;
    publishedAt: string;
    description?: string;
  };
  channelObj: {
    channelTitle: string;
    thumb?: string;
  };
  thumb?: any;
  player?: any;
  onClick?: () => void;
}) {
  const { title, publishedAt } = videoCardObj;

  return (
    <div
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <div>
        {thumb && <img src={thumb.high.url} alt="thumb" />}
        {player && (
          <div>
            <div
              className="w-full aspect-video rounded-xl overflow-hidden [&>iframe]:w-full [&>iframe]:h-full"
              dangerouslySetInnerHTML={{ __html: player }}
            />
          </div>
        )}
      </div>
      <h1>{title}</h1>
      <div>
        <div className="border">
          <p>{channelObj.channelTitle}</p>
          {channelObj.thumb && (
            <div>
              <img src={channelObj.thumb.default.url} />
            </div>
          )}
        </div>
        <p>{publishedAt}</p>
        {videoCardObj.description && <p>{videoCardObj.description}</p>}
      </div>
    </div>
  );
}
