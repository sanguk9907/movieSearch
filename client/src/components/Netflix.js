import React from "react";
import MovieCard from "./MovieCard";

function Netflix({ movie }) {
  return (
    <>
      <div className="text-box">
        <h3>넷플릭스에서 방영중인</h3>
        <p>Netflix</p>
      </div>
      <div className="movieCard-wrap">
        <MovieCard movie={movie} />
      </div>
    </>
  );
}

export default Netflix;
