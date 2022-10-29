import React from "react";
import { requests } from "../apis";
import { StoreContext } from "../App";
import { fetchData } from "../helper/fetchData";
import MovieCard from "./MovieCard";

function Trending() {
  const [movie, setMovie] = React.useState([]);
  const { setLoading } = React.useContext(StoreContext);

  React.useEffect(() => {
    fetchData(requests.Trending, setMovie, setLoading);
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
