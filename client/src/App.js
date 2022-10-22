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
  });

  const navigation = useNavigate();
  const { pathname } = useLocation();
  const nonAccess = () => {
    const nonAccessAddress = ["join", "Login"];
    const address = pathname.slice(1);
    console.log(pathname);

    if (nonAccessAddress.includes(address) && loginUser.id !== "") {
      navigation("/");
    }
  };

  const autoLogin = () => {
    const user = JSON.parse(localStorage.getItem("loginUser"));

    console.log("localStorage : ", user);
    if (user) {
      setLoginUser(user);
    }
  };

  React.useEffect(() => {
    nonAccess();
  }, [pathname]);

  React.useEffect(() => {
    autoLogin();
  }, []);
  return (
    <StoreContext.Provider
      value={{
        search: search,
        setSearch: setSearch,
        loginUser: loginUser,
        setLoginUser: setLoginUser,
      }}
    >
      <AppIndex />
    </StoreContext.Provider>
  );
}

export default App;
