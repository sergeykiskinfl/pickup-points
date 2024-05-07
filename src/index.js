import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import './index.scss'

if (module.hot) module.hot.accept();

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(<App />);
