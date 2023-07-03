import React, { useContext } from 'react'
import "./index.scss"
import { Login, Home } from "./pages/index.js"
import {  Route, BrowserRouter, Routes, useNavigate  } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import ProtectedRoute from './pages/ProtectedRoute'

const App = () => {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App