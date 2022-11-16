import axios from "axios";
import React from "react";
import { Form, useNavigate } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { StoreContext } from "../App";
import MobileMenu from "./MobileMenu";
import SearchBox from "./SearchBox";

function MobileHeader() {
  const [clickedSearch, setClickedSearch] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const navigation = useNavigate();

  return (
    <>
      <SearchBox
        clickedSearch={clickedSearch}
        setClickedSearch={setClickedSearch}
      />
      <div className="mo-header-wrap">
        <Icon
          name="bars"
          onClick={() => {
            setShowMenu(true);
          }}
        />
        <div
          className="logo-img"
          onClick={() => {
            navigation("/");
          }}
        >
          <img src={process.env.PUBLIC_URL + "/logo.png"}></img>
        </div>

        <Icon
          onClick={() => {
            setClickedSearch(!clickedSearch);
          }}
          name={clickedSearch ? "close" : "search"}
        />
      </div>
      {showMenu && <MobileMenu setShowMenu={setShowMenu} />}
    </>
  );
}

export default MobileHeader;
