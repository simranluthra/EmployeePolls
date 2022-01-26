import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const QuestionRow = (props) => {
  const { question, users } = props;
  const { id, author, timestamp } = question;
  const { name } = users[author];
  return (
    <Card className="mt-2">
      <Card.Body>
        <Card.Title>
          <h6 className="mb-0">{name}</h6>
        </Card.Title>
        <Card.Text>
          <small className="opacity-50 text-nowrap">
            {new Date(timestamp).toDateString()}
          </small>
        </Card.Text>
          <Link
            to={`/questions/${id}`}
            className="list-group-item list-group-item-action d-flex gap-3 py-3"
            aria-current="true"
          >
              <Button>Show</Button>
          </Link>
      </Card.Body>
    </Card>
  );
};

export default QuestionRow;
