import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="error-page">
      <h2>Oops... It seems like something went wrong :(</h2>
      <p>Status: {error.status}</p>
      <p>{error.data}</p>
      <Link to="/main">Back to the main page</Link>
    </div>
  );
}
