import React from "react";
import { SearchBody, SearchBox } from "../components";
import { instance } from "../apis";

function SearchPage() {
  const [search, setSearch] = React.useState({
    searchTitle: "",
  });
  React.useEffect(() => {
    searchMovie();
  }, [search]);

  const [movie, setMovie] = React.useState([]);
  const [person, setPerson] = React.useState([]);

  const searchMovie = () => {
    instance
      .get(`search/movie`, {
        params: {
          language: "ko",
          region: "ko",
          query: search.searchTitle,
          include_adult: false,
        },
      })
      .then((response) => {
        if (response.data.results[0] === undefined) {
          instance
            .get(`search/person`, {
              params: {
                language: "ko",
                region: "ko",
                query: search.searchTitle,
                include_adult: false,
              },
            })
            .then((response) => {
              setPerson(response.data.results);
            });
        } else {
          setMovie(response.data.results);
        }
      })
      .catch(() => {
        console.log("에러");
      });
  };

  const searchInputValue = (x) => {
    setSearch(x);
    console.log(x);
  };

  return (
    <div className="SearchPage-wrap">
      <SearchBox searchInputValue={searchInputValue} />
      <div className="searchResultText">
        {search.searchTitle === "" ? (
          <p>영화, 인물정보를 검색해보세요</p>
        ) : (
          <p>{`"${search.searchTitle}"의 검색결과`}</p>
        )}
      </div>
      <SearchBody movie={movie} person={person} />
    </div>
  );
}

export default SearchPage;
