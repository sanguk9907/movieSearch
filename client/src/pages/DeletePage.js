import React from "react";
import { Header } from "semantic-ui-react";
import { StoreContext } from "../App";
import { Delete, MobileHeader } from "../components";

function DeletePage() {
  const { showMobileHeader } = React.useContext(StoreContext);
  return (
    <div className="delete-wrap">
      <MobileHeader />
      <Delete />
    </div>
  );
}

export default DeletePage;
