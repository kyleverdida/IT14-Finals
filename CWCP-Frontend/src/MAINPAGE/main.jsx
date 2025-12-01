import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./main.css";

import Cards from "../CARDS/cards.jsx";
import Form from "../FORM/form.jsx";
import Filter from "../filter/filters.jsx";
import Searchbar from "../SEARCHBAR/searchbar.jsx";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({
    area: "",
    severity: "",
    status: "",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch posts periodically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint =
          location.pathname === "/"
            ? `${import.meta.env.VITE_API_URL}/getApproved`
            : `${import.meta.env.VITE_API_URL}/fetch`;

        const response = await axios.get(endpoint);
        setPosts(response.data);
      } catch (error) {
        console.log("Unable to retrieve data", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  // Apply filters
  const filteredPosts = posts.filter((concern) => {
    const matchesArea =
      !filters.area ||
      concern.area?.toLowerCase() === filters.area.toLowerCase();
    const matchesSeverity =
      !filters.severity ||
      concern.severity?.toLowerCase() === filters.severity.toLowerCase();
    const matchesStatus =
      !filters.status ||
      concern.status?.toLowerCase() === filters.status.toLowerCase();
    return matchesArea && matchesSeverity && matchesStatus;
  });

  return (
    <div className="user-mainpage">
      <div className="dashboard">
        {/* Header Frame (from CWCP-Mainpage.html) */}
        <div className="header-frame">
          {/* Logo Section */}
          <div className="logo-section">
            <div className="logo-image">
              <img src="/CWCP-LOGO.svg" alt="City Logo" />
            </div>

            {/* Header Text */}
            <div className="header-text">
              <p className="top-text">REPUBLIC OF THE PHILIPPINES</p>
              <p className="top-text">PROVINCE OF DAVAO DEL NORTE</p>
              <p className="city-text">CITY OF TAGUM</p>
            </div>

            <p className="portal-title">CITY WIDE CONCERN PORTAL</p>
            <p className="portal-subtitle">
              KEEPING COMMUNITIES SAFE AND CONNECTED!
            </p>
          </div>

          {/* Search Section */}
          <div className="search-section">
            <div className="search-input">
              {/* Keep placeholder text for visual parity; Searchbar handles actual search */}
              <p className="search-placeholder">Search</p>
            </div>
            <div className="search-icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <g opacity="0.5">
                  <path
                    d="M5.66314 10.5763C8.3766 10.5763 10.5763 8.3766 10.5763 5.66314C10.5763 2.94969 8.3766 0.75 5.66314 0.75C2.94969 0.75 0.75 2.94969 0.75 5.66314C0.75 8.3766 2.94969 10.5763 5.66314 10.5763Z"
                    stroke="#627B87"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                  <path
                    d="M9.4693 9.46888L12.5574 12.557"
                    stroke="#627B87"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
          </div>

          {/* Buttons */}
          <div className="button-section">
            <button
              className="btn btn-submit"
              type="button"
              onClick={() => setIsFormOpen(true)}
            >
              Submit Concern
            </button>
            <button
              className="btn btn-login"
              type="button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>

          {/* Filter Icon (purely decorative here) */}
          <div className="filter-icon">
            <svg width="31" height="31" viewBox="0 0 31 31" fill="none">
              <path
                d="M20.5438 13.8542L7.91667 1.22708H27.1938C27.8535 1.22708 28.3285 1.51736 28.6188 2.09792C28.909 2.67847 28.8563 3.23264 28.4604 3.76042L20.5438 13.8542ZM19.2771 21.5333V24.9771C19.2771 25.4257 19.1251 25.802 18.8211 26.106C18.5171 26.41 18.1413 26.5615 17.6938 26.5604H14.5271C14.0785 26.5604 13.7027 26.4084 13.3998 26.1044C13.0968 25.8004 12.9448 25.4246 12.9438 24.9771V15.2L0.435416 2.69167C0.145139 2.40139 0 2.03881 0 1.60392C0 1.16903 0.145139 0.792723 0.435416 0.475C0.752083 0.158334 1.12839 0 1.56433 0C2.00028 0 2.37606 0.158334 2.69167 0.475L29.5688 27.3521C29.8854 27.6688 30.0374 28.0382 30.0248 28.4604C30.0121 28.8826 29.8469 29.2521 29.5292 29.5687C29.2125 29.859 28.8431 30.011 28.4208 30.0247C27.9986 30.0385 27.6292 29.8865 27.3125 29.5687L19.2771 21.5333Z"
                fill="#262222"
              />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {filteredPosts.length === 0 ? (
            <p className="no-concerns-text">No concerns found.</p>
          ) : (
            <div className="cards">
              {filteredPosts.map((concern) => (
                <Cards
                  key={concern._id}
                  _id={concern._id}
                  title={concern.title}
                  area={concern.area}
                  comment={concern.description}
                  status={concern.status || "pending"}
                  severity={concern.severity}
                  timestamp={concern.timestamp}
                  photo={concern.photo}
                  approved={concern.approved}
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit Concern Modal */}
        {isFormOpen && (
          <div
            className="form-modal-backdrop"
            onClick={() => setIsFormOpen(false)}
          >
            <div
              className="form-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="form-modal-close"
                onClick={() => setIsFormOpen(false)}
              >
                ×
              </button>
              <Form onClose={() => setIsFormOpen(false)} />
            </div>
          </div>
        )}

       <div className="footer">
  <div className="members">

    {/* Project Manager */}
    <div className="member-card member-manager">
      <div className="member-frame">
        <div className="member-img"></div>
        <div className="member-text">
          KYLE CHRISTIAN VERDIDA<br />PROJECT MANAGER
        </div>
      </div>
    </div>

    {/* Programmer */}
    <div className="member-card member-programmer">
      <div className="member-frame">
        <div className="member-img"></div>
        <div className="member-text">
          CHARLES KENT LABRADOR<br />PROGRAMMER
        </div>
      </div>
    </div>

    {/* UI/UX Designer */}
    <div className="member-card member-uiux">
      <div className="member-frame">
        <div className="member-img"></div>
        <div className="member-text">
          CHRISON LLOYDFER RARAMA<br />UI/UX DESIGNER
        </div>
      </div>
    </div>

    {/* Database Designer */}
    <div className="member-card member-database">
      <div className="member-frame">
        <div className="member-img"></div>
        <div className="member-text">
          RAILEY MUYCO<br />DATABASE DESIGNER
        </div>
      </div>
    </div>

    {/* System Analyst */}
    <div className="member-card member-analyst">
      <div className="member-frame">
        <div className="member-img"></div>
        <div className="member-text">
          EMMANUEL ADRIAN SALUDARES<br />SYSTEM ANALYST
        </div>
      </div>
    </div>

  </div>
</div>
      </div>
    </div>
  );
};

export default Main;
