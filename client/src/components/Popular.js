import React from "react";
import MovieCard from "./MovieCard";

function Popular({ movie }) {
  return (
    <>
      <div className="text-box">
        <h3>가장 인기있는</h3>
        <p>Popular</p>
      </div>
      <div className="movieCard-wrap">
        <MovieCard movie={movie} />
      </div>
    </>
  );
}

export default Popular;
