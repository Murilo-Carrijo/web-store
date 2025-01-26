import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Favorites from './pages/favorites';
import Products from './pages/products';
import { useState, useEffect } from 'react';
import { getCookie } from './utils/cookies';
import { decodeToken } from './utils/token';

const App = () => {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openRegistrerForm, setOpenRegistrerForm] = useState(false);
  const [user, setUser] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      const cookieToken = getCookie('token');
      if (cookieToken) {
        const userInfos = decodeToken(cookieToken);
        setUser({
          ...userInfos,
          isValid: true
        });
      } else {
        setUser({
          isValid: false
        });
      }
    }
    fetchUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <Home
          openLoginForm={openLoginForm}
          setOpenLoginForm={setOpenLoginForm}
          user={user}
          openRegistrerForm={openRegistrerForm}
          setOpenRegistrerForm={setOpenRegistrerForm}
        />
      } />
      <Route path="/favorites" element={
        <Favorites
          openLoginForm={openLoginForm}
          setOpenLoginForm={setOpenLoginForm}
          user={user}
          openRegistrerForm={openRegistrerForm}
          setOpenRegistrerForm={setOpenRegistrerForm}
        />
      } />
      <Route path="/products/:id" element={
        <Products
          openLoginForm={openLoginForm}
          setOpenLoginForm={setOpenLoginForm}
          user={user}
          openRegistrerForm={openRegistrerForm}
          setOpenRegistrerForm={setOpenRegistrerForm}
        />
      } />
    </Routes>
  )
}

export default App
