import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function NavBar() {
  const [currentUrl, _setCurrentUrl] = useState(window.location.pathname);
  return (
    <nav>
      {currentUrl === '/' ? (
        <NavLink to="/favorites">Favoritos</NavLink>
      ) : (
        <NavLink to="/">Home</NavLink>
      )}
    </nav>
  )
}

export default NavBar;
