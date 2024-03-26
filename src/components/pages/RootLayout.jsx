import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../../store/userSlice";
import { resetRecentIds } from "../../store/recentCollIdsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function RootLayout() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  function logout() {
    dispatch(setUser({ name: "", isAdmin: false }));
    dispatch(resetRecentIds());
  }

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/main");
    }
  });
  return (
    <div className="root-layout">
      <header>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid row pe-0">
            <div className="col-md-4 col-2">
              <Link className="nav-link px-0" to="/main">
                <div className="d-flex align-items-center">
                  <img
                    style={{ width: "2em", height: "2em" }}
                    className="bg-primary rounded-circle me-2"
                    src="https://firebasestorage.googleapis.com/v0/b/itra-collections.appspot.com/o/default%2Fmy_collections_logo.png?alt=media&token=cce7f398-ab91-4cbf-b947-81a4326d2e95"
                    alt="my_collections_logo"
                  />
                  <h1 className="d-none d-md-block">My Collections</h1>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-8">
              <form
                className="d-flex ms-2 align-items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Search isn't implemented yet...");
                }}
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  disabled
                />
              </form>
            </div>
            <div className="col-2 d-flex justify-content-end">
              {user.name ? (
                <>
                  <div className="d-none d-md-block">
                    <Link
                      className="d-block btn btn-outline-primary m-2"
                      to={`user/${user.id}`}
                    >
                      Personal Collections
                    </Link>
                    <Link
                      className="d-block btn btn-sm btn-secondary m-2"
                      onClick={logout}
                      to="/main"
                    >
                      Log out
                    </Link>
                  </div>
                  <a
                    className="d-block d-md-none btn btn-primary"
                    data-bs-toggle="collapse"
                    href="#collapseAccount"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseAccount"
                  >
                    <i className="bi bi-list"></i>
                  </a>
                </>
              ) : (
                <>
                  <Link
                    className="d-none d-md-block btn btn-outline-primary"
                    to="/log-in"
                  >
                    Log in
                  </Link>
                  <a
                    className="d-block d-md-none btn btn-primary"
                    data-bs-toggle="collapse"
                    href="#collapseAccount"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseAccount"
                  >
                    <i className="bi bi-list"></i>
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="row w-100 ms-1 mt-2 d-flex justify-content-end">
            <div className="col collapse" id="collapseAccount">
              <div className="card card-body">
                <div className="d-flex justify-content-around">
                  {user.name ? (
                    <>
                      <Link className="nav-link m-2" to={`user/${user.id}`}>
                        Personal Collections
                      </Link>
                      <Link
                        className="nav-link m-2"
                        onClick={logout}
                        to="/main"
                      >
                        Log out
                      </Link>
                    </>
                  ) : (
                    <Link className="d-block nav-link" to="/log-in">
                      Log in
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
