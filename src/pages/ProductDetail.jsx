import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDetail.css";

const API = import.meta.env.VITE_API_URL;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const res = await axios.get(`${API}/properties/${id}`);
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

  const handleImageError = () => {
    setImageError(true);
    console.error(`Failed to load image for property: ${house?.title}`);
  };

  if (loading) return <div className="loading">Loading house details...</div>;
  if (!house) return <div className="loading">Property not found.</div>;

  return (
    <div className="product-detail">
      <div className="detail-image">
        {/* ✅ Use the full image URL directly from the database with error handling */}
        <img 
          src={imageError 
            ? "https://via.placeholder.com/800x500?text=Image+Not+Available" 
            : house.image
          } 
          alt={house.title}
          onError={handleImageError}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
      </div>

      <div className="detail-content">
        <h1>{house.title}</h1>
        <p className="location">{house.location}</p>
        <h2 className="price">R {house.price.toLocaleString()}</h2>

        <div className="description-section">
          <h3>Description</h3>
          <p className="description">{house.description}</p>
        </div>

        {/* Features Section */}
        {house.features && house.features.length > 0 && (
          <div className="features-section">
            <h3>Features</h3>
            <ul className="features-list">
              {house.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags Section */}
        {house.tags && house.tags.length > 0 && (
          <div className="tags-section">
            <h3>Tags</h3>
            <div className="tags-container">
              {house.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        )}

        {/* Property Details Grid */}
        {/* <div className="details-section">
          <h3>Property Details</h3>
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
        </div> */}

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