import React, { useEffect } from "react";
import { StoreContext } from "../App";
import {
  Popular,
  Upcoming,
  Trending,
  TopRated,
  NowPlaying,
  Header,
  MainSlider,
  Loading,
} from "../components/";

function Main() {
  const { loading, loadStyle } = React.useContext(StoreContext);

  return (
    <div style={loadStyle} className="main-wrap">
      {loading && <Loading />}
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
