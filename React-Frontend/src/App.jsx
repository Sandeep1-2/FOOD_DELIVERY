import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Cart from './pages/Cart/Cart'
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from './components/Footer/Footer'
import LoginPage from './components/LoginPage/LoginPage'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
const App = () => {
  const [showLogin,setShowLogin]=useState(false)
  const [searchName, setSearchName] = useState("");
  return (
    <>
    {showLogin?<LoginPage setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} setSearchName={setSearchName}/>
        <Routes>
          <Route path='/' element={<Home searchName={searchName} setSearchName={setSearchName}/>} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer />
      <ToastContainer/>

      <ScrollToTop />
    </>
  )
}

export default App
