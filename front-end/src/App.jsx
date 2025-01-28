import { Route, Routes } from 'react-router-dom';
import DefaltContext from './context/toggleContext';
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
  const [openLogout, setOpenLogout] = useState(false);
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
    <DefaltContext.Provider
      value={{
        openLoginForm: openLoginForm,
        setOpenLoginForm: setOpenLoginForm,
        openRegistrerForm: openRegistrerForm,
        setOpenRegistrerForm: setOpenRegistrerForm,
        openLogout: openLogout,
        setOpenLogout: setOpenLogout,
        user: user,
      }}
    >
      <Routes>
        <Route path="/" element={
          <Home />
        } />
        <Route path="/favorites" element={
          <Favorites />
        } />
        <Route path="/products/:id" element={
          <Products />
        } />
      </Routes>
    </DefaltContext.Provider>
  )
}

export default App
