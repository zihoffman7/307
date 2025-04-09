import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp";
import "./index.css";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(<MyApp />);
