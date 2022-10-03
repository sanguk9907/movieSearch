import React from "react";
import { MovieCard, SearchBox } from "../components";
import axios from "axios";
import Apis from "../helper/Apis";

function Main() {
  const [movieList, setMovieList] = React.useState([]);
  const [searchData, setSearchData] = React.useState({
    searchTitle: "",
  });

  const searchMovie = async () => {
    await axios({
      url: "http://localhost:5000/movie",
      method: "get",
    })
      .then((response) => {
        const data = response.data.results;
        const imageBase = `https://image.tmdb.org/t/p/w500/`;
        data.map((item) => {
          item.poster_path = imageBase + item.poster_path;
          item.backdrop_path = imageBase + item.backdrop_path;
          return item;
        });
        setMovieList(data);
        console.log(response);
      })
      .catch(() => {
        console.log("에러");
      })
      .finally(() => {});
  };

  React.useEffect(() => {
    searchMovie();
  }, [searchData]);

  const searchInputValue = (x) => {
    setSearchData(x);
    console.log(searchData);
  };

  return (
    <div className="main-wrap">
      <SearchBox searchInputValue={searchInputValue} />
      <p className="totalText">
        {searchData.searchTitle === ""
          ? "찾으시는 영화를 검색해주세요"
          : `"${searchData.searchTitle}"검색 결과 총${
              movieList.total === undefined ? "0" : movieList.total
            }개의 영화가 검색되었습니다.`}
      </p>
      {movieList &&
        movieList.map((item, index) => {
          return <MovieCard key={`movieCard-${index}`} data={item} />;
        })}
    </div>
  );
}

export default Main;
