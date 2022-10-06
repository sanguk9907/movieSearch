import React from "react";
import PersonCard from "./PersonCard";
import SearchMovieCard from "./SearchMovieCard";

function SearchBody({ movie, person }) {
  return (
    <div className="searchBody-warp">
      <SearchMovieCard movie={movie} />
      <PersonCard person={person} />
    </div>
  );
}

export default SearchBody;
