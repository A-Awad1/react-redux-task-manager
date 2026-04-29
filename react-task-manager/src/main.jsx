import "~/assets/scss/main.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import App from "./App.jsx";
import { store } from "./redux/index.js";
import { Provider } from "react-redux";

const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
