import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../../services/APIService";
import { setUser } from "../../store/userSlice";
import { validateSignupForm } from "../../services/ValidationService";

export default function RegPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

    setErrorMessage("");
    const errMessage = validateSignupForm(name, password);
    if (errMessage) {
      return setErrorMessage(errMessage);
    }

    const newUser = {
      name,
      password,
    };
    try {
      const result = await apiService.sendSignupReq(newUser);

      if (result.success) {
        dispatch(setUser(result.user));
        return navigate("/");
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
    <div className="signup-page container vh-100 d-flex align-items-center">
      <div
        style={{ width: "35%" }}
        className="signup-form  m-auto align-middle d-flex flex-column text-center"
      >
        <h2 className="m-3">Create an account</h2>
        {errorMessage ? (
          <div className="border border-danger text-danger p-2 my-3">
            {errorMessage}
          </div>
        ) : null}
        <form className="d-flex flex-column text-start" onSubmit={signupUser}>
          <label className="form-label">Name</label>
          <input
            onChange={updateName}
            className="name form-control mb-3"
            type="text"
            value={name}
          />
          <label className="form-label">Password</label>
          <input
            onChange={updatePassword}
            className="password form-control mb-3"
            type="password"
            value={password}
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
