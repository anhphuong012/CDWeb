import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { thunk } from "redux-thunk";

import rootReducer from "./rootReducer";

const middleware = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
