import React from "react";
import {
  Popular,
  Upcoming,
  Trending,
  TopRated,
  NowPlaying,
  SearchBox,
} from "../components/";

function Main() {
  return (
    <div className="main-wrap">
      <SearchBox />
      <Popular />
      <Upcoming />
      <Trending />
      <TopRated />
      <NowPlaying />
    </div>
  );
}

export default Main;
