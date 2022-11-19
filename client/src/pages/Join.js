import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../App";
import { Button, Form } from "semantic-ui-react";
import { Header, MobileHeader } from "../components";

function Join() {
  axios.defaults.withCredentials = true;
  const { setLoginUser, showMobileHeader } = React.useContext(StoreContext);
  const navigation = useNavigate();
  const [joinInfo, setJoinInfo] = React.useState({
    id: "",
    pw: "",
    confirmPw: "",
    nick: "",
    email: "",
    phoneNumber: "",
  });

  const signUp = async () => {
    await axios({
      url: "http://http://52.196.233.251:5000/join",
      method: "post",
      data: joinInfo,
    }).then(({ data }) => {
      alert(data.message);
      if (!data.user) {
        return;
      }
      setLoginUser(data.user);
      sessionStorage.setItem("loginUser", JSON.stringify(data.user));
      if (data.code === "success") {
        setJoinInfo({
          id: "",
          pw: "",
          confirmPw: "",
          nick: "",
          email: "",
          phoneNumber: "",
        });
        navigation("/");
      }
    });
  };

  return (
    <div className="join-wrap">
      {showMobileHeader ? <MobileHeader /> : <Header />}
      <Form
        onSubmit={(e) => {
          e.preventDefault();

          setJoinInfo(joinInfo);
          signUp();
        }}
        className="join-form"
      >
        <Form.Field>
          <label>아이디</label>
          <input
            type="text"
            placeholder="사용하실 아이디를 입력해주세요"
            onChange={(e) => {
              const cloneJoin = { ...joinInfo };
              cloneJoin.id = e.target.value;
              setJoinInfo(cloneJoin);
            }}
            value={joinInfo.id}
          />
        </Form.Field>

        <Form.Field>
          <label>닉네임</label>
          <input
            type="text"
            placeholder="사용하실 닉네임을 입력해주세요"
            onChange={(e) => {
              if (e.target.value.length > 10) {
                alert("10글자 이내로 작성해주세요");
                return;
              }
              const cloneJoin = { ...joinInfo };
              cloneJoin.nick = e.target.value;
              setJoinInfo(cloneJoin);
            }}
            value={joinInfo.nick}
          />
        </Form.Field>
        <Form.Field>
          <label>이메일</label>
          <input
            type="text"
            placeholder="이메일을 입력해주세요"
            onChange={(e) => {
              const cloneJoin = { ...joinInfo };
              cloneJoin.email = e.target.value;
              setJoinInfo(cloneJoin);
            }}
            value={joinInfo.email}
          />
        </Form.Field>
        <Form.Field>
          <label>전화번호</label>
          <input
            type="text"
            placeholder="전화번호를 입력해주세요"
            onChange={(e) => {
              const cloneJoin = { ...joinInfo };
              cloneJoin.phoneNumber = e.target.value;
              setJoinInfo(cloneJoin);
            }}
            value={joinInfo.phoneNumber}
          />
        </Form.Field>
        <Form.Field>
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) => {
              const cloneJoin = { ...joinInfo };
              cloneJoin.pw = e.target.value;
              setJoinInfo(cloneJoin);
            }}
            value={joinInfo.pw}
          />
        </Form.Field>
        <Form.Field>
          <label>비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            onChange={(e) => {
              const cloneJoin = { ...joinInfo };
              cloneJoin.confirmPw = e.target.value;
              setJoinInfo(cloneJoin);
            }}
            value={joinInfo.confirmPw}
          />
        </Form.Field>
        <Button type="submit">회원가입</Button>
      </Form>
    </div>
  );
}

export default Join;
