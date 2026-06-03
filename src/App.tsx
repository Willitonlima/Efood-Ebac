import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Restaurant from './pages/Restaurant'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Cart from './components/Cart'

function App() {
  return (
    <BrowserRouter>
      <Cart />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurante/:id" element={<Restaurant />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmacao" element={<OrderConfirmation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
