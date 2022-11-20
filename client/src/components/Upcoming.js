import React from "react";
import MovieCard from "./MovieCard";

function Upcoming({ movie }) {
  return (
    <>
      <div className="text-box">
        <h3>상영 예정작</h3>
        <p>Upcoming</p>
      </div>
      <div className="movieCard-wrap">
        <MovieCard movie={movie} />
      </div>
    </>
  );
}

export default Upcoming;
