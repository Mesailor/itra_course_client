import * as React from "react";
import { Link } from "react-router-dom";
import { setUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store/store";

export default function MainPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  function logout() {
    dispatch(setUser({ name: "", isAdmin: false }));
  }

  return (
    <div className="main-page">
      <header
        style={{ backgroundColor: "#efefef" }}
        className="container-fluid p-3 pe-5 d-flex align-items-center justify-content-between"
      >
        <h1>My Collections</h1>
        {user.name ? (
          <Link onClick={logout} to="/log-in">
            Log out
          </Link>
        ) : (
          <Link to="/log-in">Log in</Link>
        )}
      </header>
      <main className="container-xxl">MAIN PAGE CONTENT</main>
    </div>
  );
}
