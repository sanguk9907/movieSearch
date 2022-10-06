import React from "react";

function SearchMovieCard({ movie }) {
  return (
    <div className="movie-wrap">
      {movie &&
        movie.map((item, index) => {
          return (
            <div key={`movie-${index}`} className="movie-card">
              <div
                className="img-box"
                style={{
                  backgroundImage: `url("https://image.tmdb.org/t/p/w500/${item.poster_path}")`,
                }}
              ></div>
              <p className="title">{item.title}</p>
            </div>
          );
        })}
    </div>
  );
}

export default SearchMovieCard;
