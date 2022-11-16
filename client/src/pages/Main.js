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
  MobileHeader,
} from "../components/";

function Main() {
  const { loading, loadStyle, showMobileHeader } =
    React.useContext(StoreContext);

  return (
    <div style={loadStyle} className="main-wrap">
      {loading && <Loading />}
      {showMobileHeader ? <MobileHeader /> : <Header />}
      <MainSlider />
      <h2>카테고리별 BEST 20</h2>
      <Popular />
      <Upcoming />
      <Trending />
      <TopRated />
      <NowPlaying />
      <div
        className="go-top-btn"
        onClick={() => {
          window.scroll({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        TOP
      </div>
    </div>
  );
}

export default Main;
