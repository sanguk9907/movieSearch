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
      params: { searchTitle: "어벤저스", display: 20 },
    })
      .then((response) => {
        const data = response.data.items;
        data.map((item) => {
          movieList.push(item);
          return setMovieList(movieList);
        });

        console.log(movieList);
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
    <>
      <SearchBox />
      <MovieCard title={movieList.title} />
    </>
  );
}

export default Main;
