import React from "react";

function SearchBox({ searchInputValue }) {
  const [search, setSearch] = React.useState("");
  return (
    <div className="searchBox-wrap">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchInputValue(search);
        }}
      >
        <input
          className="search-input"
          type="text"
          value={search}
          placeholder="검색어를 입력해주세요"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </form>
    </div>
  );
}

export default SearchBox;
