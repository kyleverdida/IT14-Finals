import React from "react";
import { useLocation } from "react-router-dom";
import "./HeaderFrame.css"
const HeaderFrame = ({
  activeView,
  setActiveView,
  searchQuery,
  setSearchQuery,
  setIsFormOpen,
  setIsFilterOpen,
  hasActiveFilters,
}) => {
  const location = useLocation();
  const showNavButtons = true; // Show nav on all routes

  return (
    <div className="header-frame">
      {/* Logo Section */}
      <div className="logo-section">
        <div className="logo-image">
          <img src="/CWCP-LOGO.svg" alt="City Logo" />
        </div>

        <div className="header-text">
          <p className="top-text">REPUBLIC OF THE PHILIPPINES</p>
          <p className="top-text">PROVINCE OF DAVAO DEL NORTE</p>
          <p className="city-text">CITY OF TAGUM</p>
          <p className="portal-title">CITY WIDE CONCERN PORTAL</p>
          <p className="portal-subtitle">
            KEEPING COMMUNITIES SAFE AND CONNECTED!
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      {showNavButtons && (
        <div className="nav-buttons-section">
          {location.pathname !== "/dashboard" && (
            <button
              className={`nav-btn ${activeView === "home" ? "active" : ""}`}
              onClick={() => setActiveView("home")}
            >
              Home
            </button>
          )}

          <button
            className={`nav-btn ${activeView === "all" ? "active" : ""}`}
            onClick={() => setActiveView("all")}
          >
            All Concerns
          </button>

          <button
            className={`nav-btn ${activeView === "resolved" ? "active" : ""}`}
            onClick={() => setActiveView("resolved")}
          >
            Resolved
          </button>

          <button
            className={`nav-btn ${activeView === "pending" ? "active" : ""}`}
            onClick={() => setActiveView("pending")}
          >
            Pending
          </button>

          {/* Rejected button only on /dashboard */}
          {location.pathname === "/dashboard" && (
            <button
              className={`nav-btn ${activeView === "rejected" ? "active" : ""}`}
              onClick={() => setActiveView("rejected")}
            >
              Rejected
            </button>
          )}
        </div>
      )}

      {/* Search Section */}
      <div className="search-section">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "14px",
              padding: "0 10px",
              color: "#262222",
            }}
          />
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

      {/* Submit Button */}
      <div className="button-section">
        <button className="btn btn-submit" onClick={() => setIsFormOpen(true)}>
          Submit Concern
        </button>
      </div>

      {/* Filter Icon */}
      <button
        className="filter-icon"
        onClick={() => setIsFilterOpen(true)}
        style={{
          position: "relative",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "5px",
        }}
      >
        <svg width="31" height="31" viewBox="0 0 31 31" fill="none">
          <path
            d="M20.5438 13.8542L7.91667 1.22708H27.1938C27.8535 1.22708 28.3285 1.51736 28.6188 2.09792C28.909 2.67847 28.8563 3.23264 28.4604 3.76042L20.5438 13.8542ZM19.2771 21.5333V24.9771C19.2771 25.4257 19.1251 25.802 18.8211 26.106C18.5171 26.41 18.1413 26.5615 17.6938 26.5604H14.5271C14.0785 26.5604 13.7027 26.4084 13.3998 26.1044C13.0968 25.8004 12.9448 25.4246 12.9438 24.9771V15.2L0.435416 2.69167C0.145139 2.40139 0 2.03881 0 1.60392C0 1.16903 0.145139 0.792723 0.435416 0.475C0.752083 0.158334 1.12839 0 1.56433 0C2.00028 0 2.37606 0.158334 2.69167 0.475L29.5688 27.3521C29.8854 27.6688 30.0374 28.0382 30.0248 28.4604C30.0121 28.8826 29.8469 29.2521 29.5292 29.5687C29.2125 29.859 28.8431 30.011 28.4208 30.0247C27.9986 30.0385 27.6292 29.8865 27.3125 29.5687L19.2771 21.5333Z"
            fill="#262222"
          />
        </svg>

        {hasActiveFilters && (
          <span
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              width: "10px",
              height: "10px",
              backgroundColor: "#3b82f6",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          />
        )}
      </button>
    </div>
  );
};

export default HeaderFrame;
