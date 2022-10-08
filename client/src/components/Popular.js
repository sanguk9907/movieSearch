import React from "react";
import { instance, requests } from "../apis";
import MovieCard from "./MovieCard";

function Popular() {
  // 불러온 영화 정보를 담는 스테이트
  const [movie, setMovie] = React.useState([]);

  // 영화정보 불러오기
  const fetchData = () => {
    instance
      .get(requests.Popular, {
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
