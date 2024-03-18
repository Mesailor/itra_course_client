import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiService from "../../services/APIService";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

    setErrorMessage("");

    let userCredentials = {
      name,
      password,
    };
    try {
      const result = await apiService.sendAuthReq(userCredentials);

      if (result.success) {
        dispatch(setUser(result.user));
        return navigate("/main");
      } else {
        setErrorMessage(result.message);
        console.log(result.message);
      }
    } catch (e) {
      setErrorMessage("Sorry unable to connect to the server...");
      console.log(e);
    }
  }
  return (
    <div className="login-page container vh-100 d-flex align-items-center">
      <div
        style={{ width: "35%" }}
        className="login-form m-auto align-middle d-flex flex-column text-center"
      >
        <h2 className="m-3">Log in to your account</h2>
        {errorMessage ? (
          <div className="border border-danger text-danger p-2 my-3">
            {errorMessage}
          </div>
        ) : null}
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
            required
          />

          <label className="form-label">Password</label>
          <input
            onChange={updatePassword}
            className="password form-control mb-3"
            type="password"
            value={password}
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
        <Link className="text-decoration-none" to="/main">
          <h5>Main page</h5>
        </Link>
      </div>
    </div>
  );
}
