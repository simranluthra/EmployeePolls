import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loadInitialData } from "./redux/actions";
import {
  Header,
  Home,
  NewQuestion,
  Leaderboard,
  Login,
  PageNotFound,
  QuestionDetails,
} from "./components";

const Router = ({ redirect }) => {
  const { authedUser, users, questions } = useSelector((store) => store);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  useEffect(() => dispatch(loadInitialData()), [dispatch]);
  useEffect(() => setUser(users[authedUser]), [authedUser, users]);
  

  return (
    <BrowserRouter>
      <Header currentUser={user} />
      <Routes>
        {user == null ? (
          <Route
            path="*"
            element={<Login users={users} redirectTo={redirect} />}
          />
        ) : (
          <>
            <Route
              exact
              path="/"
              element={
                <Home
                  authedUser={authedUser}
                  questions={questions}
                  users={users}
                />
              }
            />
            <Route exact path="/add" element={<NewQuestion />} />
            <Route
              exact
              path="/leaderboard"
              element={<Leaderboard users={users} />}
            />
            <Route exact path="/questions/:qid" element={<QuestionDetails />} />
            <Route path="*" element={<PageNotFound />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
