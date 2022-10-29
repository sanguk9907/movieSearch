import React from "react";
import { requests } from "../apis";
import { StoreContext } from "../App";
import { fetchData } from "../helper/fetchData";
import MovieCard from "./MovieCard";

function TopRated() {
  const [movie, setMovie] = React.useState([]);
  const { setLoading } = React.useContext(StoreContext);

  React.useEffect(() => {
    fetchData(requests.TopRated, setMovie, setLoading);
  }, []);

  return (
    <>
      <div className="text-box">
        <h3>최고의 평가</h3>
        <p>TopRated</p>
      </div>
      <div className="movieCard-wrap">
        <MovieCard movie={movie} />
      </div>
    </>
  );
}

export default TopRated;
