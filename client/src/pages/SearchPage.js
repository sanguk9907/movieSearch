import React from "react";
import { Header, SearchBody } from "../components";

import { StoreContext } from "../App";

function SearchPage() {
  const { search } = React.useContext(StoreContext);

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
      <SearchBody search={search} />
    </div>
  );
}

export default SearchPage;
