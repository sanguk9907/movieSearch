import React from "react";
import { requests } from "../apis";
import { fetchData } from "../helper/fetchData";
import MovieCard from "./MovieCard";

function Upcoming() {
  const [movie, setMovie] = React.useState([]);

  React.useEffect(() => {
    fetchData(requests.Upcoming, setMovie);
  }, []);

  return (
    <>
      <div className="text-box">
        <h3>상영 예정작</h3>
        <p>Upcoming</p>
      </div>
      <div className="movieCard-wrap">
        <MovieCard movie={movie} />
      </div>
    </>
  );
}

export default Upcoming;
