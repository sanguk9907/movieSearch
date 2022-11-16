import React from "react";
import { Header, SearchBody, Loading, MobileHeader } from "../components";
import { StoreContext } from "../App";

function SearchPage() {
  const { search, loading, loadStyle, showMobileHeader } =
    React.useContext(StoreContext);

  return (
    <div style={loadStyle} className="SearchPage-wrap">
      {loading && <Loading />}
      {showMobileHeader ? <MobileHeader /> : <Header />}
      <div className="searchResultText">
        {search.text === "" ? (
          <p>영화, 인물정보를 검색해보세요</p>
        ) : (
          <p>{`"${search.text}"의 검색결과`}</p>
        )}
      </div>
      <SearchBody search={search} />
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
    </div>
  );
}

export default SearchPage;
