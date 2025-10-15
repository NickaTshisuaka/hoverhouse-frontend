import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Favourites.css";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [properties, setProperties] = useState([]);
  const API = "http://localhost:5000/api/properties";

  useEffect(() => {
    const fetchFavourites = async () => {
      const savedFavIds = JSON.parse(localStorage.getItem("favourites")) || [];
      if (savedFavIds.length === 0) return setFavourites([]);

      try {
        const res = await axios.get(API); // fetch all properties
        const favProperties = res.data.filter((p) => savedFavIds.includes(p._id));
        setFavourites(favProperties);
      } catch (err) {
        console.error("Error fetching favourites:", err);
      }
    };
    fetchFavourites();
  }, []);

  const removeFavourite = (id) => {
    const updatedFavs = favourites.filter((fav) => fav._id !== id);
    setFavourites(updatedFavs);
    const savedFavIds = JSON.parse(localStorage.getItem("favourites")) || [];
    localStorage.setItem(
      "favourites",
      JSON.stringify(savedFavIds.filter((favId) => favId !== id))
    );
  };

  return (
    <div className="favourites-page">
      <header className="favourites-header">
        <h1>Your Saved Properties</h1>
        <p>Browse your favourite listings and schedule a private showing.</p>
      </header>

      {favourites.length === 0 ? (
        <div className="no-favourites">
          <p>You haven’t added any favourites yet.</p>
          <Link to="/products" className="browse-btn">Browse Properties</Link>
        </div>
      ) : (
        <div className="favourites-grid">
          {favourites.map((fav) => (
            <div key={fav._id} className="favourite-card">
              <div className="favourite-image">
                <img src={fav.image} alt={fav.title} />
                <div className="card-overlay">
                  <h2>{fav.title}</h2>
                  <p>{fav.location}</p>
                </div>
              </div>
              <div className="favourite-info">
                <p><strong>Price:</strong> R {fav.price.toLocaleString()}</p>
                <p><strong>Bedrooms:</strong> {fav.details?.bedrooms || "N/A"}</p>
                <p><strong>Bathrooms:</strong> {fav.details?.bathrooms || "N/A"}</p>
                <p><strong>Floor Size:</strong> {fav.details?.floorSize || "N/A"}</p>
              </div>
              <div className="favourite-actions">
                <button className="remove-btn" onClick={() => removeFavourite(fav._id)}>
                  Remove
                </button>
                <Link to={`/book-tour/${fav._id}`} className="book-btn">
                  Book a Tour
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
