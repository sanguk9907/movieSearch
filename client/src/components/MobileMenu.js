import axios from "../apis/axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { StoreContext } from "../App";
import Delete from "./Delete";

function MobileMenu({ setShowMenu }) {
  const { loginUser, setLoginUser } = React.useContext(StoreContext);
  const navigation = useNavigate();
  const [tab, setTab] = React.useState("");
  const active = (liNumber) => {
    return tab === liNumber ? "active" : "";
  };

  // 스크롤 막기
  const backgroundFixed = () => {
    document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
    return;
  };

  // 스크롤 풀기
  const backgroundUnFixed = () => {
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  React.useEffect(() => {
    backgroundFixed();
  }, []);

  const logOut = async () => {
    await axios({
      url: "/logout",
      method: "get",
    });
  };
  return (
    <div>
      <ul className="mo-menu">
        <li>안녕하세요 {loginUser.nick} 님</li>
        <li
          onClick={() => {
            setTab("li1");
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
              setTab("");
              setShowMenu(false);
              backgroundUnFixed();
            }
          }}
          className={active("li1")}
        >
          {loginUser.id === "" ? "로그인" : "로그아웃"}
        </li>
        <li
          onClick={() => {
            setTab("li2");
            if (loginUser.id === "") {
              navigation("/join");
            } else {
              navigation("/profile");
            }
            setShowMenu(false);
            backgroundUnFixed();
          }}
          className={active("li2")}
        >
          {loginUser.id === "" ? "회원가입" : `프로필보기`}
        </li>
        {loginUser.id && (
          <li
            onClick={() => {
              setTab("li3");
              navigation("/userdelete");
              setShowMenu(false);
              backgroundUnFixed();
            }}
            className={active("li3")}
          >
            회원탈퇴
          </li>
        )}
      </ul>
      <div
        className="mo-menu-bg"
        onClick={() => {
          setShowMenu(false);
          backgroundUnFixed();
        }}
      >
        <Icon
          onClick={() => {
            setShowMenu(false);
            backgroundUnFixed();
          }}
          name="close"
        />
      </div>
    </div>
  );
}

export default MobileMenu;
