// import { createStore } from "redux";
// import { combineReducer } from "./combineReducer";

// export const store = createStore(
//     combineReducer
// )

import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../Slices/productsApi";
import productsReducer, { productsFetch } from "../Slices/productsSlice";
import cartReducer, { getTotals } from "../Slices/cartSlice";

const rootReducer = {
  products: productsReducer,
  cart: cartReducer,
  [productsApi.reducerPath]: productsApi.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.dispatch(productsFetch());
store.dispatch(getTotals());

export default store;
