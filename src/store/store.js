import { createStore } from "redux";
import reducer from "../reducers/index";

const store = createStore(
  reducer,
  // this enables the redux dev tools
  typeof window === "object" &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

export default store;
