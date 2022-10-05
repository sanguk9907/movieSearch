import React from "react";
import { instance, requests } from "../apis";
import MovieCard from "./MovieCard";

function Trending() {
  const [movie, setMovie] = React.useState([]);

  //   인기있는 영화 데이터 받아오기
  const fetchData = () => {
    instance
      .get(requests.Trending, {
        params: {
          language: "ko",
        },
      })
      .then((response) => {
        setMovie(response.data.results);
      });
  };

  React.useEffect(() => {
    fetchData();
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
