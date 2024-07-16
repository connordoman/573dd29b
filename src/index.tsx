import "./css/app.css";

import App from "./App";

import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("app");

if (rootElement) {
    createRoot(rootElement).render(<App />);
} else {
    // create a dom node on the fly if the desired one doesn't exist
    const onTheFlyRoot = document.createElement("div");
    onTheFlyRoot.id = "app";
    createRoot(onTheFlyRoot).render(<App />);
}
