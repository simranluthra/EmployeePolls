import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PageNotFound } from ".";

import { saveQuestionAnswer } from "../redux/actions";

const optionOne = "optionOne";
const optionTwo = "optionTwo";

const QuestionDetails = () => {
  const { authedUser, users, questions } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { qid } = useParams();
  
  const [myAnswer, setMyAnswer] = useState(null);

  const isValidQid = Object.keys(questions).some((questionId) => questionId === qid);
  const question = questions[qid];

  useEffect(() => {
    if (!authedUser) {
      navigate("/login");
    }
  }, [authedUser, navigate]);

  useEffect(() => {
    if (question) {
      if (question.optionOne.votes.some((id) => id === authedUser)) {
        setMyAnswer(optionOne);
      } else if (question.optionTwo.votes.some((id) => id === authedUser)) {
        setMyAnswer(optionTwo);
      }
    }
  }, [authedUser, question]);

  if (!question) return <PageNotFound />;
  const author = users[question.author];
  const disabled = myAnswer ? true : false;

  if (!isValidQid) {
    return (
      <div className="container text-center my-4 pt-">
        <h1>Question not found.</h1>
      </div>
    );
  }

  function handleVote(answer) {
    setMyAnswer(answer);
    dispatch(saveQuestionAnswer({ authedUser, qid, answer, users }));
  }

  function getVotes(option) {
    const count = question[option].votes.length;
    const percentage = parseFloat(
      (question[option].votes.length /
        (question.optionOne.votes.length + question.optionTwo.votes.length)) *
        100
    ).toFixed(2);
    return `${count} votes (${percentage}%)`;
  }

  return (
    <div className="container text-center my-4">
      <h3>Poll by {author.name}</h3>
      <img
        src={author.avatarURL}
        className="img-thumbnail"
        alt={"username"}
        width="250"
      />
      <h2 className="my-4">Would you rather</h2>
      <div className="row">
        <div
          className={`d-flex flex-column col rounded p-3 m-2 ${
            myAnswer === optionOne ? "shadow" : ""
          }`}
        >
          <p>{question.optionOne.text}</p>
          {myAnswer === optionOne && (
            <span className="badge bg-success mt-2">
              You selected this option
            </span>
          )}
          {!disabled && (
            <button
              className="w-100 btn btn-primary mt-auto"
              onClick={() => handleVote(optionOne)}
            >
              Click
            </button>
          )}
        </div>

        <div
          className={`d-flex flex-column col rounded p-3 m-2 ${
            myAnswer === optionTwo ? "shadow" : ""
          }`}
        >
          <p>{question.optionTwo.text}</p>
          {myAnswer === optionTwo && (
            <span className="badge bg-success mt-2">
              You selected this option
            </span>
          )}
          {!disabled && (
            <button
              className="w-100 btn btn-primary mt-auto"
              onClick={() => handleVote(optionTwo)}
            >
              Click
            </button>
          )}
        </div>
      </div>

      {myAnswer && (
        <div className="row mb-4">
          <div className="col rounded p-3 m-2">
            <p>{getVotes(optionOne)}</p>
          </div>
          <div className="col rounded p-3 m-2">
            <p>{getVotes(optionTwo)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetails;
