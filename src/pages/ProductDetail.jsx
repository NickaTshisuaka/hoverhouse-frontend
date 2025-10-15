import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
        setHouse(res.data);
      } catch (err) {
        console.error("Error fetching property:", err);
        alert("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHouse();
  }, [id]);

  if (loading) return <div className="loading">Loading house details...</div>;
  if (!house) return <div className="loading">Property not found.</div>;

  return (
    <div className="product-detail">
      <div className="detail-image">
        <img src={house.image} alt={house.title} />
      </div>

      <div className="detail-content">
        <h1>{house.title}</h1>
        <p className="location">{house.location}</p>
        <h2 className="price">R {house.price.toLocaleString()}</h2>

        <p className="description">{house.description}</p>

        <div className="details-grid">
          <div><strong>Bedrooms:</strong> {house.details?.bedrooms || "-"}</div>
          <div><strong>Bathrooms:</strong> {house.details?.bathrooms || "-"}</div>
          <div><strong>Garages:</strong> {house.details?.garages || "-"}</div>
          <div><strong>Living Rooms:</strong> {house.details?.livingRooms || "-"}</div>
          <div><strong>Kitchen:</strong> {house.details?.kitchen || "-"}</div>
          <div><strong>Floor Size:</strong> {house.details?.floorSize || "-"}</div>
          <div><strong>Erf Size:</strong> {house.details?.erfSize || "-"}</div>
          <div><strong>Year Built:</strong> {house.details?.yearBuilt || "-"}</div>
        </div>

       <div className="button-row">
  <button
    className="back-btn"
    onClick={() => navigate("/products")}
  >
    Return to Listings
  </button>
  <button
    className="view-btn"
    onClick={() => navigate(`/book-tour/${house._id}`)}
  >
    Schedule Viewing
  </button>
</div>

      </div>
    </div>
  );
}
