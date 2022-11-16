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
} from "./pages";
function Test() {
  const { loginUser } = React.useContext(StoreContext);
  const [file, setFile] = React.useState([]);
  const [image, setImage] = React.useState();

  const 파일서버저장 = async () => {
    const file_element = document.querySelector(".file");
    const file = file_element.files[0];
    const form = new FormData();

    form.append("file", file);

    await axios({
      url: "http://localhost:5000/file",
      method: "post",
      data: {
        file,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(({ data }) => {
      console.log(data);
      setImage(`/img/${data}`);
    });
  };

  return (
    <div>
      <input className="file" type="file" accept="image/*" name="file" />
      <button onClick={파일서버저장}>파일 저장</button>
      <img
        style={{ widht: "500px", height: "500px" }}
        src={process.env.PUBLIC_URL + image}
        alt="이미지"
      ></img>
    </div>
  );
}
function AppIndex() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/search" element={<SearchPage />} />
      <Route exact path="/join" element={<Join />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/profile" element={<ProfilePage />} />
      <Route exact path="/test" element={<Test />} />
      <Route exact path="/userdelete" element={<DeletePage />}></Route>
    </Routes>
  );
}

export default AppIndex;
