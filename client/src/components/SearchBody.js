import React from "react";
import SearchMovieCard from "./SearchMovieCard";
import { useInView } from "react-intersection-observer";
import { StoreContext } from "../App";
import { instance } from "../apis";
import { movieProvider } from "../helper/fetchData";
import MovieDetail from "./MovieDetail";
import { detailData } from "../helper/fetchData";
import notFoundImg from "../img/not-found.jpg";

function SearchBody() {
  const { search } = React.useContext(StoreContext);
  const [movie, setMovie] = React.useState([]);
  const [ref, inView] = useInView();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [movieDetail, setMovieDetail] = React.useState();
  const [providerData, setProviderData] = React.useState();
  const [totalPage, setTotalPage] = React.useState(0);

  const loadMore = () => {
    setPageNumber(pageNumber + 1);
  };

  const searchMovie = () => {
    instance
      .get(`/search`, {
        params: {
          language: "ko",
          region: "ko",
          query: search.text,
          page: pageNumber,
        },
      })
      .then((response) => {
        setMovie([...movie, ...response.data.results]);
        setTotalPage(response.data.total_pages);
      })
      .catch(() => {
        console.log("에러");
      });
  };

  React.useEffect(() => {
    searchMovie();
  }, [search, pageNumber]);

  React.useEffect(() => {
    if (pageNumber === totalPage) {
      return;
    }
    if (inView === true && movie.length !== 0) {
      loadMore();
      console.log("현재페이지", pageNumber);
    }
  }, [inView]);

  React.useEffect(() => {
    setPageNumber(1);
    setMovie([]);
  }, [search]);

  return (
    <div className="searchBody-warp">
      <div className="movie-wrap">
        {movie &&
          movie.map((item, index) => {
            return (
              <div key={`movie-card-${index}`} className="movie-card">
                <div
                  className="img-box"
                  onClick={() => {
                    detailData(item.id, setMovieDetail);
                    movieProvider(item.id, setProviderData);
                  }}
                  style={{
                    backgroundImage: !item.poster_path
                      ? `url("${notFoundImg}")`
                      : `url("https://image.tmdb.org/t/p/w500/${item.poster_path}")`,
                  }}
                ></div>
                <p className="title">{item.title}</p>
              </div>
            );
          })}
        {movieDetail && (
          <MovieDetail
            movieDetail={movieDetail}
            setMovieDetail={setMovieDetail}
            provider={providerData}
            setProviderData={setProviderData}
          />
        )}
      </div>
      <div ref={ref} />
    </div>
  );
}

export default SearchBody;
