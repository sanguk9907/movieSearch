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
      console.log(response.data);
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
    });
};

const movieProvider = (movieId, setProviderData) => {
  instance
    .get(`movie/${movieId}/watch/providers`, {
      params: {
        language: "ko",
        region: "ko",
      },
    })
    .then((response) => {
      const detailData =
        response.data.results.KR &&
        response.data.results.KR.flatrate &&
        response.data.results.KR.flatrate;
      setProviderData(detailData);
      // console.log(detailData);
    });
};

export { fetchData, detailData, movieProvider };
