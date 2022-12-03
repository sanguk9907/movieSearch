import React from "react";
import axios from "../apis/axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../App";
import { Button, Form } from "semantic-ui-react";
import { Header, MobileHeader, InputFileld } from "../components";

axios.defaults.withCredentials = true;

function Join() {
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
  const { id, pw, confirmPw, nick, email, phoneNumber } = joinInfo;

  const signUp = async () => {
    await axios({
      url: "/join",
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

  // 하나이상의 대소문자,숫자 8자 이상(특수문자X)
  const IDReg = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  // 하나이상의 대소문자,숫자 8자 이상(특수문자O)
  const PWReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  const EmailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const PhoneReg = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  const IDCheck =
    IDReg.test(id) || id === ""
      ? ""
      : "아이디는 영문과 숫자만을 포함한 8글자 이상이어야합니다.";
  const PWCheck =
    PWReg.test(pw) || pw === ""
      ? ""
      : "비밀번호는 영문과 숫자, 특수문자만을 포함한 8글자 이상이어야합니다.";
  const EmailCheck =
    EmailReg.test(email) || email === ""
      ? ""
      : "이메일 형식이 올바르지 않습니다.";
  const PhoneCheck =
    PhoneReg.test(phoneNumber) || phoneNumber === ""
      ? ""
      : "휴대폰 번호 형식이 올바르지 않습니다.";
  const disabled =
    IDReg.test(id) &&
    PWReg.test(pw) &&
    EmailReg.test(email) &&
    PhoneReg.test(phoneNumber)
      ? false
      : true;
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
            value={id}
          />
          <p className="check">{IDCheck}</p>
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
            placeholder="본인의 이메일을 입력해주세요"
            onChange={(e) => {
              const cloneJoin = { ...joinInfo };
              cloneJoin.email = e.target.value;
              setJoinInfo(cloneJoin);
            }}
            value={email}
          />
          <p className="check">{EmailCheck}</p>
        </Form.Field>
        <Form.Field>
          <label>휴대폰</label>
          <input
            type="text"
            placeholder="본인의 휴대폰 번호를 입력해주세요"
            onChange={(e) => {
              const cloneJoin = { ...joinInfo };
              cloneJoin.phoneNumber = e.target.value;
              setJoinInfo(cloneJoin);
            }}
            value={phoneNumber}
          />
          <p className="check">{PhoneCheck}</p>
        </Form.Field>
        <Form.Field>
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="사용하실 비밀번호를 입력해주세요"
            onChange={(e) => {
              const cloneJoin = { ...joinInfo };
              cloneJoin.pw = e.target.value;
              setJoinInfo(cloneJoin);
            }}
            value={pw}
          />
          <p className="check">{PWCheck}</p>
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
            value={confirmPw}
          />
        </Form.Field>
        <Button disabled={disabled} type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
}

export default Join;
