import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../App";

function Join() {
  const { setLoginUser } = React.useContext(StoreContext);
  const navigation = useNavigate();
  const [joinInfo, setJoinInfo] = React.useState({
    id: "",
    pw: "",
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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setJoinInfo(joinInfo);
          signUp();
        }}
      >
        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          onChange={(e) => {
            const cloneJoin = { ...joinInfo };
            cloneJoin.id = e.target.value;
            setJoinInfo(cloneJoin);
          }}
          value={joinInfo.id}
        ></input>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={joinInfo.pw}
          onChange={(e) => {
            const cloneJoin = { ...joinInfo };
            cloneJoin.pw = e.target.value;
            setJoinInfo(cloneJoin);
          }}
        ></input>
        <input
          type="text"
          placeholder="사용하실 닉네임을 입력해주세요"
          value={joinInfo.nick}
          onChange={(e) => {
            const cloneJoin = { ...joinInfo };
            cloneJoin.nick = e.target.value;
            setJoinInfo(cloneJoin);
          }}
        ></input>
        <button>확인</button>
      </form>
    </div>
  );
}

export default Join;
