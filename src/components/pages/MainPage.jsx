import * as React from "react";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className="main-page">
      <main className="container-xxl">
        MAIN PAGE CONTENT
        <p>
          <Link to="/user/1">1</Link>
        </p>
        <p>
          <Link to="/user/2">2</Link>
        </p>
      </main>
    </div>
  );
}
