import React from "react";
import { requests } from "../apis";
import { fetchData } from "../helper/fetchData";
import MovieCard from "./MovieCard";

function Trending() {
  const [movie, setMovie] = React.useState([]);

  React.useEffect(() => {
    fetchData(requests.Trending, setMovie);
  }, []);

  return (
    <>
      <div className="text-box">
        <h3>인기 급상승</h3>
        <p>Trending</p>
      </div>
      <div className="movieCard-wrap">
        <MovieCard movie={movie} />
      </div>
    </>
  );
}

export default Trending;
