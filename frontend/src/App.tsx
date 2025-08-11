import { useState } from 'react'
import {Route, Routes, Link, useNavigate } from 'react-router'
import Register from './components/register/Register'
import Home from './components/home/Home'
import './App.css'

function App() {
  
  return (
      <div>
          
          <Routes>
              <Route path='/' element={< Home />}></Route>
              <Route path='/register' element={< Register />}></Route>
              
          </Routes>
      </div>
  )
}

export default App
