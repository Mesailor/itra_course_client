import { Link } from "react-router-dom";

export default function LoginPage() {
  function authenticateUser() {
    //send auth request to server
    // server will check the given credentials and send response.
    // if everything is okay, SET USER STATE and redirect to the main page
    // if something is wrong show the message to user
  }
  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Log in</h2>
        <form onSubmit={authenticateUser}>
          <input className="username" type="text" />
          <input className="password" type="password" />
          <input className="submit" type="submit" value={"Log in"} />
        </form>
        <span>Don't have an account yet? </span>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
}
