import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Favorites from './pages/favorites';
import Products from './pages/products';
import { useState } from 'react';

const App = () => {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  console.log(openLoginForm);

  return (
    <Routes>
      <Route path="/" element={
        <Home openLoginForm={openLoginForm} setOpenLoginForm={setOpenLoginForm} />
      } />
      <Route path="/favorites" element={
        <Favorites openLoginForm={openLoginForm} setOpenLoginForm={setOpenLoginForm} />
      } />
      <Route path="/products/:id" element={
        <Products openLoginForm={openLoginForm} setOpenLoginForm={setOpenLoginForm} />
      } />
    </Routes>
  )
}

export default App
