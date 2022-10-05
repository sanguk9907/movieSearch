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

function Main() {
  const [search, setSearch] = React.useState({
    searchTitle: "",
    genre: "",
    country: "",
  });
  const searchInputValue = (x) => {
    setSearch(x);
  };
  return (
    <div className="main-wrap">
      <SearchBox searchInputValue={searchInputValue} />
      <SearchResultText search={search} />
      <Popular />
      <Upcoming />
      <Trending />
      <TopRated />
      <NowPlaying />
    </div>
  );
}

export default Main;
