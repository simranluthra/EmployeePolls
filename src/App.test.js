import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import store from "./redux";

import { _saveQuestion, _saveQuestionAnswer } from "./redux/_DATA";
import { Home, Login, NewQuestion } from "./components";

const loginProps = {
  users: {
    sarahedo: {
      id: "sarahedo",
      password: "password123",
      name: "Sarah Edo",
      avatarURL: "/avatars/sarah.jpg",
      answers: {
        "8xf0y6ziyjabvozdd253nd": "optionOne",
        "6ni6ok3ym7mf1p33lnez": "optionOne",
        am8ehyc8byjqgar0jgpub9: "optionTwo",
        loxhs1bqm25b708cmbf3g: "optionTwo",
      },
      questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
    },
  },
};

describe("1. verify _saveQuestion retuns saved ques", () => {
  it("tests all expected fields are populated", async () => {
    const mockQues = {
      optionOneText: "React",
      optionTwoText: "Node",
      author: "sarahedo",
    };
    const savedQuestion = await _saveQuestion(mockQues);
    expect(savedQuestion).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        author: mockQues.author,
        optionOne: { text: mockQues.optionOneText, votes: [] },
        optionTwo: { text: mockQues.optionTwoText, votes: [] },
        timestamp: expect.any(Number),
      })
    );
  });
});

describe("2. verify _saveQuestion retuns error in case incorrect data passed", () => {
  it("retuns error in case incorrect data passed", async () => {
    const questionMissingOption1 = {
      optionTwoText: "Node",
      author: "sarah",
    };
    await expect(_saveQuestion(questionMissingOption1)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("3. verify _saveQuestionAnswer returns correct ques answer", () => {
  it("returns formatted question", async () => {
    const mockAns = {
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionTwo",
    };
    const { questions, users } = await _saveQuestionAnswer(mockAns);
    expect(
      users[mockAns.authedUser].answers[mockAns.qid] === mockAns.answer
    ).toBe(true);
    expect(
      questions[mockAns.qid][mockAns.answer].votes.includes(mockAns.authedUser)
    ).toBe(true);
  });
});

describe("4. verify _saveQuestionAnswer returns error if incorrect ques answer passed", () => {
  it("returns error if incorrect ques answer passed", async () => {
    const mockIncorrectAnswer = {
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
    };
    await expect(_saveQuestionAnswer(mockIncorrectAnswer)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});

describe("5. Snapshot test", () => {
  it("tests NewQuestion page with snapshot", () => {
    const renderComponent = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewQuestion />
        </BrowserRouter>
      </Provider>
    );
    expect(renderComponent).toMatchSnapshot();
  });
});

describe("6. DOM Test", () => {
  it("tests login button text change on signing in", async () => {
    let component;
    act(() => {
      component = render(
        <React.StrictMode>
          <Provider store={store}>
            <BrowserRouter>
              <Login {...loginProps} />
            </BrowserRouter>
          </Provider>
        </React.StrictMode>
      );
    });
    const loginBtn = component.getByTestId("login-btn");
    fireEvent.click(loginBtn);
    expect(component.getByTestId("loading-text")).toHaveTextContent(
      "Signing in..."
    );
  });
});

// Remaining 4 random unit tests

describe("7. Snapshot test for home page", () => {
  const props = {
    authedUser: "sarahedo",
    questions: {
      "8xf0y6ziyjabvozdd253nd": {
        id: "8xf0y6ziyjabvozdd253nd",
        author: "sarahedo",
        timestamp: 1467166872634,
        optionOne: {
          votes: ["sarahedo"],
          text: "Build our new application with Javascript",
        },
        optionTwo: {
          votes: [],
          text: "Build our new application with Typescript",
        },
      },
      "6ni6ok3ym7mf1p33lnez": {
        id: "6ni6ok3ym7mf1p33lnez",
        author: "mtsamis",
        timestamp: 1468479767190,
        optionOne: {
          votes: [],
          text: "hire more frontend developers",
        },
        optionTwo: {
          votes: ["mtsamis", "sarahedo"],
          text: "hire more backend developers",
        },
      }
    },
    users: {
      sarahedo: {
        id: "sarahedo",
        password: "password123",
        name: "Sarah Edo",
        avatarURL: "/avatars/sarah.jpg",
        answers: {
          "8xf0y6ziyjabvozdd253nd": "optionOne",
          "6ni6ok3ym7mf1p33lnez": "optionOne",
          am8ehyc8byjqgar0jgpub9: "optionTwo",
          loxhs1bqm25b708cmbf3g: "optionTwo",
        },
        questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
      },
      mtsamis: {
        id: "mtsamis",
        password: "xyz123",
        name: "Mike Tsamis",
        avatarURL: "/avatars/mike.jpg",
        answers: {
          xj352vofupe1dqz9emx13r: "optionOne",
          vthrdm985a262al8qx3do: "optionTwo",
          "6ni6ok3ym7mf1p33lnez": "optionOne",
        },
        questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
      }
    },
  };
  it("Home Page to match snapshot", () => {
    const renderComponent = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home {...props} />
        </BrowserRouter>
      </Provider>
    );
    expect(renderComponent).toMatchSnapshot();
  });
});

describe("8. Text change test for new question page", () => {
  it("tests the notify functionality when empty form is submitted", async () => {
    let component;
    act(() => {
      component = render(
        <React.StrictMode>
          <Provider store={store}>
            <BrowserRouter>
              <NewQuestion />
            </BrowserRouter>
          </Provider>
        </React.StrictMode>
      );
    });
    const submitBtn = component.getByTestId("submit-btn");
    fireEvent.click(submitBtn);
    expect(component.getByTestId("notify-text")).toHaveTextContent(
      "Options cannot be empty."
    );
  });

  it("9. gives error when try to submit with only 1 option", async () => {
    let component;
    act(() => {
      component = render(
        <React.StrictMode>
          <Provider store={store}>
            <BrowserRouter>
              <NewQuestion />
            </BrowserRouter>
          </Provider>
        </React.StrictMode>
      );
    });
    const optionOne = component.getByTestId("option-one");
    const submitBtn = component.getByTestId("submit-btn");
    fireEvent.change(optionOne, { target: { value: "submitting with only 1 option" } });
    fireEvent.click(submitBtn);
    expect(component.getByTestId("notify-text")).toHaveTextContent(
      "Options cannot be empty."
    );
  });
});

describe("10. Login page test", () => {
  it("has fields for username, password as well as login button", async () => {
    let component;
    act(() => {
      component = render(
        <React.StrictMode>
          <Provider store={store}>
            <BrowserRouter>
              <Login {...loginProps} />
            </BrowserRouter>
          </Provider>
        </React.StrictMode>
      );
    });
    expect(component.getByTestId("input-username")).toBeTruthy()
    expect(component.getByTestId("input-password")).toBeTruthy()
    expect(component.getByTestId("login-btn")).toBeTruthy()
  });
});
