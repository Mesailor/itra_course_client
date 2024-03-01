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
    <div className="signup-page container vh-100 d-flex align-items-center">
      <div
        style={{ width: "35%" }}
        className="signup-form  m-auto align-middle d-flex flex-column text-center"
      >
        <h2 className="m-3">Create an account</h2>
        <form className="d-flex flex-column text-start" onSubmit={signupUser}>
          <label className="form-label">Name</label>
          <input
            onChange={updateName}
            className="name form-control mb-3"
            type="text"
            value={name}
            minLength={1}
            maxLength={64}
            pattern="\w+"
            required
          />
          <label className="form-label">Password</label>
          <input
            onChange={updatePassword}
            className="password form-control mb-3"
            type="password"
            value={password}
            minLength={8}
            maxLength={64}
            pattern="^[!-z]{8,64}$"
            required
          />
          <input
            className="submit btn btn-primary my-3"
            type="submit"
            value={"Sign up"}
          />
        </form>
        <span className="my-3">
          Already have an account? <Link to="/log-in">Log In</Link>
        </span>
      </div>
    </div>
  );
}
