import { getInitailData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { showLoading, hideLoading } from "react-redux-loading";

export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";

export function setErrorMessage(message) {
  return {
    type: SET_ERROR_MESSAGE,
    message,
  };
}

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitailData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      //   dispatch(signIn("mashraf"));
      //   dispatch(setErrorMessage("Error message"));
      dispatch(hideLoading());
    });
  };
}
