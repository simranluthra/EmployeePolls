import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import '../App.css';

const Login = (props) => {
  const users = Object.values(props?.users ?? {});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState("/");

  useEffect(() => {
    const redirectTo = window.location.pathname.includes("/questions/")
      ? pathname
      : pathname;
    setRedirectTo(redirectTo);
  }, [pathname]);

  useEffect(() => {
    if (Object.values(props.users).length > 0) {
      const userValues = Object.values(props.users);
      const randomUser = userValues[Math.floor(Math.random() * userValues.length)];
      setUser(randomUser);
      setPassword(randomUser.password);
    }
  }, [props.users]);

  const handleOnSelectUser = (e) => {
    const userId = e.target.value;
    const newUser = props.users[userId];
    setUser(newUser);
    setPassword(newUser.password);
  };

  const isVerified = async (userId, pass) => {
    const setTimeoutPromise = () =>
      new Promise((resolve) => setTimeout(resolve, 300));
    await setTimeoutPromise();
    return props.users[userId].password === pass;
  };

  const logIn = async () => {
    setLoading(true);
    const verifed = await isVerified(user.id, password);
    if (verifed) {
      dispatch({
        type: "SET_USER",
        id: user.id,
      });
      setLoading(false);
      navigate(redirectTo);
    } else {
      setLoading(false);
      console.log("invalid credentials", user.id, password);
    }
  };

  return (
    <div className="form-signin text-center mt-4">
      <h1 className="h1 form-header">Employee Polls</h1>
      <img
        className="main-logo"
        src={logoheader}
        alt=" "
        width="100%"
        height="100"
      />
      <h1 className="h3 my-4 fw-normal">Login</h1>
      <div className="form-floating" data-testid="input-username">
        <select
          value={user?.id ?? "loading"}
          className="form-select"
          aria-label="Select a user"
          onChange={handleOnSelectUser}
          disabled={users.length === 0}
        >
          {!user ||
            (users.length === 0 && (
              <option value="loading" disabled>Select User</option>
            ))}
          {users.map((user, i) => (
            <option key={`${user.id}-${i}`} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label htmlFor="floatingInput">username</label>
      </div>
      <div className="form-floating my-2" data-testid="input-password">
        <input
          type="text"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          value={password}
          disabled
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <button
        className="w-100 btn btn-lg btn-primary"
        onClick={logIn}
        disabled={loading || user == null}
        data-testid="login-btn"
      >
        {loading ? (
          <span className="spinner-border text-light" role="status" data-testid="loading-text">
            Signing in...
          </span>
        ) : (
          "Log in"
        )}
      </button>
    </div>
  );
};

export default Login;
