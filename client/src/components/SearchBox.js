import React from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../App";

function SearchBox({ clickedSearch, setClickedSearch }) {
  const { setSearch } = React.useContext(StoreContext);
  const [inputValue, setInputValue] = React.useState({
    text: "",
  });

  const navigation = useNavigate();

  return (
    <div className={`searchBox-wrap ${clickedSearch ? "slidedown" : ""}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearch({
            text: inputValue.text,
          });
          setClickedSearch(false);
          navigation("/search");
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
