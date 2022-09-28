import React from "react";
import { MovieCard, SearchBox } from "../components";
import axios from "axios";

function Main() {
  const [movieList, setMovieList] = React.useState([]);

  const searchMovie = async () => {
    const url = "http://localhost:5000/search/movie";
    await axios({
      url: url,
      method: "get",
      params: { title: "어벤져스", display: 100 },
    })
      .then((response) => {
        const data = response.data.items.map((item) => {
          item.director = item.director.slice(0, -1);
          item.actor = item.actor.slice(0, -1);
          item.director = item.director.replaceAll(/\|/g, " | ");
          item.actor = item.actor.replace(/\|/g, " | ");
          item.title = item.title.replace(/\<b>/g, "");
          item.title = item.title.replace(/\<\/b>/g, "");
          return item;
        });
        setMovieList(data);
        console.log(data);
      })
      .catch(() => {
        console.log("에러요");
      })
      .finally(() => {});
  };

  React.useEffect(() => {
    searchMovie();
  }, []);

  return (
    <div className="main-wrap">
      <SearchBox />
      {movieList &&
        movieList.map((item) => {
          return <MovieCard data={item} />;
        })}
    </div>
  );
}

export default Main;
