import React from "react";
import ReactDOM from "react-dom/client";
import "lazysizes";
import App from "./App";
import "./scss/index.scss";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
