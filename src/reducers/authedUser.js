import { SIGN_UP, SIGN_IN, SIGN_OUT } from "../actions/authedUser";

export default function authedUser(state = {}, action) {
  switch (action.type) {
    case SIGN_UP:
    case SIGN_IN:
      return {
        ...state,
        ...action.authedUser,
      };
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
}
