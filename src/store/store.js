// import {legacy_createStore as createStore,compose,applyMiddleware,} from "redux";
import errorReducer from "./errors";
import { logger } from "./middleware/loger";
import taskReducer from "./task";
// import { thunk } from "./middleware/thunk";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// const applymiddlewareEnhancer = applyMiddleware(logger, thunk);
const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReducer,
});

function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devtools: process.env.NODE_ENV !== "production",
  });
}
export default createStore;
