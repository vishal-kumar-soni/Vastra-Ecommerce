import React from 'react'
import Sidebar from '../components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddProducts from '../components/AddProducts'
import ListProducts from '../components/ListProducts'
import Dashboard from '../components/Dashboard'


function Admin() {
  return (
    <div className='flex  max-md:flex-col'>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addproduct" element={<AddProducts />} />
        <Route path="/listproduct" element={<ListProducts />} />
      </Routes>

    </div>
  )
}

export default Admin
