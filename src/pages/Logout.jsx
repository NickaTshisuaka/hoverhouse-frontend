import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

export default function Logout() {
  const [confirming, setConfirming] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = (choice) => {
    if (choice === "yes") {
      setConfirming(false);
      setLoggingOut(true);

      // Simulate logout process
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signin");
      }, 2500); // enough time for the spinner animation
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="logout-container">
      <div className="logout-box">
        {confirming && (
          <>
            <h1>Are you sure you want to log out?</h1>
            <p>We’d love to have you stay a little longer.</p>
            <div className="logout-buttons">
              <button className="yes-btn" onClick={() => handleConfirm("yes")}>
                Yes, log me out
              </button>
              <button className="no-btn" onClick={() => handleConfirm("no")}>
                No, take me home
              </button>
            </div>
          </>
        )}

        {loggingOut && (
          <>
            <h1>Logging Out...</h1>
            <p>We hope to see you again soon at HoverHouse.</p>
            <div className="logout-spinner"></div>
          </>
        )}
      </div>
    </div>
  );
}
