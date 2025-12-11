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
            {/* imbis na location, mga concerns nalang na wala pa na resolved */}
        </div>
    );
};

const GMap2 = () => {
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
                        defaultZoom={15}
                        defaultCenter={{ lat: 7.414009271231644, lng: 125.76651193774056 }}
                        options={{
                            disableDefaultUI: true,  // hides default UI buttons
                            zoomControl: false,
                            styles: [
                                {
                                    featureType: "poi",   // points of interest
                                    elementType: "all",
                                    stylers: [{ visibility: "off" }] // hide all POIs
                                },
                                {
                                    featureType: "transit",  // hide transit stations
                                    elementType: "all",
                                    stylers: [{ visibility: "off" }]
                                },
                                {
                                    featureType: "road",  // optional: simplify roads
                                    elementType: "labels",
                                    stylers: [{ visibility: "off" }]
                                }
                            ]
                        }}
                    >
                        {/* No markers */}
                    </Map>

                </div>

                {/* SIDE PANEL */}


            </div>
        </APIProvider>
    );
};

export default GMap2;