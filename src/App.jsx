import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Favourites from "./pages/Favourites";
import NotFoundpage from "./pages/NotFoundpage";
import BookTour from "./pages/BookTour";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Logout from "./pages/Logout";
import AboutUs from "./pages/AboutUs";
import FAQs from "./pages/FAQs";

// Helper: check authentication
const isAuthenticated = () => !!localStorage.getItem("token");

// Protected route wrapper
function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/signup" replace />;
}

function App() {
  const location = useLocation();

  // Hide Navbar/Footer on these routes
  const hideNavAndFooter =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/logout" ||
    location.pathname === "/page-not-found";

  return (
    <>
      {!hideNavAndFooter && <Navbar />}

      <main style={{ minHeight: "80vh" }}>
        <Routes>
          {/* Default route redirects to signup */}
          <Route path="/" element={<Navigate to="/signup" replace />} />

          {/* Auth routes */}
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/signin" element={<AuthPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favourites"
            element={
              <ProtectedRoute>
                <Favourites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-tour/:id"
            element={
              <ProtectedRoute>
                <BookTour />
              </ProtectedRoute>
            }
          />

          {/* Public informational pages */}
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/faqs" element={<FAQs />} />

          {/* Logout and 404 */}
          <Route path="/logout" element={<Logout />} />
          <Route path="/page-not-found" element={<NotFoundpage />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/page-not-found" replace />} />
        </Routes>
      </main>

      {!hideNavAndFooter && <Footer />}
    </>
  );
}

// Wrap App with Router
export function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
