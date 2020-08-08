import { applyMiddleware, createStore, compose } from "redux";
import promiseMiddleware from "redux-promise";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer.js";

const middleware = [promiseMiddleware, thunk];
let composeEnhancers = compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);
