import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import '@fontsource/inter/300.css'; // Regular weight
import '@fontsource/inter/400.css'; // Regular weight
import '@fontsource/inter/700.css'; // Bold weight


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
