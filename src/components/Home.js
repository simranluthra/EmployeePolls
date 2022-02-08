import { useState, useEffect } from "react";
import QuestionRow from "./QuestionRow";
import CardGroup from "react-bootstrap/CardGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Home = (props) => {
  console.log(props);
  const { authedUser, users, questions } = props;
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [unAnsweredQuestions, setUnAnsweredQuestions] = useState([]);

  useEffect(() => {
    let answered = [];
    let unAnswered = [];
    for (const id in questions) {
      const question = questions[id];
      const voted = question.optionOne.votes
        .concat(question.optionTwo.votes)
        .some((id) => id === authedUser);
      voted ? answered.push(question) : unAnswered.push(question);
    }
    const sorted = (arr) => arr.sort((a, b) => b.timestamp - a.timestamp);
    setAnsweredQuestions(sorted(answered));
    setUnAnsweredQuestions(sorted(unAnswered));
  }, [authedUser, questions]);

  return (
    <main className="container">
      <div className="bg-body rounded shadow-sm">
      <Tabs defaultActiveKey="UnansweredQuestions" id="uncontrolled-tab-example" className="mb-2 mt-5">
        <Tab eventKey="UnansweredQuestions" title="UnansweredQuestions">
        <div className="bg-body rounded shadow-sm">
          <CardGroup>
            <Row className="g-4 w-100">
              <Col>
                  {unAnsweredQuestions.map((question) => {
                    return <QuestionRow key={question.id} question={question} users={users} />;
                  })}
              </Col>
            </Row>
          </CardGroup>
        </div>
        </Tab>
        <Tab eventKey="answeredQuestions" title="answeredQuestions">
              <CardGroup>
                <Row className="g-4 w-100">
                  <Col>
                    {answeredQuestions.map((question) => {
                      return <QuestionRow key={question.id} question={question} users={users} />;
                    })}
                  </Col>
                </Row>
              </CardGroup>
        </Tab>
      </Tabs>
      </div>
    </main>
  );
};

export default Home;
