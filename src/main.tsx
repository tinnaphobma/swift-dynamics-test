import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { I18nextProvider } from "react-i18next";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.ts";
import i18n from "./i18n";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
