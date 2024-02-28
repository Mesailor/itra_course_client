import * as React from "react";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="main-page">
      <header>
        <Link to="/log-in">Log in</Link>
      </header>
      <main>MAIN PAGE</main>
      <p>MAIN PAGE TEXT</p>
    </div>
  );
}
