import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./products.css";

export default function Products() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(null); // popup message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/properties");
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Helper to show popup
  const showPopup = (message) => {
    setPopup(message);
    // clear any previous timeout to prevent overlap
    clearTimeout(window.popupTimeout);
    window.popupTimeout = setTimeout(() => {
      setPopup(null);
    }, 2500);
  };

  // Add to favourites
  const handleAddToFavourites = (property) => {
    const savedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];

    if (savedFavourites.includes(property._id)) {
      showPopup(`${property.title} is already in your favourites!`);
      return;
    }

    localStorage.setItem("favourites", JSON.stringify([...savedFavourites, property._id]));
    showPopup(`${property.title} added to favourites!`);
  };

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading properties...</p>;

  return (
    <div className="products-wrapper">
      {/* Popup notification */}
      {popup && (
        <div className="popup show">
          <p>{popup}</p>
        </div>
      )}

      <div className="products-hero">
        <h1>Our Listings</h1>
        <p>Explore a wide range of properties from luxurious villas to cozy farmsteads.</p>
      </div>

      <div className="products-grid">
        {properties.map((property) => (
          <div className="product-card" key={property._id}>
            <img src={property.image} alt={property.title} />
            <div className="product-info">
              <h2>{property.title}</h2>
              <p>{property.location}</p>
              <p className="price">R {property.price.toLocaleString()}</p>
            </div>
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
        ))}
      </div>
    </div>
  );
}
