import React from "react";
import { Routes, Route } from "react-router-dom";
import { Main, SearchPage } from "./pages";

function AppIndex() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default AppIndex;
