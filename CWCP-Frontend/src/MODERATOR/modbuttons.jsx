import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import "./modbuttons.css"
const modbuttons = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mod-buttons">
  <button onClick={() => navigate("/mod")}>Moderator Login</button>
  
</div>
    </div>
  )
}

export default modbuttons