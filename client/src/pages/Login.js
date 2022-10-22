import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../App";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { Header } from "../components";

function Login() {
  const { setLoginUser } = React.useContext(StoreContext);
  const navigation = useNavigate();
  const [loginInfo, setLoginInfo] = React.useState({
    id: "",
    pw: "",
    autologin: false,
  });

  const login = async () => {
    await axios({
      url: "http://localhost:5000/login",
      method: "post",
      data: {
        id: loginInfo.id,
        pw: loginInfo.pw,
      },
    }).then(({ data }) => {
      if (data.code === "fail") {
        alert(data.message);
        return;
      }
      setLoginUser(data.user);
      localStorage.setItem("loginUser", JSON.stringify(data.user));

      alert(data.message);
      navigation("/");
    });
  };

  return (
    <div className="login-wrap">
      <Header />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setLoginInfo(loginInfo);
          login();
          setLoginInfo({
            id: "",
            pw: "",
          });
        }}
        className="login-form"
      >
        <Form.Field>
          <label>아이디</label>
          <input
            type="text"
            placeholder="사용하실 아이디를 입력해주세요"
            onChange={(e) => {
              const cloneLogin = { ...loginInfo };
              cloneLogin.id = e.target.value;
              setLoginInfo(cloneLogin);
            }}
            value={loginInfo.id}
          />
        </Form.Field>
        <Form.Field>
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) => {
              const cloneLogin = { ...loginInfo };
              cloneLogin.pw = e.target.value;
              setLoginInfo(cloneLogin);
            }}
            value={loginInfo.pw}
          />
        </Form.Field>
        <Checkbox
          label="자동로그인"
          onChange={() => {
            loginInfo.autologin = !loginInfo.autologin;
            console.log(loginInfo.autologin);
          }}
        />
        <Button type="submit">로그인</Button>
      </Form>
    </div>
  );
}

export default Login;
