import React from "react";
import axios from "axios";

const Apis = async (props) => {
  const key = "3cf148810eae178af2afb1a072cfe76d";
  const baseUrl = "https://api.themoviedb.org/3/";
  const url = `${baseUrl}movie/popular`;
  await axios({
    url: url,
    method: "get",
    params: {
      api_key: key,
      language: "ko",
      region: "KR",
    },
  })
    .then((response) => {
      const data = response.data.results;
      const imageBase = `https://image.tmdb.org/t/p/w500/`;
      data.map((item) => {
        item.poster_path = imageBase + item.poster_path;
        item.backdrop_path = imageBase + item.backdrop_path;
        return item;
      });
      console.log(data);
      console.log(response);
      props.setMovieList(data);
    })
    .catch(() => {
      console.log("에러");
    })
    .finally(() => {});

  return;
};

export default Apis;
