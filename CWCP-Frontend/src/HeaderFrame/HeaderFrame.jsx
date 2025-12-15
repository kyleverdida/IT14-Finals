import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./HeaderFrame.css";

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
  const navigate = useNavigate();

  return (
    <div className="header-frame">
      {/* LOGO */}
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

      {/* NAV */}
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

        {location.pathname === "/dashboard" && (
          <button
            className={`nav-btn ${activeView === "rejected" ? "active" : ""}`}
            onClick={() => setActiveView("rejected")}
          >
            Rejected
          </button>

        )}
        <button
          className={`nav-btn ${activeView === "rejected" ? "active" : ""}`}
          onClick={() => setActiveView("map")}
        >
          Map
        </button>

      </div>

      {/* RIGHT ACTIONS */}
      <div className="header-right">


        <div className="search-section">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

        <button className="btn-submit" onClick={() => setIsFormOpen(true)}>
          Submit Concern
        </button>

        <button
          className="filter-icon"
          onClick={() => setIsFilterOpen(true)}
        >
          <img src="/filterbutton.svg" alt="" />
          {hasActiveFilters && <span className="filter-dot" />}
        </button>

        <button
          className="nav-btn"
          onClick={() => navigate(location.pathname === "/" ? "/mod" : "/")}
        >
          🔒
        </button>
      </div>
    </div>
  );
};

export default HeaderFrame;
