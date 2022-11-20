import React from "react";
import MovieCard from "./MovieCard";

function Trending({ movie }) {
  return (
    <>
      <div className="text-box">
        <h3>인기 급상승</h3>
        <p>Trending</p>
      </div>
      <div className="movieCard-wrap">
        <MovieCard movie={movie} />
      </div>
    </>
  );
}

export default Trending;
