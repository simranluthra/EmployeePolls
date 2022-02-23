import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const navItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Leaderboard",
    link: "/leaderboard",
  },
  {
    title: "New",
    link: "/add",
  },
];

const Header = (props) => {
  const { currentUser } = props;
  const dispatch = useDispatch();
  const handleLogout = () =>
    dispatch({
      type: "SIGNOUT",
    });

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top navbar-light bg-light"
      aria-label="Main navigation"
    >
      <div className="container-fluid">
        <div className="d-flex justify-content-between">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item, index) => {
              return (
                <li className="nav-item" key={`${item.title}-${index}`}>
                  <Link className="nav-link active" to={item.link}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {currentUser && (
          <span className="">
            <ul className="navbar-nav me-end mb-2 mb-lg-0">
              <li className="nav-item">
                <img
                  src={currentUser.avatarURL}
                  className="img-thumbnail img-fluid me-end"
                  alt={currentUser.name + " avatar"}
                  width="45"
                />
              </li>
              <li className="nav-item">
                <span className="nav-link active">{currentUser.name}</span>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Header;
