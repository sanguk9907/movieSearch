import React from "react";
import { instance } from "../apis";
import { movieProvider } from "../helper/fetchData";
import MovieDetail from "./MovieDetail";

function SearchMovieCard({ movie }) {
  const [movieDetail, setMovieDetail] = React.useState();
  const [providerData, setProviderData] = React.useState();

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
                  movieProvider(item.id, setProviderData);
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
          provider={providerData}
          setProviderData={setProviderData}
        />
      )}
    </div>
  );
}

export default SearchMovieCard;
