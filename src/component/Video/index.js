import React from "react";

const Video = ({ showVideo }) => {
  return (
    <div>
      <iframe
        // key={Math.floor(Math.random() * 1000000 + 1)}
        className="videoScreen"
        src={`https://www.youtube.com/embed/${showVideo}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default Video;
