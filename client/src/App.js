import React from "react";
import "./App.css";
import AppIndex from "./AppIndex";
import { useLocation, useNavigate } from "react-router-dom";

export const StoreContext = React.createContext();

function App() {
  const [search, setSearch] = React.useState({
    text: "",
    page: "",
  });
  const [loginUser, setLoginUser] = React.useState({
    id: "",
    nick: "",
    autoLogin: false,
    liked: [],
  });

  const { pathname } = useLocation();
  const navigation = useNavigate();

  const nonAccess = () => {
    const nonAccessAddress = ["join", "Login"];
    const address = pathname.slice(1);

    if (nonAccessAddress.includes(address) && loginUser.id !== "") {
      navigation("/");
    }
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
      }}
    >
      <AppIndex />
    </StoreContext.Provider>
  );
}

export default App;
