import React from "react";
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
  MovieDetail,
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

  return (
    <div style={loadStyle} className="main-wrap">
      {loading && <Loading />}
      {showMobileHeader ? <MobileHeader /> : <Header />}
      <MainSlider movie={movie.Popular} />
      <Popular movie={movie.Popular} />
      <Upcoming movie={movie.Popular} />
      <Trending movie={movie.Trending} />
      <TopRated movie={movie.TopRated} />
      <NowPlaying movie={movie.NowPlaying} />
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
