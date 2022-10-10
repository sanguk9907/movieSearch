import React from "react";
import { Icon } from "semantic-ui-react";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigation = useNavigate();
  const [clickedSearch, setClickedSearch] = React.useState(false);
  return (
    <>
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
          <li>
            <Icon name="sign in" />
            <p>로그인</p>
          </li>
          <li>
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
      {clickedSearch && <SearchBox />}
    </>
  );
}

export default Header;
