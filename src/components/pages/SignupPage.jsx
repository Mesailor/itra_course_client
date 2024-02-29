import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../services/APIService";
import { setUser } from "../../store/userSlice";

export default function RegPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function updateName(e) {
    setName(e.target.value.toLowerCase());
  }
  function updatePassword(e) {
    setPassword(e.target.value);
  }

  async function signupUser(e) {
    e.preventDefault();
    const newUser = {
      name,
      password,
    };
    const result = await apiService.sendSignupReq(newUser);

    if (result.success) {
      dispatch(setUser(result.user));
      return navigate("/");
    } else {
      console.log(result.message);
    }
  }
  return (
    <div className="signup-page">
      <div className="signup-from">
        <h2>Sign up</h2>
        <form onSubmit={signupUser}>
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
          <input className="submit" type="submit" value={"Sign up"} />
        </form>
        <span>Already have an account?</span>
        <Link to="/log-in">Log In</Link>
      </div>
    </div>
  );
}
