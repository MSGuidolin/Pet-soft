import React from "react";
import store from "../src/Redux/store/store.js";
import { Provider } from "react-redux";
import App from "./Container/App";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import "./index.scss";

export const UserContext = React.createContext();

const Root = () => {
  const [user, setUser] = React.useState({});

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <UserContext.Provider value={{ user, setUser }}>
            <App />
          </UserContext.Provider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default render(<Root />, document.getElementById("root"));
