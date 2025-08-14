import { useState } from 'react'
import {Route, Routes, Link, useNavigate } from 'react-router'
import Register from './components/register/Register'
import Home from './components/home/Home'
import './App.css'
import Login from './components/login/Login'
import Plan from './components/plan/Plan'

function App() {
  
  return (
      <div>
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
