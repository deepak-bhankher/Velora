import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Navbar from './Component/Navbar'

const App = () => {
  return (
  <>
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route/>

  </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
