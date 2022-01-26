import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { saveQuestion } from "../redux/actions";

const NewQuestion = () => {
  const { authedUser: author } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const [toHome, setToHome] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    alertClass: ""
  });

  useEffect(() => {
    setStatusMessage(null);
  }, [optionOneText, optionTwoText]);

  useEffect(() => {
    if (toHome) navigate("/");
  }, [navigate, toHome]);

  function handleSubmit() {
    if (!optionOneText.trim() || !optionTwoText.trim()) {
      return setStatusMessage({
        message: "Options cannot be empty.",
        alertClass: "danger"
      });
    } else {
      const question = {
        optionOneText,
        optionTwoText,
        author
      };
      submit(question);
    }
  }

  function submit(question) {
    setStatusMessage({
      message: "Adding question...",
      alertClass: "info"
    });
    dispatch(saveQuestion(question))
      .then(({ type }) => {
        if (type === "SET_QUESTION") {
          setToHome(true);
        }
      });
  }

  return (
    <div className="container mt-4 text-center">
      <h1>Would You Rather</h1>
      <p>Create your own poll</p>
      <label htmlFor="question1" className="form-label">
        First Option:
      </label>
      <input
        onChange={({ target }) => setOptionOneText(target.value)}
        value={optionOneText}
        type="text"
        className="form-control"
        placeholder="First option.."
        data-testid="option-one"
      />
      <label htmlFor="question2" className="form-label">
        Second Option:
      </label>
      <input
        onChange={({ target }) => setOptionTwoText(target.value)}
        value={optionTwoText}
        type="text"
        className="form-control"
        placeholder="Second option.."
        data-testid="option-two"
      />
      {statusMessage && (
        <div
          data-testid="notify-text"
          className={`my-2 alert alert-${statusMessage.alertClass}`}
          role="alert"
        >
          {statusMessage.message}
        </div>
      )}
      <button
        data-testid="submit-btn"
        type="button"
        className="btn btn-primary my-3"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default NewQuestion;
