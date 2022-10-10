import React from "react";
import { requests } from "../apis";
import { fetchData } from "../helper/fetchData";
import MovieCard from "./MovieCard";

function NowPlaying() {
  const [movie, setMovie] = React.useState([]);

  React.useEffect(() => {
    fetchData(requests.NowPlaying, setMovie);
  }, []);

  return (
    <>
      <div className="text-box">
        <h3>현재 상영중인</h3>
        <p>NowPlaying</p>
      </div>
      <div className="movieCard-wrap">
        <MovieCard movie={movie} />
      </div>
    </>
  );
}

export default NowPlaying;
