import React from "react";
import { Routes, Route } from "react-router-dom";
import { Join, Login, Main, Profile, SearchPage } from "./pages";

function AppIndex() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/search" element={<SearchPage />} />
      <Route exact path="/join" element={<Join />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default AppIndex;
