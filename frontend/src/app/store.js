import { configureStore } from "@reduxjs/toolkit";
import rootRedcuer from "./rootReducer";
import { authApi } from "../auth/authApi";

export const appStore = configureStore({
  reducer: rootRedcuer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware),
});

const intializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
intializeApp();
