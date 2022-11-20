import React from "react";

import MovieCard from "./MovieCard";

function TopRated({ movie }) {
  return (
    <>
      <div className="text-box">
        <h3>최고의 평가</h3>
        <p>TopRated</p>
      </div>
      <div className="movieCard-wrap">
        <MovieCard movie={movie} />
      </div>
    </>
  );
}

export default TopRated;
