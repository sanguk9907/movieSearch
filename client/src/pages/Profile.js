import axios from "axios";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { StoreContext } from "../App";
import { Header } from "../components";
import { Unchange } from "../components";

function Profile() {
  const [textAreaCount, setTextAreaCount] = React.useState(0);

  const { loginUser, setLoginUser } = React.useContext(StoreContext);
  const { id, nick, liked, userIntroduction, email, phoneNumber } = loginUser;
  const [updateUser, setUpdateUser] = React.useState({
    nick: nick,
    userIntroduction: userIntroduction,
  });

  const [tab, setTab] = React.useState("li1");
  const active = (liNumber) => {
    return tab === liNumber ? "active" : "";
  };
  const textareaLength = React.useRef();

  const profile = async () => {
    await axios({
      url: "http://localhost:5000/profile",
      method: "get",
      params: {
        id: id,
        nick: updateUser.nick,
        userIntroduction: updateUser.userIntroduction,
      },
    }).then(({ data }) => {
      const cloneLoginUser = { ...loginUser };
      cloneLoginUser.nick = data.nick;
      cloneLoginUser.userIntroduction = data.userIntroduction;
      setLoginUser(cloneLoginUser);
    });
  };

  console.log(updateUser);
  return (
    <>
      <Header />
      <div className="profile-wrap">
        <aside>
          <ul>
            <li
              onClick={() => {
                setTab("li1");
              }}
              className={active("li1")}
            >
              프로필정보
            </li>

            <li
              onClick={() => {
                setTab("li2");
              }}
              className={active("li2")}
            >
              회원탈퇴
            </li>
            <li></li>
          </ul>
        </aside>
        <Form>
          <Form.Field>
            <Unchange
              label={"아이디"}
              content={id}
              description={
                "회원가입 시 입력하신 회원님의 이름입니다. 아이디, 비밀번호찾기에 사용되며 변경은 불가능합니다."
              }
            />
          </Form.Field>
          <Form.Field>
            <Unchange
              label={"비밀번호"}
              content={<Button>비밀번호 변경</Button>}
              description={"비밀번호는 열람이 불가능하며 변경만 가능합니다."}
            />
          </Form.Field>
          <Form.Field>
            <Unchange
              label={"전화번호"}
              content={phoneNumber}
              description={
                "회원가입 시 입력하신 회원님의 전화번호입니다. 아이디, 비밀번호 찾기에 사용되며 변경은 불가능합니다."
              }
            />
          </Form.Field>
          <Form.Field>
            <Unchange
              label={"이메일"}
              content={email}
              description={
                "회원가입 시 입력하신 회원님의 이메일입니다. 아이디, 비밀번호 찾기에 사용되며 변경은 불가능합니다."
              }
            />
          </Form.Field>
          <Form.Field>
            <label>닉네임</label>
            <input
              value={updateUser.nick}
              placeholder="닉네임"
              onChange={(e) => {
                const cloneUpdate = { ...updateUser };
                cloneUpdate.nick = e.target.value;
                setUpdateUser(cloneUpdate);
              }}
            />
            <p>닉네임은 중복 가능하게 할까말까..</p>
          </Form.Field>
          <Form.Field>
            <label>소개 </label>
            <textarea
              rows="4"
              cols="50"
              value={updateUser.userIntroduction}
              placeholder="나를 소개해주세요!"
              ref={textareaLength}
              onChange={(e) => {
                setTextAreaCount(e.target.value.length);
                if (e.target.value.length >= 100) {
                  alert("100자를 초과하셨습니다.");
                  return;
                }

                const cloneUpdate = { ...updateUser };
                cloneUpdate.userIntroduction = e.target.value;
                setUpdateUser(cloneUpdate);
              }}
            />

            <p>100자 이내의 짧은 글로 자신을 소개해보세요!</p>
            <p>{textAreaCount}/100</p>
          </Form.Field>
          <Form.Field>
            <label>좋아하는 영화</label>
            <p>"좋아요" 상태의 영화를 보여드립니다.</p>
            <div
              style={{
                width: "150px",
                height: "200px",
                backgroundColor: "#ddd",
                marginRight: "10px",
                float: "left",
                marginBottom: "10px",
              }}
            ></div>
            <div
              style={{
                width: "150px",
                height: "200px",
                backgroundColor: "#ddd",
                marginRight: "10px",
                float: "left",
                marginBottom: "10px",
              }}
            ></div>
            <div
              style={{
                width: "150px",
                height: "200px",
                backgroundColor: "#ddd",
                marginRight: "10px",
                float: "left",
                marginBottom: "10px",
              }}
            ></div>
            <div
              style={{
                width: "150px",
                height: "200px",
                backgroundColor: "#ddd",
                marginRight: "10px",
                float: "left",
                marginBottom: "10px",
              }}
            ></div>
            <div
              style={{
                width: "150px",
                height: "200px",
                backgroundColor: "#ddd",
                marginRight: "10px",
                float: "left",
                marginBottom: "10px",
              }}
            ></div>
            <div
              style={{
                width: "150px",
                height: "200px",
                backgroundColor: "#ddd",
                marginRight: "10px",
                float: "left",
                marginBottom: "10px",
              }}
            ></div>
          </Form.Field>
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (updateUser.nick === "") {
                alert("닉네임을 확인해주세요");
                return;
              }
              profile();
            }}
          >
            수정하기
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Profile;
