import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../App";
import { Button, Form } from "semantic-ui-react";
import { Header } from "../components";

function Join() {
  const { setLoginUser } = React.useContext(StoreContext);
  const navigation = useNavigate();
  const [joinInfo, setJoinInfo] = React.useState({
    id: "",
    pw: "",
    confirmPw: "",
    nick: "",
  });

  const signUp = async () => {
    await axios({
      url: "http://localhost:5000/join",
      method: "post",
      data: {
        id: joinInfo.id,
        pw: joinInfo.pw,
        nick: joinInfo.nick,
      },
    }).then(({ data }) => {
      alert(data.message);
      if (data.code === "success") {
        setLoginUser(joinInfo);
        setLoginUser({
          id: "",
          pw: "",
          nick: "",
        });
        navigation("/");
      }
    });
  };

  return (
    <div className="join-wrap">
      <Header />
      <Form
        onSubmit={(e) => {
          e.preventDefault();

          if (joinInfo.pw !== joinInfo.confirmPw) {
            alert("비밀번호가 일치하지 않습니다 다시 한 번 확인해주세요");
            return;
          }
          setJoinInfo(joinInfo);
          console.log(joinInfo);
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
              const cloneJoin = { ...joinInfo };
              cloneJoin.nick = e.target.value;
              setJoinInfo(cloneJoin);
            }}
            value={joinInfo.nick}
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
