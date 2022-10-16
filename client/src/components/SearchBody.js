import React from "react";
import PersonCard from "./PersonCard";
import SearchMovieCard from "./SearchMovieCard";

function SearchBody({ movie }) {
  return (
    <div className="searchBody-warp">
      <SearchMovieCard movie={movie} />
    </div>
  );
}

export default SearchBody;
