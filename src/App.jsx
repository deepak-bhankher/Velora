import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Component/Navbar'
import Home from './Pages/Home'
import Footer from './Component/Footer'
import About from './Pages/About'
import Category from './Pages/Category'
import Category1 from './Component/Category/Category1'
import Category2 from './Component/Category/Category2'
import Category3 from './Component/Category/Category3'
import Category4 from './Component/Category/Category4'
import Category5 from './Component/Category/Category5'
import Category6 from './Component/Category/Category6'
import Category7 from './Component/Category/Category7'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/category' element={<Category />} />
          <Route path='/category/speakers' element={<Category1 />} />
          <Route path='/category/power' element={<Category2 />} />
          <Route path='/category/clocks' element={<Category3 />} />
          <Route path='/category/bags' element={<Category4 />} />
          <Route path='/category/office' element={<Category5 />} />
          <Route path='/category/apparel' element={<Category6 />} />
          <Route path='/category/eco' element={<Category7 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App