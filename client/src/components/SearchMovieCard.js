import React from "react";
import { instance } from "../apis";
import { movieProvider } from "../helper/fetchData";
import MovieDetail from "./MovieDetail";
import { detailData } from "../helper/fetchData";

function SearchMovieCard({ movie }) {
  const [movieDetail, setMovieDetail] = React.useState();
  const [providerData, setProviderData] = React.useState();
  return (
    <div className="movie-wrap">
      {movie &&
        movie.map((item, index) => {
          return (
            <div key={`movie-${index}`} className="movie-card">
              <div
                className="img-box"
                onClick={() => {
                  detailData(item.id, setMovieDetail);
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
