// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [ setUserName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      // Capitalize each word of the full name
      const formattedName = storedUser.name
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      setUserName(formattedName);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/dashboard">HoverHouse</Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/products">Listings</Link></li>
        <li><Link to="/favourites">Favourites</Link></li>
        <li><Link to="/book-tour/1">Book Tour</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/faqs">FAQs</Link></li>
        <li><Link to="/logout" className="nav-link">Logout</Link></li>
      </ul>
    </nav>
  );
}
