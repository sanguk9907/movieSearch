import React from "react";
import { StoreContext } from "../App";
import {
  Header,
  MainSlider,
  Loading,
  MobileHeader,
  MovieDetail,
  MainContent,
} from "../components/";

import { getMovieApi } from "../apis/fetchData";

function Main() {
  const { loading, setLoading, loadStyle, showMobileHeader, movieDetail } =
    React.useContext(StoreContext);

  const [movie, setMovie] = React.useState({
    Popular: [],
    NowPlaying: [],
    Trending: [],
    TopRated: [],
    Upcoming: [],
  });

  React.useEffect(() => {
    (async () => {
      const data = await getMovieApi();

      const cloneMovie = { ...movie };

      for (let category in data) {
        const movieApi = data[category];
        cloneMovie[category] = movieApi;
      }

      setMovie(cloneMovie);
      setLoading(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  {
  }
  return (
    <div style={loadStyle} className="main-wrap">
      {loading && <Loading />}
      {showMobileHeader ? <MobileHeader /> : <Header />}
      <MainSlider movie={movie.Popular} />
      <MainContent
        title={"넷플릭스 인기"}
        semiTitle={"Netflix"}
        movie={movie.Netflix}
      />
      <MainContent
        title={"디즈니플러스 인기"}
        semiTitle={"Disney Plus"}
        movie={movie.Disney_Plus}
      />
      <MainContent
        title={"왓차 인기"}
        semiTitle={"Watcha"}
        movie={movie.Watcha}
      />
      <MainContent
        title={"현재 상영중"}
        semiTitle={"NowPlaying"}
        movie={movie.NowPlaying}
      />
      <MainContent
        title={"최고의 평가"}
        semiTitle={"TopRated"}
        movie={movie.TopRated}
      />
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
      {movieDetail && <MovieDetail />}
    </div>
  );
}

export default Main;
