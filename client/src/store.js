import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./redux/userSlice";
import productReducer from "./redux/productSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});
export default store;