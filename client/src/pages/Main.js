import React from "react";
import {
  Popular,
  Upcoming,
  Trending,
  TopRated,
  NowPlaying,
  SearchBox,
  SearchResultText,
} from "../components";
import { useNavigate } from "react-router-dom";

function Main() {
  const [search, setSearch] = React.useState({
    searchTitle: "",
    genre: "",
    country: "",
  });
  const searchInputValue = (x) => {
    setSearch(x);
  };

  const navigation = useNavigate();
  return (
    <div className="main-wrap">
      {/* <SearchBox searchInputValue={searchInputValue} /> */}
      <div
        class="main-test"
        onClick={() => {
          navigation("/search", {
            code: "good",
          });
        }}
      ></div>
      <div className="searchResultText">
        {search.searchTitle === "" ? (
          <p>카테고리별 베스트 20선</p>
        ) : (
          <p>{`"${search.searchTitle}"의 검색결과`}</p>
        )}
        {console.log(search)}
      </div>
      <Popular />
      <Upcoming />
      <Trending />
      <TopRated />
      <NowPlaying />
    </div>
  );
}

export default Main;
