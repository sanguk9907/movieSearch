import React from "react";
import { Icon } from "semantic-ui-react";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigation = useNavigate();
  const [clickedSearch, setClickedSearch] = React.useState(false);
  return (
    <>
      <SearchBox
        clickedSearch={clickedSearch}
        setClickedSearch={setClickedSearch}
      />
      <div className="header-wrap">
        <div
          className="logo-img"
          onClick={() => {
            navigation("/");
          }}
        >
          로고
        </div>

        <ul>
          <li
            onClick={() => {
              navigation("/login");
            }}
          >
            <Icon name="sign in" />
            <p>로그인</p>
          </li>
          <li
            onClick={() => {
              navigation("/join");
            }}
          >
            <Icon name="user plus" />
            <p>회원가입</p>
          </li>
          <li
            className="search-icon"
            onClick={() => {
              setClickedSearch(!clickedSearch);
            }}
          >
            <Icon name={clickedSearch ? "close" : "search"} />
            <p>{clickedSearch ? "닫기" : "검색"}</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
