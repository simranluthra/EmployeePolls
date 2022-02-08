const Leaderboard = (props) => {
  const { users = {} } = props;
  console.log("hello", users);
  const sortedUsers = Object.values(users).sort((userX, userY) => (
      (Object.entries(userY.answers).length + userY.questions.length) -
      (Object.entries(userX.answers).length + userX.questions.length)
    )
  );

  return (
    <div className="container mt-5">
      <table className="table mt-4">
        <thead className="table-light">
          <tr>
            <th scope="col">User</th>
            <th className="text-center" scope="col">
              Answered
            </th>
            <th className="text-center" scope="col">
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <img
                  src={user.avatarURL}
                  className="img-thumbnail"
                  alt={"username"}
                  width="50"
                />
                {user.name}
              </td>
              <td className="text-center">
                {Object.entries(user.answers).length}
              </td>
              <td className="text-center">{user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
