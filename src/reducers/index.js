import { combineReducers } from "redux";
import authedUser from "./authedUser";
import common from "./common";
import users from "./users";
import questions from "./questions";
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
  authedUser,
  common,
  users,
  questions,
  loadingBar: loadingBarReducer,
});
