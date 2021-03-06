export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER = "ADD_USER";
export const ADD_QUESTION_ID_TO_USER = "ADD_QUESTION_ID_TO_USER";
export const ADD_QUESTION_ANSWER_TO_USER = "ADD_QUESTION_ANSWER_TO_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function addQuestionIdToUser(question) {
  return {
    type: ADD_QUESTION_ID_TO_USER,
    question,
  };
}

export function addQuestionAnswerToUser(questionDetails) {
  return {
    type: ADD_QUESTION_ANSWER_TO_USER,
    questionDetails,
  };
}
