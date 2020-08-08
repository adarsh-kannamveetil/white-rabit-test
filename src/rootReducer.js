import { combineReducers } from "redux";
import users from "./components/users/reducer";

const rootReducer = combineReducers({
  users,
});

export default rootReducer;
