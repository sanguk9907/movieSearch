import React from "react";
import axios from "axios";

function Join() {
  const [joinInfo, setJoinInfo] = React.useState({
    id: "",
    pw: "",
  });

  const signUp = async () => {
    axios
      .post("http://localhost:5000/join", {
        firstName: "Fred",
        lastName: "Flintstone",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setJoinInfo(joinInfo);
          console.log(joinInfo);
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
        <button>확인</button>
      </form>
    </div>
  );
}

export default Join;
