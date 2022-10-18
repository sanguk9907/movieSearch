import React from "react";
import { Routes, Route } from "react-router-dom";
import { Join, Main, SearchPage } from "./pages";

function AppIndex() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/search" element={<SearchPage />} />
      <Route exact path="/join" element={<Join />} />
    </Routes>
  );
}

export default AppIndex;
