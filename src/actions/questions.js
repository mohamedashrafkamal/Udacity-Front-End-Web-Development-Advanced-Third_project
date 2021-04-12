import { showLoading, hideLoading } from "react-redux-loading";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { addQuestionIdToUser, addQuestionAnswerToUser } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function answerQuestion(question) {
  return {
    type: ANSWER_QUESTION,
    question,
  };
}

export function handleAnswerQuestion(questionDetails) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const { id, answer } = questionDetails;
    dispatch(showLoading());
    saveQuestionAnswer({
      authedUser: authedUser.username,
      qid: id,
      answer,
    })
      .then(() => {
        dispatch(
          answerQuestion({
            author: authedUser.username,
            id,
            answer,
          })
        );

        return {
          author: authedUser.username,
          id,
          answer,
        };
      })
      .then((question) => {
        dispatch(addQuestionAnswerToUser(question));
      })
      .then(() => {
        dispatch(hideLoading());
      });
  };
}

export function handleAddQuestion(options) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    saveQuestion({
      ...options,
      author: authedUser.username,
    })
      .then((question) => {
        dispatch(addQuestion(question));

        return question;
      })
      .then((question) => {
        dispatch(addQuestionIdToUser(question));
      })
      .then(() => {
        dispatch(hideLoading());
      });
  };
}
