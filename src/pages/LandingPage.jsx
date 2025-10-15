import React from "react";
import "./LandingPage.css";
// import house1 from "../assets/house1.jpg"; // Replace with your images
// import house2 from "../assets/house2.jpg";
// import house3 from "../assets/house3.jpg";

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <div className="logo">HoverHouse</div>
        <nav>
          <a href="#about">About</a>
          <a href="#listings">Listings</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Hero / Intro */}
      <section className="hero-section">
        <h1>Welcome to HoverHouse</h1>
        <p>
          Discover your dream home with us. We make finding the perfect property simple, fast, and stress-free.
        </p>
        <button>Explore Listings</button>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>Who We Are</h2>
        <p>
          HoverHouse is a modern real estate agency dedicated to helping you find
          the perfect home. From cozy apartments to luxury estates, we have a
          curated selection just for you.
        </p>
      </section>

      {/* Property Cards */}
      <section id="listings" className="cards-section">
        <h2>Featured Properties</h2>
        <div className="cards-container">
          <div className="property-card">
            {/* <img src={house1} alt="House 1" /> */}
            <h3>Modern Family Home</h3>
            <p>3 Beds • 2 Baths • 1 Garage</p>
            <button>View Details</button>
          </div>
          <div className="property-card">
            {/* <img src={house2} alt="House 2" /> */}
            <h3>Luxury Villa</h3>
            <p>5 Beds • 4 Baths • 2 Garages</p>
            <button>View Details</button>
          </div>
          <div className="property-card">
            {/* <img src={house3} alt="House 3" /> */}
            <h3>Cozy Downtown Apartment</h3>
            <p>2 Beds • 1 Bath • No Garage</p>
            <button>View Details</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2025 HoverHouse. All rights reserved.</p>
      </footer>
    </div>
  );
}
