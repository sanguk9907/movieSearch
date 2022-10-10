import React from "react";
import { instance } from "../apis";

const fetchData = (url, setMovie) => {
  instance
    .get(url, {
      params: {
        language: "ko",
      },
    })
    .then((response) => {
      setMovie(response.data.results);
    });
};

// 영화 id로 영화 상세정보 불러오기
const detailData = (movieId, setMovieDetail) => {
  instance
    .get(`movie/${movieId}`, {
      params: {
        append_to_response: "videos,similar,credits",
        language: "ko",
        region: "ko",
      },
    })
    .then((response) => {
      const detailData = response.data;
      setMovieDetail(detailData);
      // console.log(detailData);
    })
    .catch();
};

export { fetchData, detailData };
