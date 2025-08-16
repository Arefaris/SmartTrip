import { useState, useEffect } from 'react'
import {Route, Routes, Link, useNavigate, Navigate, useLocation } from 'react-router'
import useStore from './store/store'
import Register from './components/register/Register'
import Home from './components/home/Home'
import './App.css'
import Login from './components/login/Login'
import Plan from './components/plan/Plan'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, refreshToken, logout, user } = useStore()
  
  // Show back button only on non-home pages
  const showBackButton = location.pathname !== '/'
  
  // Check authentication on app load
  useEffect(() => {
    refreshToken()
  }, [])
  
  return (
      <div>
        <div className="header">

            <div className="logo-cont">
                <div className="app-logo" onClick={() => navigate("/")}>SmartTrip</div>
                {showBackButton && (
                  <button className="back-button" onClick={() => navigate('/')}>
                   ← Back to Planning
                  </button>
                )}
            </div>

            
            <div className="log-register cont">
                {isAuthenticated ? (
                  <>
                    <button onClick={logout}>Logout</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => navigate("/register")}>Register</button>
                    <button onClick={() => navigate("/login")}>Login</button>
                  </>
                )}
            </div>
        
        </div>
          <Routes>
              <Route path='/' element={< Home />}></Route>
              <Route path='/register' element={< Register />}></Route>
              <Route path='/login' element={< Login />}></Route>
              <Route path='/plan' element={< Plan />}></Route>
          </Routes>
      </div>
  )
}

export default App
