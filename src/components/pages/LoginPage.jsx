import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiService from "../../services/APIService";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function updateName(e) {
    setName(e.target.value.toLowerCase());
  }
  function updatePassword(e) {
    setPassword(e.target.value);
  }

  async function authenticateUser(e) {
    e.preventDefault();
    let userCredentials = {
      name,
      password,
    };
    let result = await apiService.sendAuthReq(userCredentials);

    if (result.success) {
      dispatch(setUser(result.user));
      return navigate("/");
    } else {
      console.log(result.message);
    }
  }
  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Log in</h2>
        <form onSubmit={authenticateUser}>
          <input
            onChange={updateName}
            className="name"
            type="text"
            value={name}
            minLength={1}
            maxLength={64}
            pattern="\w+"
            required
          />
          <input
            onChange={updatePassword}
            className="password"
            type="password"
            value={password}
            minLength={8}
            maxLength={64}
            pattern="^[!-z]{8,64}$"
            required
          />
          <input className="submit" type="submit" value={"Log in"} />
        </form>
        <span>Don't have an account yet? </span>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
}
