import React from "react";
import { instance } from "../apis";
import MovieDetail from "./MovieDetail";

function SearchMovieCard({ movie }) {
  const [movieDetail, setMovieDetail] = React.useState();

  const detailData = (movieId) => {
    instance
      .get(`movie/${movieId}`, {
        params: {
          append_to_response: "videos,similar,credits",
          language: "ko",
          region: "ko",
        },
      })
      .then((response) => {
        const detailData = response.data;
        setMovieDetail(detailData);
        console.log(detailData);
      })
      .catch();
  };
  return (
    <div className="movie-wrap">
      {movie &&
        movie.map((item, index) => {
          return (
            <div key={`movie-${index}`} className="movie-card">
              <div
                className="img-box"
                onClick={() => {
                  detailData(item.id);
                }}
                style={{
                  backgroundImage: `url("https://image.tmdb.org/t/p/w500/${item.poster_path}")`,
                }}
              ></div>
              <p className="title">{item.title}</p>
            </div>
          );
        })}
      {movieDetail && (
        <MovieDetail
          movieDetail={movieDetail}
          setMovieDetail={setMovieDetail}
        />
      )}
    </div>
  );
}

export default SearchMovieCard;
