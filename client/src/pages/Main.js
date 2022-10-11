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
      <Popular />
      <Upcoming />
      <Trending />
      <TopRated />
      <NowPlaying />
    </div>
  );
}

export default Main;
