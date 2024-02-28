import { Link } from "react-router-dom";

export default function RegPage() {
  return (
    <div className="reg-page">
      REGISTRATION FORM
      <p>Already have an account?</p>
      <Link to="/log-in">Log In</Link>
    </div>
  );
}
