import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import { authApi } from "../auth/authApi";

const rootRedcuer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
});
export default rootRedcuer;
