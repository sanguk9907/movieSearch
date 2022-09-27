import React from "react";

function SearchBox(props) {
  const [search, setSearch] = React.useState("");
  return (
    <div>
      <input
        type="text"
        value={search}
        placeholder="검색어를 입력해주세요"
        onChange={(e) => {
          setSearch(e);
        }}
      />
    </div>
  );
}

export default SearchBox;
