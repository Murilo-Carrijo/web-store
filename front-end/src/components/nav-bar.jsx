import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const NavBar = ({ user, setOpenLoginForm }) => {
  const [currentUrl, _setCurrentUrl] = useState(window.location.pathname);
  const renderFavoritesElement = () => {
    if (user.isValid) {
      return <NavLink className='navbar-brand' to="/favorites">Favoritos</NavLink>;
    } else {
      return <button className='navbar-brand' style={{ all: 'unset' }} onClick={() => setOpenLoginForm(true)}>Favoritos</button>;
    }
  };

  let navLink;
  switch (currentUrl) {
    case '/':
      navLink = renderFavoritesElement();
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
