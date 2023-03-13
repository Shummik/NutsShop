import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/index.scss";
import BasketContext from "./context";
import "./assets/fonts/Inter/Inter-Regular.ttf";

import ScrollToTop from "./helpers/ScrollToTop";

const Main = () => {
  const [basket, setBasket] = useState([]);
  // const [basketStatus, setBasketStatus] = useState(false);

  return (
    // <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <BasketContext.Provider value={{ basket, setBasket }}>
        <App />
      </BasketContext.Provider>
    </BrowserRouter>
    // </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
