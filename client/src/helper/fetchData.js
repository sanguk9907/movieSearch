import React from "react";
import { instance, requests } from "../apis";

// const fetchData = async (setMovie) => {
//   await instance
//     .get(`/mainPageData`, {
//       params: {
//         category: requests.Popular,
//       },
//     })
//     .then((response) => {
//       // setMovie(response);
//       console.log(response);
//     });
// };

const fetchData = async (category, setMovie) => {
  await instance
    .get(`/mainPageData`, {
      params: {
        category: category,
      },
    })
    .then(({ data }) => {
      setMovie(data.results);
    });
};

// 영화 id로 영화 상세정보 불러오기
const detailData = async (movieId, setMovieDetail) => {
  await instance
    .get(`/Information`, {
      params: {
        movieId: movieId,
        append_to_response: "videos,similar,credits",
        language: "ko",
        region: "ko",
      },
    })
    .then((response) => {
      const detailData = response.data;
      setMovieDetail(detailData);
    });
};

const movieProvider = (movieId, setProviderData) => {
  instance
    .get(`/providers`, {
      params: {
        movieId: movieId,
        language: "ko",
        region: "ko",
      },
    })
    .then(({ data }) => {
      const detailData =
        data.results.KR && data.results.KR.flatrate && data.results.KR.flatrate;
      setProviderData(detailData);
    });
};

export { fetchData, detailData, movieProvider };
