import * as React from "react";
import { Link } from "react-router-dom";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";

export default function MainPage() {
  const dispatch = useDispatch();

  function logout() {
    dispatch(setUser({ name: "", isAdmin: false }));
  }

  return (
    <div className="main-page">
      <header>
        <Link to="/log-in">Log in</Link>
        <Link onClick={logout} to="/log-in">
          Log out
        </Link>
      </header>
      <main>MAIN PAGE</main>
      <p>MAIN PAGE TEXT</p>
    </div>
  );
}
