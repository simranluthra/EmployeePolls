import { combineReducers } from "redux";

const authedUser = (oldState = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.id;
    case "SIGNOUT":
      return null;
    default:
      return oldState;
  }
};

const questions = (oldState = {}, action) => {
  const { questions, authedUser, qid, answer, question } = action;

  switch (action.type) {
    case "GET_QUESTIONS":
      const getQuestionsState = {
        ...oldState,
        ...questions,
      };
      return getQuestionsState;
    case "SAVE_ANSWER":
      const saveAnswerState = {
        ...oldState,
        questions: {
          ...questions,
          [qid]: {
            ...questions[qid],
            [answer]: {
              ...questions[qid][answer],
              votes: questions[qid][answer].votes.concat([authedUser]),
            },
          },
        },
      };
      return saveAnswerState;
    case "SET_QUESTION":
      const setQuestionState = {
        ...oldState,
        ...questions,
        [question.id]: { ...question },
      };
      return setQuestionState;

    default:
      return oldState;
  }
};

const users = (oldState = {}, action) => {
  const { authedUser, qid, answer, question } = action;

  switch (action.type) {
    case "GET_USERS":
      const getUsersState = {
        ...oldState,
        ...action.users,
      };
      return getUsersState;
    case "SAVE_ANSWER":
      const saveAnswerState = {
        ...oldState,
        users: {
          ...users,
          [authedUser]: {
            ...users[authedUser],
            answers: {
              ...users[authedUser].answers,
              [qid]: answer,
            },
          },
        },
      };
      return saveAnswerState;

    case "SET_QUESTION":
      const setQuestionState = {
        ...oldState,
        [question.author]: {
          ...oldState[question.author],
          questions: oldState[question.author].questions.concat(question.id),
        },
      };
      return setQuestionState;

    default:
      return oldState;
  }
};

export default combineReducers({
  authedUser,
  questions,
  users,
});
