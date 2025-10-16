import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const isAuthenticated = () => !!localStorage.getItem("token");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API}/properties`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.length > 0) {
          // Take only the first two properties
          setProperties(res.data.slice(1, 2));
        }
      } catch (err) {
        console.error("Error fetching properties:", err.response?.data || err.message);
      }
    };

    fetchProperties();
  }, []);

  const handleProtectedNav = (path) => {
    if (isAuthenticated()) navigate(path);
    else navigate("/signin");
  };

  const stats = {
    totalProperties: properties.length,
    inquiries: 12,
    sales: 5,
  };

  return (
    <div className="dashboard-container">
      {/* Parallax Header */}
      <header className="dashboard-header">
  <div className="header-overlay">
    <h1>
      Enter the gates of elegance, {" "}
      {(() => {
        const user = JSON.parse(localStorage.getItem("user")) || { name: "User" };
        // Get first name only
        const firstName = user.name ? user.name.split(" ")[0] : "User";
        return firstName;
      })()}
      
    </h1>
    <button className="nav-button" onClick={() => handleProtectedNav("/products")}>
      View Listings
    </button>
  </div>
</header>


      <main className="dashboard-main">
        {/* Properties */}
        <section className="dashboard-card properties-card">
          <h2>Your Properties</h2>
          {properties.length === 0 ? (
            <p>No properties found. Add one to get started.</p>
          ) : (
            <div className="property-grid">
              {properties.map((p) => (
                <div key={p._id} className="property-preview">
                  <img src={p.image || "https://via.placeholder.com/300"} alt={p.title} />
                  <h3>{p.title}</h3>
                  <p>{p.location}</p>
                  <p className="price">R {p.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Add Property */}
        <section className="dashboard-card add-card">
          <div className="icon">➕</div>
          <h2>Add New Property</h2>
          <p>Create a new listing with images, features, and pricing details.</p>
          <button onClick={() => handleProtectedNav("/products")}>Add Property</button>
        </section>

        {/* Analytics */}
        <section className="dashboard-card analytics-card">
          <div className="icon">📊</div>
          <h2>Analytics</h2>
          <p>View insights into engagement, inquiries, and market trends.</p>
          <button onClick={() => handleProtectedNav("/analytics")}>View Insights</button>
        </section>

        {/* Stats */}
        <section className="dashboard-card stats-card">
          <div className="icon">📈</div>
          <h2>Quick Stats</h2>
          <ul className="stats-list">
            <li>Total Properties: {stats.totalProperties}</li>
            <li>Total Inquiries: {stats.inquiries}</li>
            <li>Properties Sold: {stats.sales}</li>
          </ul>
        </section>

        {/* Testimonials */}
        <section className="dashboard-card testimonials-card">
          <div className="icon">💬</div>
          <h2>What Our Users Say</h2>
          <div className="testimonial-grid">
            {[
              { name: "Sarah M.", image: "https://randomuser.me/api/portraits/women/44.jpg", quote: "HoverHouse helped me find my dream property fast!" },
              { name: "James K.", image: "https://randomuser.me/api/portraits/men/34.jpg", quote: "Great platform, very intuitive and easy to use." },
              { name: "Linda P.", image: "https://randomuser.me/api/portraits/women/65.jpg", quote: "I love the analytics dashboard—it really helps track my listings." },
              { name: "Mark T.", image: "https://randomuser.me/api/portraits/men/22.jpg", quote: "The support team is amazing, very responsive!" },
              { name: "Emily R.", image: "https://randomuser.me/api/portraits/women/12.jpg", quote: "Finding properties has never been easier." },
              { name: "David L.", image: "https://randomuser.me/api/portraits/men/50.jpg", quote: "HoverHouse saved me so much time!" },
            ].map((t, idx) => (
              <div key={idx} className="testimonial">
                <img src={t.image} alt={t.name} />
                <p>"{t.quote}"</p>
                <strong>- {t.name}</strong>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="dashboard-card activity-card">
          <div className="icon">🕒</div>
          <h2>Recent Activity</h2>
          <div className="activity-grid">
            {[
              "New property added: Cozy Apartment in Sandton",
              "Inquiry received from Michael R. on Modern Villa",
              "Property sold: Luxury Loft Downtown",
              "New property added: Beachfront Condo in Cape Town",
              "Inquiry received from Anna S. on City Center Flat",
              "Property sold: Penthouse in Johannesburg"
            ].map((item, idx) => (
              <div key={idx} className="activity-item">{item}</div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
