import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './nav-bar.css';

const NavBar = ({
  user,
  setOpenLoginForm,
  setOpenRegistrerForm,
  setOpenLogout
}) => {
  const [currentUrl, _setCurrentUrl] = useState(window.location.pathname);

  const checkUser = () => {
    if (!user.isValid) {
      return (
        <div className="nav-bar-buttons-content">
          <button style={{ all: 'unset'}} onClick={() => setOpenLoginForm(true)} >Login</button>
          <button style={{ all: 'unset'}} onClick={() => setOpenRegistrerForm(true)} >Registre-se</button>
        </div>
      )
    } else {
      return (
        <div className="nav-bar-name">
          <button style={{ all: 'unset', paddingRight: '16px'}} onClick={() => setOpenLogout(true)} >Logout</button>
          Olá, {user.name}
        </div>
      )
    }
  };

  const renderFavoritesElement = () => {
    if (user.isValid) {
      return (
        <div className="nav-content">
          <NavLink className='nav-bar-links' to="/favorites">Favoritos</NavLink>
          {checkUser()}
        </div>
      );
    } else {
      return (
        <div className="nav-content">
          <button className='nav-bar-links' style={{ all: 'unset' }} onClick={() => setOpenLoginForm(true)}>Favoritos</button>
          {checkUser()}
        </div>
        );
    }
  };

  let navLink;
  switch (currentUrl) {
    case '/':
      navLink = renderFavoritesElement();
      break;
    case '/favorites':
      navLink = (
        <div className="nav-content">
          <NavLink className='nav-bar-links' to="/">Home</NavLink>
          <div className="nav-bar-name">
            <button style={{ all: 'unset', paddingRight: '16px'}} onClick={() => setOpenLogout(true)} >Logout</button>
            Olá, {user.name}
          </div>
        </div>
      );
      break;
    default:
      navLink = (
        <div className="nav-content">
          <NavLink className='nav-bar-links' to="/">Home</NavLink>
          <NavLink className='nav-bar-links' to="/favorites">Favoritos</NavLink>
          {checkUser()}
        </div>
      );
  }
  return (
    <nav className='nav-bar'>
      <div>Web Store</div>
      { navLink }
    </nav>
  )
}

export default NavBar;
