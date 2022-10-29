import React from "react";
import SearchMovieCard from "./SearchMovieCard";
import { useInView } from "react-intersection-observer";
import { StoreContext } from "../App";
import { instance } from "../apis";
function SearchBody() {
  const { search, setLoading } = React.useContext(StoreContext);
  const [movie, setMovie] = React.useState([]);
  const [ref, inView] = useInView();
  const [totalPage, setTotalPage] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);

  const infisearchMovie = () => {
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
      });
  };

  const searchMovie = () => {
    instance
      .get(`/search`, {
        params: {
          language: "ko",
          region: "ko",
          query: search.text,
          page: 1,
        },
      })
      .then((response) => {
        setPageNumber(1);
        setMovie(response.data.results);
        setTotalPage(response.data.total_pages);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };

  React.useEffect(() => {
    infisearchMovie();
  }, [pageNumber]);

  React.useEffect(() => {
    setLoading(true);
    searchMovie();
    window.scroll({
      top: 0,
    });
  }, [search]);

  React.useEffect(() => {
    if (pageNumber === totalPage) {
      return;
    }
    if (inView === true && movie && movie.length !== 0) {
      setPageNumber(pageNumber + 1);
    }
  }, [inView]);

  return (
    <div className="searchBody-warp">
      <SearchMovieCard movie={movie} />
      <div ref={ref} />
    </div>
  );
}

export default SearchBody;
