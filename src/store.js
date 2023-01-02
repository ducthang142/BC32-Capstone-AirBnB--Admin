import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import vitri from "./slices/vitriSlice";
import phong from "./slices/phongSlice";
import datphong from "./slices/datphongSlice";

const store = configureStore({
  reducer: {
    auth,
    vitri,
    phong,
    datphong,
  },
});

export default store;
