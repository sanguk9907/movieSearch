import React from "react";
import { instance, requests } from "../apis";
import MovieCard from "./MovieCard";

function NowPlaying() {
  const [movie, setMovie] = React.useState([]);

  //   인기있는 영화 데이터 받아오기
  const fetchData = () => {
    instance
      .get(requests.NowPlaying, {
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
