import React from 'react'
import "./loadingscreen.css"
const loadingscreen = () => {
  return (
    <div className="loading-screen">
          <img src="./cwcp-city-logo.svg" alt="CWCP Logo" className="loading-logo" />
          <h2>Barangay Concern Portal</h2>
          <h1>Please wait...</h1>
        </div>
  )
}

export default loadingscreen