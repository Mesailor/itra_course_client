import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="login-page">
      LOGIN FORM
      <p>Don't have an account yet? </p>
      <Link to="/sign-up">Sign Up</Link>
    </div>
  );
}
