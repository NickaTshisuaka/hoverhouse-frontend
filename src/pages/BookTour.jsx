import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import "./BookTour.css";

export default function BookTour() {
  const { id } = useParams(); // property ID from URL

  const [property, setProperty] = useState({ title: "", location: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    attendees: 1,
    date: "",
    time: "",
    additionalNotes: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  // Fetch property details from backend
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/properties/${id}`);
        setProperty({ title: res.data.title, location: res.data.location });
      } catch (err) {
        console.error("Failed to fetch property:", err);
      }
    };
    fetchProperty();
  }, [id]);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) return alert("Please agree to be contacted before confirming.");

    const emailParams = {
      ...formData,
      propertyTitle: property.title,
      propertyLocation: property.location,
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_USER,
        emailParams
      );
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN,
        { ...emailParams, adminNote: "New booking received!" }
      );
      setSubmitted(true);
    } catch (err) {
      console.error("Email sending failed:", err);
      alert("Failed to send emails. Please try again.");
    }
  };

  const closeModal = () => setSubmitted(false);

  return (
    <div className="book-tour-wrapper">
      <h1>Book a Private Tour</h1>
      <p>
        Schedule a personalized viewing for{" "}
        <strong>{property.title || "Property"}</strong> located in{" "}
        <strong>{property.location || "Location"}</strong>.
      </p>

      <form className="tour-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Number of Attendees</label>
        <input
          type="number"
          name="attendees"
          min="1"
          value={formData.attendees}
          onChange={handleChange}
        />

        <label>Available Show Dates</label>
        <select
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        >
          <option value="">Select a Date</option>
          <option value="2025-10-14">Tuesday, Oct 14, 2025</option>
          <option value="2025-10-16">Thursday, Oct 16, 2025</option>
          <option value="2025-10-19">Sunday, Oct 19, 2025</option>
        </select>

        <label>Preferred Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <textarea
          name="additionalNotes"
          placeholder="Additional Notes or Requests (optional)"
          value={formData.additionalNotes}
          onChange={handleChange}
        ></textarea>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
          />
          I consent to be contacted regarding this booking.
        </label>

        <button type="submit" className="btn-primary">
          Confirm Booking
        </button>
      </form>

      {submitted && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="confirmation-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Thank You, {formData.name}!</h2>
            <p>
              Your private tour for <strong>{property.title}</strong> in{" "}
              <strong>{property.location}</strong> has been confirmed for{" "}
              <strong>
                {formData.date} at {formData.time}
              </strong>
              .
            </p>
            <p>
              A confirmation email has been sent to{" "}
              <strong>{formData.email}</strong>.
            </p>

            <div className="modal-buttons">
              <button onClick={closeModal} className="btn-primary">
                Close
              </button>
              <Link to="/products" className="btn-secondary">
                ← Back to Listings
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
