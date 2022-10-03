import React from "react";

function MovieCard(props) {
  const title = props.data.title;
  const image = props.data.poster_path;
  const director = props.data.director;
  const actor = props.data.actor;
  const userRating = props.data.vote_average;
  const pubDate = props.data.release_date;
  const subtitle = props.data.original_title;
  const overview = props.data.overview;

  return (
    <div className="moviecard-wrap">
      <div className="movie-imgbox">
        <img src={image} alt={title} />
        <div className="title-box">
          <h3 className="movie-title">{title}</h3>

          <p
            className="subtitle"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
          <p className="pubDate">({pubDate})</p>
        </div>
      </div>
      {/* <p className="director">
        감독 : <b>{director === "" ? "정보없음" : director}</b>
      </p>
      <p className="actor">
        출연배우 : <b>{actor === "" ? "정보없음" : actor}</b>
      </p> */}
      <p className="overview">
        줄거리 : <b>{overview === "" ? "정보없음" : overview}</b>
      </p>
      <p>
        평점 : <b>{userRating === "0.00" ? "정보없음" : userRating}</b>
      </p>
    </div>
  );
}

export default MovieCard;
