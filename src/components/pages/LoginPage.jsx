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
    <div className="login-page container vh-100 d-flex align-items-center">
      <div
        style={{ width: "35%" }}
        className="login-form m-auto align-middle d-flex flex-column text-center"
      >
        <h2 className="m-3">Log in to your account</h2>
        <form
          className="d-flex flex-column text-start"
          onSubmit={authenticateUser}
        >
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
            className="my-3 btn btn-primary"
            type="submit"
            value={"Log in"}
          />
        </form>
        <span className="my-3">
          Don't have an account yet?{" "}
          <Link to="/sign-up">Create an account</Link>
        </span>
      </div>
    </div>
  );
}
