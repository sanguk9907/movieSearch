import React from "react";
import "./App.css";
import AppIndex from "./AppIndex";
import { useNavigate } from "react-router-dom";

export const StoreContext = React.createContext();

function App() {
  const navigation = useNavigate();
  const [dispatchType, setDispatchType] = React.useState({
    text: "",
    page: "",
  });

  const [search, setSearch] = React.useState({
    text: "",
    page: "",
  });

  React.useEffect(() => {
    navigation(dispatchType.page);
    setSearch(dispatchType);
  }, [dispatchType]);
  return (
    <StoreContext.Provider value={{ setDispatchType: setDispatchType, search }}>
      <AppIndex />
    </StoreContext.Provider>
  );
}

export default App;
