import { Link } from "react-router-dom";

export default function RegPage() {
  function signupUser() {
    // create user with the given data
    // send response to the server
    // if everything is okay SET USER STATE and redirect to the main page
    // if something is wrong show message to user
  }
  return (
    <div className="signup-page">
      <div className="signup-from">
        <h2>Sign up</h2>
        <form onSubmit={signupUser}>
          <input className="username" type="text" />
          <input className="password" type="password" />
          <input className="submit" type="submit" value={"Sign up"} />
        </form>
        <span>Already have an account?</span>
        <Link to="/log-in">Log In</Link>
      </div>
    </div>
  );
}
