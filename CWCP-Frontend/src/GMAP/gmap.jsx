import React, { useState } from "react";
import {
  APIProvider,
  Map,
  Marker,
  useMap
} from "@vis.gl/react-google-maps";
import "./gmap.css";

const AreaSelector = ({ setMarkerPos, setAreaStats }) => {
  const map = useMap("main-map");

  const handleChange = async (e) => {
    const area = e.target.value;
    if (!area || !map) return;

    // ---- GEOLOCATION ----
    const query = `${area.replace(/-/g, " ")}, Tagum City`;
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: query }, async (results, status) => {
      if (status === "OK") {
        const loc = results[0].geometry.location;
        const pos = { lat: loc.lat(), lng: loc.lng() };

        setMarkerPos(pos);
        map.panTo(pos);
        map.setZoom(15);
      }
    });

    // ---- API CALL ----
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/area/${area}`
      );
      const data = await res.json();
      setAreaStats(data);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  return (
    <div className="area-selector">
      <h3>Select Area</h3>
      <select onChange={handleChange} defaultValue="">
        <option value="" disabled>Choose an area</option>
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
        <option value="san-miguel-camp-4">San Miguel Camp 4</option>
        <option value="visayan-village">Visayan Village</option>
        <option value="magugpo-east">Magugpo East</option>
        <option value="magugpo-north">Magugpo North</option>
        <option value="magugpo-south">Magugpo South</option>
        <option value="magugpo-west">Magugpo West</option>
      </select>
    </div>
  );
};

const GMap = () => {
  const [markerPos, setMarkerPos] = useState(null);
  const [areaStats, setAreaStats] = useState(null);

  return (
    <APIProvider apiKey={`${import.meta.env.VITE_GMAP_API}`}>
      <div className="gmap-container">

        {/* MAP */}
        <div className="map-wrapper">
          <Map
            id="main-map"
            className="map"
            defaultZoom={12}
            defaultCenter={{ lat: 7.44848, lng: 125.80031 }}
          >
            {markerPos && <Marker position={markerPos} />}
          </Map>
        </div>

        {/* SIDE PANEL */}
        <div className="side-panel">
          <AreaSelector
            setMarkerPos={setMarkerPos}
            setAreaStats={setAreaStats}
          />

          {areaStats && (
            <div className="area-stats">
              <h3>Area Stats</h3>
              <p><strong>Area:</strong> {areaStats.area
                .toLowerCase()
                .replace(/[-—]/g, " ")   // remove dash / em dash
                .replace(/\b\w/g, c => c.toUpperCase())}</p>
              <p><strong>Total Concerns:</strong> {areaStats.totalConcerns}</p>

              <p><strong>Resolved:</strong> <span>{areaStats.status.resolved}</span></p>
              <p><strong>Pending:</strong> <span>{areaStats.status.pending}</span></p>
              <p><strong>Ongoing:</strong> <span>{areaStats.status.ongoing}</span></p>
              <p><strong>Rejected:</strong> <span>{areaStats.status.rejected}</span></p>


            </div>
          )}
        </div>

      </div>
    </APIProvider>
  );
};

export default GMap;