import React from "react";

function MovieCard(props) {
  return (
    <div className="moviecard-wrap">
      <h3 className="movie-title">{props.title}</h3>
      <div className="movie-img"></div>
      <p className="">감독</p>
      <p className="acter">출연진</p>
      <p>줄거리</p>
    </div>
  );
}

export default MovieCard;
