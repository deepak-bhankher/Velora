import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Navbar from './Component/Navbar'
import Home from './Pages/Home'
import Footer from './Component/Footer'

const App = () => {
  return (
  <>
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>}/>

  </Routes>
  <Footer/>
  </BrowserRouter>
  </>
  )
}

export default App
