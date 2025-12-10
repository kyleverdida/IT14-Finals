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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("home"); // 'home' or 'concerns'
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if we're on moderator page
  const isModeratorPage = location.pathname !== "/";

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
    
    // Search filter
    const matchesSearch = !searchQuery || 
      concern.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concern.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesArea && matchesSeverity && matchesStatus && matchesSearch;
  });

  // Check if any filters are active
  const hasActiveFilters = filters.area || filters.severity || filters.status;

  return (
    <div className="user-mainpage">
      <div className="dashboard">
        {/* Header Frame */}
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
              <p className="portal-title">CITY WIDE CONCERN PORTAL</p>
              <p className="portal-subtitle">
                KEEPING COMMUNITIES SAFE AND CONNECTED!
              </p>
            </div>
          </div>

          {/* Navigation Buttons - Only show on user page */}
          {!isModeratorPage && (
            <div className="nav-buttons-section">
              <button
                className={`nav-btn ${activeView === 'home' ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveView('home')}
              >
                Home
              </button>
              <button
                className={`nav-btn ${activeView === 'concerns' ? 'active' : ''}`}
                type="button"
                onClick={() => setActiveView('concerns')}
              >
                Concerns
              </button>
            </div>
          )}

          {/* Search Section - Only show on concerns view */}
          {(isModeratorPage || activeView === 'concerns') && (
            <div className="search-section">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    padding: '0 10px',
                    color: '#262222'
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
          )}

          {/* Buttons - Submit Concern button on both views */}
          {!isModeratorPage && (
            <div className="button-section">
              <button
                className="btn btn-submit"
                type="button"
                onClick={() => setIsFormOpen(true)}
              >
                Submit Concern
              </button>
            </div>
          )}

          {/* Filter Icon - Only show on concerns view */}
          {(isModeratorPage || activeView === 'concerns') && (
            <button
              className="filter-icon"
              type="button"
              onClick={() => setIsFilterOpen(true)}
              aria-label="Open filters"
              style={{ 
                position: 'relative', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                padding: '5px'
              }}
            >
              <svg width="31" height="31" viewBox="0 0 31 31" fill="none">
                <path
                  d="M20.5438 13.8542L7.91667 1.22708H27.1938C27.8535 1.22708 28.3285 1.51736 28.6188 2.09792C28.909 2.67847 28.8563 3.23264 28.4604 3.76042L20.5438 13.8542ZM19.2771 21.5333V24.9771C19.2771 25.4257 19.1251 25.802 18.8211 26.106C18.5171 26.41 18.1413 26.5615 17.6938 26.5604H14.5271C14.0785 26.5604 13.7027 26.4084 13.3998 26.1044C13.0968 25.8004 12.9448 25.4246 12.9438 24.9771V15.2L0.435416 2.69167C0.145139 2.40139 0 2.03881 0 1.60392C0 1.16903 0.145139 0.792723 0.435416 0.475C0.752083 0.158334 1.12839 0 1.56433 0C2.00028 0 2.37606 0.158334 2.69167 0.475L29.5688 27.3521C29.8854 27.6688 30.0374 28.0382 30.0248 28.4604C30.0121 28.8826 29.8469 29.2521 29.5292 29.5687C29.2125 29.859 28.8431 30.011 28.4208 30.0247C27.9986 30.0385 27.6292 29.8865 27.3125 29.5687L19.2771 21.5333Z"
                  fill="#262222"
                />
              </svg>
              {/* Active filter indicator */}
              {hasActiveFilters && (
                <span
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '50%',
                    border: '2px solid white'
                  }}
                />
              )}
            </button>
          )}
        </div>

        {/* Filter Modal */}
        {isFilterOpen && (
          <div className="modal-overlay-sidebar" onClick={() => setIsFilterOpen(false)}>
            <div
              className="modal-content-sidebar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Filters</h2>
                <button className="close-btn-sidebar" onClick={() => setIsFilterOpen(false)}>
                  ✖
                </button>
              </div>

              <div className="modal-body">
                <label>Area:</label>
                <select
                  name="area"
                  value={filters?.area || ""}
                  onChange={(e) => setFilters((prev) => ({ ...prev, area: e.target.value }))}
                >
                  <option value="">All Areas</option>
                  <option value="apokon">Apokon</option>
                  <option value="bincungan">Bincungan</option>
                  <option value="busaon">Busaon</option>
                  <option value="canocotan">Canocotan</option>
                  <option value="cuambogan">Cuambogan</option>
                  <option value="la-filipina">La Filipina</option>
                  <option value="liboganon">Liboganon</option>
                  <option value="madaum">Madaum</option>
                  <option value="magdum">Magdum</option>
                  <option value="mankilam">Mankilam</option>
                  <option value="new-balamban">New Balamban</option>
                  <option value="nueva-fuerza">Nueva Fuerza</option>
                  <option value="pagsabangan">Pagsabangan</option>
                  <option value="pandapan">Pandapan</option>
                  <option value="magugpo-poblacion">Magugpo Poblacion</option>
                  <option value="san-agustin">San Agustin</option>
                  <option value="san-isidro">San Isidro</option>
                  <option value="san-miguel-camp-4">San Miguel (Camp 4)</option>
                  <option value="visayan-village">Visayan Village</option>
                  <option value="magugpo-east">Magugpo East</option>
                  <option value="magugpo-north">Magugpo North</option>
                  <option value="magugpo-south">Magugpo South</option>
                  <option value="magugpo-west">Magugpo West</option>
                </select>

                <label>Severity:</label>
                <select
                  name="severity"
                  value={filters?.severity || ""}
                  onChange={(e) => setFilters((prev) => ({ ...prev, severity: e.target.value }))}
                >
                  <option value="">All Severity</option>
                  <option value="inconvenient">Inconvenient</option>
                  <option value="hazard">Hazard</option>
                  <option value="life-threatening">Life-Threatening</option>
                </select>

                <label>Status:</label>
                <select
                  name="status"
                  value={filters?.status || ""}
                  onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="main-content">
          {!isModeratorPage && activeView === 'home' ? (
            // Home View - Description of City and System
            <div className="home-view">
              <div className="home-section city-description">
                <h2>The City of Tagum</h2>
                <p>
                  The City of Tagum, officially known as the City of Tagum, is a 1st class component city and capital of the Davao del Norte province, Philippines. According to the 2020 census, it has a population of 296,202 people, making it the most populous component city in Mindanao.
                </p>
                <p>
                  Tagum is known as the "Palm City of the South" due to its vast palm oil plantations. The city has been recognized for its outstanding performance in various fields including education, health, environment, and disaster preparedness. It has received numerous awards including the Seal of Good Local Governance and recognition as one of the most competitive cities in the Philippines.
                </p>
                <p>
                  The city is home to diverse communities across its 23 barangays, each contributing to the rich cultural tapestry and vibrant economy of Tagum. With its strategic location and progressive governance, Tagum continues to be a model city for sustainable development and community welfare.
                </p>
              </div>

              <div className="home-section system-description">
                <h2>The City Wide Concern Portal</h2>
                <p>
                  The City Wide Concern Portal is an innovative digital platform designed to strengthen the connection between the government and the citizens of Tagum City. This system empowers residents to actively participate in maintaining the safety, cleanliness, and orderliness of their communities.
                </p>
                <p>
                  Through this portal, citizens can report various concerns including infrastructure issues, environmental hazards, public safety matters, and other community-related problems. Each concern is categorized by area, severity level, and status, ensuring efficient tracking and resolution by the appropriate city departments.
                </p>
                <p>
                  The system features a transparent workflow where submitted concerns are reviewed by moderators, tracked through different stages of resolution, and made visible to the public. This promotes accountability, encourages civic engagement, and helps build a safer, more responsive community for all Tagumenyos.
                </p>
                <p>
                  By using this platform, you become an active partner in creating positive change in your barangay and throughout the entire city. Together, we are keeping communities safe and connected!
                </p>
              </div>
            </div>
          ) : (
            // Concerns View - Display Cards (for both moderator and user concerns view)
            filteredPosts.length === 0 ? (
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
            )
          )}
        </div>

        {/* Submit Concern Modal - Show on both views */}
        {isFormOpen && !isModeratorPage && (
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
      </div>
    </div>
  );
};

export default Main;