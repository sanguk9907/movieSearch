import React from "react";

function MovieCard(props) {
  const title = props.data.title;
  const image = props.data.image;
  const director = props.data.director;
  const actor = props.data.actor;
  const userRating = props.data.userRating;
  const pubDate = props.data.pubDate;
  const link = props.data.link;
  const subtitle = props.data.subtitle;

  return (
    <div className="moviecard-wrap">
      <div className="movie-imgbox">
        <img src={image} alt={title} />
        <h3 className="movie-title">
          {title}({pubDate})<p className="subtitle">{subtitle}</p>
        </h3>
      </div>
      <p className="director">
        감독 : <b>{director === "" ? "정보없음" : director}</b>
      </p>
      <p className="actor">
        출연배우 : <b>{actor === "" ? "정보없음" : actor}</b>
      </p>
      <p>
        평점 : <b>{userRating === "0.00" ? "정보없음" : userRating}</b>
      </p>
      <a href={link} target="blank">
        자세히 보기
      </a>
    </div>
  );
}

export default MovieCard;
