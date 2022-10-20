import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../App";

function Login() {
  const { setLoginUser } = React.useContext(StoreContext);
  const navigation = useNavigate();
  const [loginInfo, setLoginInfo] = React.useState({
    id: "",
    pw: "",
  });

  const login = async () => {
    await axios({
      url: "http://localhost:5000/login",
      method: "post",
      data: {
        id: loginInfo.id,
        pw: loginInfo.pw,
      },
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoginInfo(loginInfo);
          login();
          console.log(loginInfo);
          setLoginInfo({
            id: "",
            pw: "",
          });
        }}
      >
        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          onChange={(e) => {
            const cloneLogin = { ...loginInfo };
            cloneLogin.id = e.target.value;
            setLoginInfo(cloneLogin);
          }}
          value={loginInfo.id}
        ></input>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={loginInfo.pw}
          onChange={(e) => {
            const cloneLogin = { ...loginInfo };
            cloneLogin.pw = e.target.value;
            setLoginInfo(cloneLogin);
          }}
        ></input>
        <button>확인</button>
      </form>
    </div>
  );
}

export default Login;
