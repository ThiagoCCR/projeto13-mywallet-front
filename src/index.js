import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/reset.css";
import "./assets/style.css";
import App from "./components/App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
