import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./main.css";

import Cards from "../CARDS/cards.jsx";
import Form from "../FORM/form.jsx";
import Filter from "../FILTER/filters.jsx";
import Home from "../home/home.jsx"
import HeaderFrame from "../HeaderFrame/HeaderFrame.jsx";
import AllConcerns from "../CARDS/Categories/AllConcerns.jsx";
import Resolved from "../CARDS/Categories/Resolved.jsx";
import Pending from "../CARDS/Categories/Pending.jsx";
import Rejected from "../CARDS/Categories/Rejected.jsx";
import Statistics from "../Stats/statistics.jsx";
import GMap from "../GMAP/gmap.jsx";


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

  // Set activeView based on location
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setActiveView("all");
    } else {
      setActiveView("home");
    }
  }, [location.pathname]);

  // Fetch posts periodically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `${import.meta.env.VITE_API_URL}/fetch`; // Always fetch all posts

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
        <HeaderFrame
          isModeratorPage={isModeratorPage}
          activeView={activeView}
          setActiveView={setActiveView}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setIsFormOpen={setIsFormOpen}
          setIsFilterOpen={setIsFilterOpen}
          hasActiveFilters={hasActiveFilters}
          filters={filters}
          setFilters={setFilters}
        />


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
        <div className="dashboard-layout">
          {/* LEFT: Statistics */}
          <aside className="dashboard-stats">
            <Statistics />
          </aside>

          {/* RIGHT: Main Content */}
          <div className="dashboard-content">
            {activeView === "home" && !isModeratorPage && <Home />}

            {activeView === "all" && <AllConcerns posts={filteredPosts} />}

            {activeView === "resolved" && <Resolved posts={filteredPosts} />}

            {activeView === "pending" && <Pending posts={filteredPosts} />}

            {activeView === "rejected" && <Rejected posts={filteredPosts} />}

            {activeView === "map" && <GMap />}
          </div>
        </div>

        {/* Submit Concern Modal - Show on both views */}
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
      </div>
    </div>
  );
};

export default Main;