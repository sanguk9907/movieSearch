import React from "react";
import MovieCard from "./MovieCard";
import { requests } from "../apis";
import { fetchData } from "../apis/fetchData";
import axios from "axios";
import { StoreContext } from "../App";

function Popular() {
  const [movie, setMovie] = React.useState([]);
  const { loading, setLoading } = React.useContext(StoreContext);

  React.useEffect(() => {
    fetchData(requests.Popular, setMovie, setLoading);
  }, []);

  return (
    <>
      <div className="text-box">
        <h3>가장 인기있는</h3>
        <p>Popular</p>
      </div>
      <div className="movieCard-wrap">
        <MovieCard movie={movie} />
      </div>
    </>
  );
}

export default Popular;
