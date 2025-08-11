import React from 'react'
import {Route, Routes, Link, useNavigate } from 'react-router'
export default function Home() {
  const navigate = useNavigate()

  return (<>
        <h1>SmartTrip</h1>
          <button>Login</button>
          <button onClick={() => {navigate("/register")}}>Register</button>
        </>
    
  )
}
