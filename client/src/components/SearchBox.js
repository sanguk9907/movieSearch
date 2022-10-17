import React from "react";
import { StoreContext } from "../App";

function SearchBox({ clickedSearch, setClickedSearch }) {
  const { setDispatchType } = React.useContext(StoreContext);
  const [inputValue, setInputValue] = React.useState({
    text: "",
    page: "/search",
  });

  return (
    <div className={`searchBox-wrap ${clickedSearch ? "slidedown" : ""}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDispatchType({
            text: inputValue.text,
            page: inputValue.page,
          });
          setClickedSearch(false);
        }}
      >
        <input
          className="search-input"
          type="text"
          value={inputValue.text}
          placeholder="검색어를 입력해주세요"
          onChange={(e) => {
            const cloneInputValue = { ...inputValue };
            cloneInputValue.text = e.target.value;
            setInputValue(cloneInputValue);
          }}
        />
      </form>
    </div>
  );
}

export default SearchBox;
