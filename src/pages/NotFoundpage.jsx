import React from "react";
import "./NotFoundpage.css";

export default function Page404() {
  return (
    <div className="page404">
      <div className="container">
        <h1 className="error-code">404</h1>
        <p className="error-text">Oops! The page you're looking for doesn't exist.</p>
        <p className="error-subtext">But don't worry, you can go back home.</p>
        <a href="/dashboard" className="home-btn">Go Home</a>
        <div className="astronaut">
          <div className="helmet">
            <div className="visor"></div>
          </div>
          <div className="body"></div>
        </div>
      </div>
    </div>
  );
}
