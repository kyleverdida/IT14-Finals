import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import "./modbuttons.css"

const modbuttons = () => {
  const navigate = useNavigate();

  return (


    <button onClick={() => navigate("/mod")}>🔒</button>



  )
}

export default modbuttons
