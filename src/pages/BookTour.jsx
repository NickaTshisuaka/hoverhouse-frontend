import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import emailjs from "@emailjs/browser";
import "./BookTour.css";

const API = import.meta.env.VITE_API_URL;

export default function BookTour() {
  const { id } = useParams();
  const [property, setProperty] = useState({});
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

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${API}/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error("Failed to fetch property:", err);
      }
    };
    fetchProperty();
  }, [id]);

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
    if (!formData.consent)
      return alert("Please agree to be contacted before confirming.");

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
      alert("Failed to send email. Please try again.");
    }
  };

  const closeModal = () => setSubmitted(false);

  return (
    <div className="booktour-page">
      {/* --- LEFT: PROPERTY SHOWCASE --- */}
      <div className="booktour-left">
        <img
          src={
            property.image ||
            "https://images.unsplash.com/photo-1560184897-dac0e4900e6b?auto=format&fit=crop&w=1200&q=80"
          }
          alt={property.title}
          className="property-image"
        />
        <div className="property-info">
          <h1>{property.title || "Dream Home"}</h1>
          <p className="location">{property.location || "Cape Town, South Africa"}</p>
          <p className="price">
            {property.price ? `R ${property.price.toLocaleString()}` : "Price on Request"}
          </p>
          <ul className="features">
            <li>🛏 {property.bedrooms || 3} Bedrooms</li>
            <li>🛁 {property.bathrooms || 2} Bathrooms</li>
            <li>🚗 {property.garages || 2} Garages</li>
            <li>📏 {property.size || "420"} sqm</li>
          </ul>
        </div>
      </div>

      {/* --- RIGHT: BOOKING FORM --- */}
      <div className="booktour-right">
        <h2>Book a Private Tour</h2>
        <p>
          Fill out your details below to schedule a personal viewing. Our team
          will reach out to confirm your preferred date and time.
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

          <div className="form-row">
            <div>
              <label>Attendees</label>
              <input
                type="number"
                name="attendees"
                min="1"
                value={formData.attendees}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Date</label>
              <select
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="2025-10-14">Tue, Oct 14</option>
                <option value="2025-10-16">Thu, Oct 16</option>
                <option value="2025-10-19">Sun, Oct 19</option>
              </select>
            </div>
            <div>
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

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
              className="tickybox"
              onChange={handleChange}
              required
            />
            I consent to be contacted regarding this booking.
          </label>

          <button type="submit" className="btn-primary">
            Confirm Booking
          </button>
        </form>
      </div>

      {submitted && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="confirmation-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Thank You, {formData.name}!</h2>
            <p>
              Your tour for <strong>{property.title}</strong> has been booked
              for <strong>{formData.date}</strong> at{" "}
              <strong>{formData.time}</strong>.
            </p>
            <p>
              A confirmation email has been sent to{" "}
              <strong>{formData.email}</strong>.
            </p>
            <div className="button-group">
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