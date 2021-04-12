import {
  _getQuestions,
  _getUsers,
  _saveUser,
  _getUser,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA";

export function getInitailData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function saveUser(user) {
  return _saveUser(user);
}

export function getUser(id) {
  return _getUser(id);
}

export function saveQuestion(options) {
  return _saveQuestion(options);
}

export function saveQuestionAnswer(questionDetails) {
  return _saveQuestionAnswer(questionDetails);
}
