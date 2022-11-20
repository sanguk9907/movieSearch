import React from "react";
import { Icon } from "semantic-ui-react";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../App";
import axios from "../apis/axios";
axios.defaults.withCredentials = true;
function Header() {
  const navigation = useNavigate();
  const { loginUser, setLoginUser } = React.useContext(StoreContext);
  const [clickedSearch, setClickedSearch] = React.useState(false);

  const logOut = async () => {
    await axios({
      url: "/logout",
      method: "get",
    });
  };
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
          <img src={process.env.PUBLIC_URL + "/logo.png"}></img>
        </div>

        <ul>
          <li
            onClick={() => {
              if (loginUser.id === "") {
                navigation("/login");
              } else {
                if (!window.confirm("로그아웃 하시겠습니까?")) {
                  return;
                }
                logOut();
                setLoginUser({
                  id: "",
                  nick: "",
                });
                localStorage.removeItem("loginUser");
                sessionStorage.removeItem("loginUser");
                navigation("/");
              }
            }}
          >
            <Icon name={loginUser.id === "" ? "sign in" : "sign out"} />
            <p>{loginUser.id === "" ? "로그인" : "로그아웃"}</p>
          </li>
          <li
            onClick={() => {
              if (loginUser.id === "") {
                navigation("/join");
              } else {
                navigation("/profile");
              }
            }}
          >
            <Icon name={loginUser.id === "" ? "user plus" : "user"} />
            <p>{loginUser.id === "" ? "회원가입" : `${loginUser.nick} 님`}</p>
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
