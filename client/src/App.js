import React from "react";
import "./App.css";
import AppIndex from "./AppIndex";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

export const StoreContext = React.createContext();

function App() {
  axios.defaults.withCredentials = true;
  const [search, setSearch] = React.useState({
    text: "",
    reset: [],
  });
  const [loginUser, setLoginUser] = React.useState({
    seq: "",
    id: "",
    nick: "",
    email: "",
    phoneNumber: "",
    userIntroduction: "",
  });
  const [loading, setLoading] = React.useState(true);
  const loadStyle = loading
    ? { overflow: "hidden", height: "100vh" }
    : { overflow: "hidden" };

  const { pathname } = useLocation();
  const navigation = useNavigate();

  const nonAccess = () => {
    const nonAccessAddress = ["join", "login"];
    const address = pathname.slice(1);

    if (nonAccessAddress.includes(address) && loginUser.id !== "") {
      navigation("/");
    }
    // if ("profile".includes(address) && loginUser.id === "") {
    //   console.log(loginUser.id);
    //   navigation("/");
    // }
  };

  const autoLogin = () => {
    const localStorageUser = JSON.parse(localStorage.getItem("loginUser"));

    const sessionStorageUser = JSON.parse(sessionStorage.getItem("loginUser"));

    if (localStorageUser) {
      setLoginUser(localStorageUser);
    } else if (sessionStorageUser) {
      setLoginUser(sessionStorageUser);
    }
  };

  const showMobileHeader = useMediaQuery({ maxWidth: 768 });

  React.useEffect(() => {
    autoLogin();
  }, [pathname]);

  React.useEffect(() => {
    nonAccess();
  }, [loginUser]);

  return (
    <StoreContext.Provider
      value={{
        search: search,
        setSearch: setSearch,
        loginUser: loginUser,
        setLoginUser: setLoginUser,
        autoLogin: autoLogin,
        loading: loading,
        setLoading: setLoading,
        loadStyle: loadStyle,
        showMobileHeader: showMobileHeader,
      }}
    >
      <AppIndex />
    </StoreContext.Provider>
  );
}

function Test() {
  axios.defaults.withCredentials = true;
  const file = React.useRef();
  const [images, setImages] = React.useState({});
  const [profileImage, setProfileImage] = React.useState("");

  const handleChange = (e) => {
    setImages(e.target.files[0]);
  };

  const submitFile = async () => {
    const form = new FormData();
    form.append("file", images);
    await axios
      .post("http://localhost:5000/test", form, {
        "Content-Type": "multipart/form-data",
      })
      .then(({ data }) => {
        setProfileImage(data.filename);
      });
  };

  return (
    <div>
      <input ref={file} type="file" onChange={handleChange} />
      <button onClick={submitFile} type="button">
        전송
      </button>
      <img src={`./img/${profileImage}`} alt="profile"></img>
    </div>
  );
}

export default App;
