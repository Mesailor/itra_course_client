import { Link, Outlet } from "react-router-dom";
import { setUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function RootLayout() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  function logout() {
    dispatch(setUser({ name: "", isAdmin: false }));
  }
  return (
    <div className="root-layout">
      <header
        style={{ backgroundColor: "#efefef" }}
        className="container-fluid p-3 pe-5 d-flex align-items-center justify-content-between"
      >
        <h1>
          <Link style={{ textDecoration: "none" }} to="/main">
            Web Collections App
          </Link>
        </h1>
        {user.name ? (
          <div>
            <Link className="m-2" to={`user/${user.id}`}>
              Personal Collections
            </Link>
            <Link className="m-2" onClick={logout} to="/log-in">
              Log out
            </Link>
          </div>
        ) : (
          <Link to="/log-in">Log in</Link>
        )}
      </header>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}