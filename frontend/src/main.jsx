import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store";
import { useLoadUserQuery } from "./auth/authApi.js";
import { Toaster } from "sonner";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import { Navigate } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      {/* <Custom> */}
      <App />
      <Toaster />
      {/* </Custom> */}
    </Provider>
  </StrictMode>
);
