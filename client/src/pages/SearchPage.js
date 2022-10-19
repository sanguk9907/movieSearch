import React from "react";
import { Header, SearchBody } from "../components";
import { instance } from "../apis";
import { StoreContext } from "../App";

function SearchPage() {
  const { search } = React.useContext(StoreContext);

  React.useEffect(() => {
    searchMovie();
  }, [search]);

  const [movie, setMovie] = React.useState([]);

  const searchMovie = () => {
    instance
      .get(`/search`, {
        params: {
          language: "ko",
          region: "ko",
          query: search.text,
        },
      })
      .then((response) => {
        setMovie(response.data.results);
      })
      .catch(() => {
        console.log("에러");
      });
  };

  return (
    <div className="SearchPage-wrap">
      <Header />
      <div className="searchResultText">
        {search.text === "" ? (
          <p>영화, 인물정보를 검색해보세요</p>
        ) : (
          <p>{`"${search.text}"의 검색결과`}</p>
        )}
      </div>
      <SearchBody movie={movie} />
    </div>
  );
}

export default SearchPage;
