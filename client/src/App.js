import React from "react";
import "./App.css";
import AppIndex from "./AppIndex";
import { useNavigate } from "react-router-dom";

export const StoreContext = React.createContext();

function App() {
  const navigation = useNavigate();

  const [search, setSearch] = React.useState({
    text: "",
    page: "",
  });

  React.useEffect(() => {
    navigation(search.page);
  }, [search]);
  return (
    <StoreContext.Provider
      value={{
        search: search,
        setSearch: setSearch,
      }}
    >
      <AppIndex />
    </StoreContext.Provider>
  );
}

export default App;
