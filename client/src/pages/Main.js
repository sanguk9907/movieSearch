import React from "react";
import {
  Popular,
  Upcoming,
  Trending,
  TopRated,
  NowPlaying,
  Header,
  MainSlider,
} from "../components/";

function Main() {
  return (
    <div className="main-wrap">
      <Header />
      <MainSlider />
      <h2>카테고리별 BEST 20</h2>
      <Popular />
      <Upcoming />
      <Trending />
      <TopRated />
      <NowPlaying />
    </div>
  );
}

export default Main;
