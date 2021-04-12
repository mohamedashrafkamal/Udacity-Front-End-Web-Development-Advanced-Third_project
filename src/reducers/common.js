import { SET_ERROR_MESSAGE } from "../actions/shared";

export default function common(state = null, action) {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return action.message;

    default:
      return state;
  }
}
