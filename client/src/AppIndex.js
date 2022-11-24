import axios from "axios";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { StoreContext } from "./App";
import {
  Join,
  Login,
  Main,
  ProfilePage,
  SearchPage,
  DeletePage,
  ChangePassword,
} from "./pages";

function AppIndex() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/search" element={<SearchPage />} />
      <Route exact path="/join" element={<Join />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/profile" element={<ProfilePage />} />
      <Route exact path="/newpaddword" element={<ChangePassword />} />
      <Route exact path="/userdelete" element={<DeletePage />}></Route>
    </Routes>
  );
}

export default AppIndex;
