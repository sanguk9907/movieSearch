import React from "react";
import MovieCard from "./MovieCard";

function NowPlaying({ movie }) {
  return (
    <>
      <div className="text-box">
        <h3>현재 상영중인</h3>
        <p>NowPlaying</p>
      </div>
      <div className="movieCard-wrap">
        <MovieCard movie={movie} />
      </div>
    </>
  );
}

export default NowPlaying;
