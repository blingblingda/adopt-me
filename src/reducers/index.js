import { combineReducers } from "redux";
import theme from "./theme";
import location from "./location";
import animal from "./animal";
import breed from "./breed";

export default combineReducers({
  theme: theme,
  location,
  animal,
  breed,
});
