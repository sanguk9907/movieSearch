import React from "react";
import { Header, SearchBody, Loading } from "../components";
import { StoreContext } from "../App";

function SearchPage() {
  const { search, loading, loadStyle } = React.useContext(StoreContext);

  return (
    <div style={loadStyle} className="SearchPage-wrap">
      {loading && <Loading />}
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
