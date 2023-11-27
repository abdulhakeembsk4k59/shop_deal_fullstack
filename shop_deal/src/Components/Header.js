import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.css";

import { useSelector } from "react-redux";

function Header() {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('user');
  const user = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : null;
  const history = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/get_all_categories");
      if (response.data && Array.isArray(response.data.categories)) {
        setCategories(response.data.categories);
      } else {
        throw new Error("Invalid data structure received from the server.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const getCategoryRoute = (category, gender) => {
    return `/${gender}/${category}`;
  };

  const getDropdownItems = (gender) => {
    return categories
      .filter((category) =>
        category.name.toLowerCase() !== gender.toLowerCase() &&
        category.name.toLowerCase() !== "kids" &&
        category.name.toLowerCase() !== "men" &&
        category.name.toLowerCase() !== "women" &&
        !(gender.toLowerCase() === "men" && category.name.toLowerCase() === "skirt")
      )
      .map((category) => (
        <li key={category._id}>
          <a
            href={getCategoryRoute(category.name.toLowerCase(), gender.toLowerCase())}
            className="dropdown-item"
          >
            {category.name}
          </a>
        </li>
      ));
  };

  const handleLogout = () => {
    // Clear user information from localStorage
    localStorage.removeItem('user');
    // Redirect to the login page
    history('/login');
  };

  return (
    <div>
      {/* Header - part 1 */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* animated logo */}
          <Link to="/" className="navbar-brand" style={{ fontSize: "4vh" }}>
            <div id="logo-container">
              <span className="logo-letter">S</span>
              <span className="logo-letter">h</span>
              <span className="logo-letter">o</span>
              <span className="logo-letter">p</span>
              <span className="logo-letter">🛒</span>
              <span className="logo-letter">D</span>
              <span className="logo-letter">e</span>
              <span className="logo-letter">a</span>
              <span className="logo-letter">l</span>
            </div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Search Input and Search Button */}
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav p-0">
              <li className="nav-item float-end p-0">
                <form className="d-flex search-bar btn-dark border-0 p-0 input-group">
                  <input
                    id=""
                    className="form-control bg-white border-start btn btn-warning fm pe-1 border-0 bd-curve1"
                    style={{ width: "28vw" }}
                    type="search"
                    placeholder="Product Name, Category Name, etc."
                    aria-label="Search"
                  />
                  <button className="btn btn-warning bd-curve-2 fh" type="submit">
                    <i className="fa fa-search" aria-hidden="true"></i> Search
                  </button>
                </form>
              </li>
            </ul>
          </div>

          {/* login and cart buttons */}
          <div className="navbar-nav collapse navbar-collapse navbar-collapse2" id="navbarNav">
            <br />
            <div className="navbar-nav px-3 mb-1">
              {isLoggedIn ? (
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-dark login-button pe-3 pb-2 login dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.name}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={user.isAdmin ? "/admin_dashboard" : "/myprofile"} className="dropdown-item">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login">
                  <button className="btn btn-dark login-button pe-3 pb-2 login">Login</button>
                </Link>
              )}
            </div>
            <Link to="/cart" style={{ textDecoration: 'none' }}>
              <div className="cart-nav-bag px-3 mb-1" style={{ color: 'white' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  className="bi bi-handbag-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
                </svg>
                <span className="cart-bag-quantity">
                  <span>{cartTotalQuantity}</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header - part 2 */}
      <nav className="bg-light py-2">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link to="/" className={`nav-link text-dark  ${location.pathname === ("/") ? "active" : ""
              }`} aria-current="page">
              Home
            </Link>
          </li>
          <li className={`nav-item  ${location.pathname === ("/all_products") ? "active" : ""}`}>
            <Link to="/all_products" className="nav-link text-dark">
              All Products
            </Link>
          </li>

          {/* Men Dropdown */}
          <li className="nav-item dropdown">
            <Link
              to="#"
              className={`nav-link dropdown-toggle text-dark ${location.pathname.includes("/men") ? "active" : ""
                }`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Men
            </Link>
            <ul className="dropdown-menu">
              <li>
                <a href="../men" className="dropdown-item">
                  All Products
                </a>
              </li>
              {getDropdownItems("Men")}
            </ul>
          </li>

          {/* Women Dropdown */}
          <li className="nav-item dropdown">
            <Link
              to="#"
              className={`nav-link dropdown-toggle text-dark ${location.pathname.includes("/women") ? "active" : ""
                }`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Women
            </Link>
            <ul className="dropdown-menu">
              <li>
                <a href="../women" className="dropdown-item">
                  All Products
                </a>
              </li>
              {getDropdownItems("Women")}
            </ul>
          </li>

          {/* Kids Dropdown */}
          <li className="nav-item dropdown">
            <Link
              to="#"
              className={`nav-link dropdown-toggle text-dark ${location.pathname.includes("/kids") ? "active" : ""
                }`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Kids
            </Link>
            <ul className="dropdown-menu">
              <li>
                <a href="/kids" className="dropdown-item">
                  All Products
                </a>
              </li>
              {getDropdownItems("Kids")}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
