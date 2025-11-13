import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./main.css";


import Cards from "../CARDS/cards.jsx";
import Form from "../FORM/form.jsx";
import SidebarLeft from "../SIDEBAR-LEFT/sidebar_left.jsx";
import Searchbar from "../SEARCHBAR/searchbar.jsx";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({ area: "", severity: "", status: "" });
  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 Fetch posts periodically
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

  // 🔹 Apply filters
  const filteredPosts = posts.filter((concern) => {
    const matchesArea =
      !filters.area || concern.area?.toLowerCase() === filters.area.toLowerCase();
    const matchesSeverity =
      !filters.severity ||
      concern.severity?.toLowerCase() === filters.severity.toLowerCase();
    const matchesStatus =
      !filters.status ||
      concern.status?.toLowerCase() === filters.status.toLowerCase();
    return matchesArea && matchesSeverity && matchesStatus;
  });

  return (
    <div className="dashboard">


      {/* Main Content */}
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-left">
            <img
              src="./CWCP-LOGO.svg"
              alt="CWCP Logo"
              className="header-logo"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
            <p className="header-tagline">See Something? Do Something</p>
          </div>

          <div className="header-right">
            {location.pathname === "/" && <Form />}
            <SidebarLeft filters={filters} setFilters={setFilters} />
            <Searchbar setPosts={setPosts} />
          </div>
        </header>



        {/* Sidebar */}


        {/* Show form on homepage */}


        {/* Posts */}
        <div className="cards">
          {filteredPosts.length === 0 ? (
            <h1 id="noposts">No concerns found.</h1>
          ) : (
            filteredPosts.map((concern) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
