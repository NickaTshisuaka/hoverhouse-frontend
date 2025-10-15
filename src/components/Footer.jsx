// src/components/Footer.jsx
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>HoverHouse</h2>
          <p>Your trusted partner in finding dream homes.</p>
        </div>

        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>

        <div className="footer-contact">
          <p>Email: info@hoverhouse.com</p>
          <p>Phone: +27 123 456 789</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} HoverHouse. All rights reserved.</p>
      </div>
    </footer>
  );
}
