import {
  RECEIVE_USERS,
  ADD_USER,
  ADD_QUESTION_ID_TO_USER,
  ADD_QUESTION_ANSWER_TO_USER,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users;
    case ADD_USER:
      return {
        ...state,
        [action.user.id]: {
          ...action.user,
        },
      };
    case ADD_QUESTION_ID_TO_USER:
      const { author, id } = action.question;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id]),
        },
      };
    case ADD_QUESTION_ANSWER_TO_USER:
      const { questionDetails } = action;
      return {
        ...state,
        [questionDetails.author]: {
          ...state[questionDetails.author],
          answers: {
            ...state[questionDetails.author].answers,
            [questionDetails.id]: questionDetails.answer,
          },
        },
      };
    default:
      return state;
  }
}
