import React from "react";
import { StoreContext } from "../App";

import { Delete, Header, MobileHeader, Profile } from "../components";

function ProfilePage() {
  const { showMobileHeader } = React.useContext(StoreContext);
  const [tab, setTab] = React.useState("li1");
  const active = (liNumber) => {
    return tab === liNumber ? "active" : "";
  };

  return (
    <>
      {showMobileHeader ? <MobileHeader /> : <Header />}

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

        {tab === "li1" ? <Profile /> : <Delete />}
      </div>
    </>
  );
}

export default ProfilePage;
