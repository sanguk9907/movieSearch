import React from "react";
import { Icon } from "semantic-ui-react";

function MovieDetail({ movieDetail, setMovieDetail }) {
  return (
    <div
      className="detail-wrap"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}")`,
      }}
    >
      <div
        className="overlay"
        onClick={() => {
          setMovieDetail(null);
        }}
      ></div>
      <div className="detail-card">
        <Icon
          name="close"
          onClick={() => {
            setMovieDetail(null);
          }}
        />
        <div className="img-box">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`}
          ></img>
          <div className="title">
            <h3>{movieDetail.title}</h3>
            <p className="tag">{movieDetail.tagline}</p>
          </div>
        </div>
        <div className="movie-info">
          <p className="genres">
            장르 :
            {movieDetail.genres.map((item, index) => {
              item.name = ` ${item.name} `;
              return <b key={`genres-${index}`}>{item.name}</b>;
            })}
          </p>

          <p className="overview">
            줄거리
            <br />
            <b>{movieDetail.overview}</b>
          </p>

          <div className="cast">
            출연진
            <br />
            {movieDetail.credits.cast.map((item, index) => {
              item.name = ` ${item.name}, `;
              return <b key={`cast-${index}`}>{item.name}</b>;
            })}
          </div>

          <div className="videos">
            <iframe
              src={`https://www.youtube.com/embed/${movieDetail.videos.results[0].key}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>

          <div className="similar">
            <b>비슷한 영화</b>
            <div>
              {movieDetail.similar.results.map((item, index) => {
                return (
                  <div key={`similar-${index}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                    ></img>
                    <p>{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
