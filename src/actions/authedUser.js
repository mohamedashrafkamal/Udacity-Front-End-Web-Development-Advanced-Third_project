import { saveUser, getUser } from "../utils/api";
import { setErrorMessage } from "./shared";
import { addUser } from "./users";
import { showLoading, hideLoading } from "react-redux-loading";

export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

function signUp(authedUser) {
  return {
    type: SIGN_UP,
    authedUser,
  };
}

export function signIn(authedUser) {
  return {
    type: SIGN_IN,
    authedUser,
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function handleSignUp(user) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveUser(user)
      .then((addedUser) => {
        dispatch(addUser(addedUser));
        dispatch(signUp({ username: addedUser.id, icon: addedUser.avatarURL }));
        return "SUCCEEDED";
      })
      .catch((err) => {
        dispatch(setErrorMessage(err.message));
        return "FAILED";
      })
      .then((msg) => {
        dispatch(hideLoading());
        return msg;
      });
  };
}

export function handleSignIn({ id, password }) {
  return (dispatch) => {
    dispatch(showLoading());
    return getUser(id)
      .then((user) => {
        if (user.password === password) {
          dispatch(signIn({ username: user.id, icon: user.avatarURL }));
          return "SUCCEEDED";
        } else {
          dispatch(setErrorMessage("Invalid username or password"));
          return "FAILED";
        }
      })
      .catch(() => {
        dispatch(setErrorMessage("Invalid username or password"));
        return "FAILED";
      })
      .then((msg) => {
        dispatch(hideLoading());
        return msg;
      });
  };
}
