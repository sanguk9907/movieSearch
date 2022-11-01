import React from "react";
import { Button } from "semantic-ui-react";
import { StoreContext } from "../App";
import { Header } from "../components";

function Profile() {
  const { loginUser } = React.useContext(StoreContext);
  const { id, nick, liked } = loginUser;
  return (
    <>
      <Header />
      <div className="profile-wrap">
        <div className="profile-card">
          <div className="profile-img"></div>
          <p>
            소개
            <p>ddddddddddddddddddddddddddddd</p>
            <p>dddddddddddddddddddddd</p>
            <p>ddddddddddddddddddddddddd</p>
            <p>ddddddddddddddd</p>
          </p>

          <ul className="profile-info">
            <li>아이디 : {id}</li>
            <li>닉네임 : {nick}</li>
          </ul>
        </div>
        <Button className="update-btn">수정</Button>
      </div>
    </>
  );
}

export default Profile;
