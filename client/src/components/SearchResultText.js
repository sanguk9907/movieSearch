import React from "react";

function SearchResultText({ search }) {
  return (
    <div className="searchResultText">
      {search.searchTitle === "" ? (
        <p>카테고리별 베스트 20선</p>
      ) : (
        <p>{`"${search.searchTitle}"의 검색결과`}</p>
      )}
      {console.log(search)}
    </div>
  );
}

export default SearchResultText;
