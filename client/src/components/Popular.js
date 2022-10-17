import React from "react";
import MovieCard from "./MovieCard";
import { requests } from "../apis";
import { fetchData } from "../helper/fetchData";
import axios from "axios";

function Popular() {
  const [movie, setMovie] = React.useState([]);

  React.useEffect(() => {
    fetchData(requests.Popular, setMovie);
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
