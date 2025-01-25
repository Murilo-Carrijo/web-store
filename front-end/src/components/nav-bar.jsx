import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
  const [currentUrl, _setCurrentUrl] = useState(window.location.pathname);

  let navLink;
  switch (currentUrl) {
    case '/':
      navLink = <NavLink className='navbar-brand' to="/favorites">Favoritos</NavLink>;
      break;
    case '/favorites':
      navLink = <NavLink className='navbar-brand' to="/">Home</NavLink>;
      break;
    default:
      navLink = (
        <div style={{width: '50%', display: "flex", justifyContent: "end", alignItems: 'center'}}>
          <NavLink className='navbar-brand' to="/">Home</NavLink>
          <NavLink className='navbar-brand' to="/favorites">Favoritos</NavLink>
        </div>
      );
  }
  return (
    <nav className='navbar navbar-light'>
      <div>Web Store</div>
      { navLink }
    </nav>
  )
}

export default NavBar;
