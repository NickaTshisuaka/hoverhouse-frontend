import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./products.css";

const API = import.meta.env.VITE_API_URL;

export default function Products() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${API}/properties`);
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const showPopup = (message) => {
    setPopup(message);
    clearTimeout(window.popupTimeout);
    window.popupTimeout = setTimeout(() => setPopup(null), 2500);
  };

  const handleAddToFavourites = (property) => {
    const savedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (savedFavourites.includes(property._id)) {
      showPopup(`${property.title} is already in your favourites!`);
      return;
    }
    localStorage.setItem(
      "favourites",
      JSON.stringify([...savedFavourites, property._id])
    );
    showPopup(`${property.title} added to favourites!`);
  };

  const handleViewDetails = (id) => navigate(`/products/${id}`);

  if (loading) return <p style={{ textAlign: "center" }}>Loading properties...</p>;

  return (
    <div className="products-wrapper">
      {/* Popup notification */}
      {popup && (
        <div className="popup show">
          <p>{popup}</p>
        </div>
      )}

      {/* Hero Section */}
      <div className="products-hero">
        <h1>Our Listings</h1>
        <p>Explore a wide range of properties — from luxurious villas to cozy farmsteads.</p>
      </div>

      {/* Product Grid */}
      <div className="products-grid">
        {properties.map((property) => {
          // dynamically build local image path
          const imageSrc = `/images/${property.image}`;

          return (
            <div className="product-card" key={property._id}>
              {/* 🖼️ Local image loading with fallback + lazy loading */}
              <img
                src={imageSrc}
                alt={property.title}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/images/fallback.jpg"; // fallback image in /public/images
                }}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  opacity: 0,
                  transition: "opacity 0.5s ease-in",
                }}
                onLoad={(e) => (e.target.style.opacity = 1)} // fade in effect
              />

              {/* Property Info */}
              <div className="product-info">
                <h2>{property.title}</h2>
                <p>{property.location}</p>
                <p className="price">R {property.price.toLocaleString()}</p>
              </div>

              {/* Actions */}
              <div className="product-actions">
                <button
                  className="btn-secondary"
                  onClick={() => handleAddToFavourites(property)}
                >
                  Add to Favourites
                </button>
                <button
                  className="btn-primary"
                  onClick={() => handleViewDetails(property._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
