import { getInitialData, _saveQuestionAnswer, _saveQuestion } from "./_DATA";

export function loadInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch({
        type: "GET_QUESTIONS",
        questions
      });

      dispatch({
        type: "GET_USERS",
        users
      });
    });
  };
}

export function saveQuestionAnswer({ authedUser, qid, answer }) {
  return (dispatch) => {
    return _saveQuestionAnswer({ authedUser, qid, answer }).then(
      ({ users, questions }) => {
        dispatch({
          type: "GET_QUESTIONS",
          questions
        });

        dispatch({
          type: "GET_USERS",
          users
        });
      }
    );
  };
}

export function saveQuestionAction(question) {
  return {
    type: "SET_QUESTION",
    question
  };
}

export const saveQuestion = (question) => (dispatch) =>
  _saveQuestion(question)
    .then((question) =>
      dispatch(saveQuestionAction(question))
    );
