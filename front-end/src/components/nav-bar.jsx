import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
  const [currentUrl, _setCurrentUrl] = useState(window.location.pathname);
  return (
    <nav className='navbar navbar-light'>
      <div>Web Store</div>
      {currentUrl === '/' ? (
        <NavLink className='navbar-brand' to="/favorites">Favoritos</NavLink>
      ) : (
        <NavLink className='navbar-brand' to="/">Home</NavLink>
      )}
    </nav>
  )
}

export default NavBar;
