import React from "react";
import { movieProvider } from "../apis/fetchData";
import { detailData } from "../apis/fetchData";
import { StoreContext } from "../App";
import notFoundImg from "../not-found.jpg";

function SearchMovieCard({ movie }) {
  const { setMovieDetail, setProviderData } = React.useContext(StoreContext);

  function bodyClick(event) {
    const target = event.target;
    const detail_card = target.closestByClass("detail-card");

    if (!detail_card) {
      setMovieDetail(null);
    }
  }

  React.useEffect(() => {
    window.addEventListener("click", bodyClick);

    return () => {
      window.removeEventListener("click", bodyClick);
    };
  }, []);
  return (
    <div className="movie-wrap">
      {movie &&
        movie.map((item, index) => {
          return (
            <div key={`movie-card-${index}`} className="movie-card">
              <div
                className="img-box"
                onClick={async () => {
                  const items = await detailData([item.id]);
                  setMovieDetail(items[0]);
                  movieProvider(item.id, setProviderData);
                }}
                style={{
                  backgroundImage: !item.poster_path
                    ? `url("${notFoundImg}")`
                    : `url("https://image.tmdb.org/t/p/w500/${item.poster_path}")`,
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
