import axios from "axios";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { StoreContext } from "../App";
import { Header } from "../components";
import { Unchange } from "../components";

function Profile() {
  const { loginUser } = React.useContext(StoreContext);
  const { id, nick, liked, userIntroduction } = loginUser;
  const [update, setUpdate] = React.useState({
    nick: loginUser.nick,
    userIntroduction: userIntroduction,
  });
  const [tab, setTab] = React.useState("li1");
  const active = (liNumber) => {
    return tab === liNumber ? "active" : "";
  };

  const profile = async () => {
    await axios({
      url: "http://localhost:5000/profile",
      method: "get",
      params: {
        id: id,
      },
    }).then(({ data }) => {
      console.log(data);
    });
  };

  console.log(loginUser);

  React.useEffect(() => {
    profile();
  }, []);

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
              label={"이름"}
              content={nick}
              description={
                "회원가입 시 입력하신 회원님의 이름입니다. 아이디, 비밀번호 찾기에 사용되며 변경은 불가능합니다."
              }
            />
          </Form.Field>
          <Form.Field>
            <Unchange
              label={"전화번호"}
              content={"010-1234-****"}
              description={
                "회원가입 시 입력하신 회원님의 전화번호입니다. 아이디, 비밀번호 찾기에 사용되며 변경은 불가능합니다."
              }
            />
          </Form.Field>
          <Form.Field>
            <Unchange
              label={"이메일"}
              content={"aaaa@aaaa.aaa"}
              description={
                "회원가입 시 입력하신 회원님의 이메일입니다. 아이디, 비밀번호 찾기에 사용되며 변경은 불가능합니다."
              }
            />
          </Form.Field>
          <Form.Field>
            <label>닉네임</label>
            <input
              value={update.nick}
              placeholder="닉네임"
              onChange={(e) => {
                const cloneUpdate = { ...update };
                cloneUpdate.nick = e.target.value;
                setUpdate(cloneUpdate);
              }}
            />
            <p>닉네임은 중복 가능하게 할까말까..</p>
          </Form.Field>
          <Form.Field>
            <label>소개</label>
            <textarea
              value={update.userIntroduction}
              placeholder="나를 소개해주세요!"
              onChange={(e) => {
                const cloneUpdate = { ...update };
                cloneUpdate.userIntroduction = e.target.value;
                setUpdate(cloneUpdate);
                console.log(e.target.value);
              }}
            />
            <p>짦은 글로 나를 소개해보세요! textarea는 겁나게 크지만요!</p>
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
          <Button type="submit">수정하기</Button>
        </Form>
      </div>
    </>
  );
}

export default Profile;
