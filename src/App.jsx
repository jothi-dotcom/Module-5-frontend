import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from './pages/Dashboard';
import Navbar from "./components/Navbar"
import ProductRoutes from './components/ProductRoutes';

function App() {
  return (
    <>
    <Navbar />
    
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      
      <Route path='/dashboard/*' element={
      <ProductRoutes>
        <Dashboard />
      </ProductRoutes>} />
      
    </Routes>

    </>
  )
}

export default App