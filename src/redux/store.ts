import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../redux/employeeReducer";

const store = configureStore({
  reducer: employeeReducer,
});

export default store;
