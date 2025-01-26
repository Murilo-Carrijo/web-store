import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const NavBar = ({
  user, setOpenLoginForm, setOpenRegistrerForm
}) => {
  const [currentUrl, _setCurrentUrl] = useState(window.location.pathname);
  const renderFavoritesElement = () => {
    if (user.isValid) {
      return (
        <div style={{width: '50%', display: "flex", justifyContent: "end", alignItems: 'center'}}>
          <NavLink className='navbar-brand' to="/favorites">Favoritos</NavLink>
          <button style={{ all: 'unset', display: "inline-block", paddingTop: "0.3125rem", marginRight: "1rem", fontSize: "1,25rem", lineHeight: "inherit", whiteSpace: "nowrap", color: "rgba(0,0,0,.9)"  }} onClick={() => setOpenLoginForm(true)} >Login</button>
          <button style={{ all: 'unset', display: "inline-block", paddingTop: "0.3125rem", marginRight: "1rem", fontSize: "1,25rem", lineHeight: "inherit", whiteSpace: "nowrap", color: "rgba(0,0,0,.9)"  }} onClick={() => setOpenRegistrerForm(true)} >Registre-se</button>
        </div>
      );
    } else {
      return (
        <div style={{width: '50%', display: "flex", justifyContent: "end", alignItems: 'center'}}>
          <button className='navbar-brand' style={{ all: 'unset' }} onClick={() => setOpenLoginForm(true)}>Favoritos</button>
          <button style={{ all: 'unset', display: "inline-block", paddingTop: "0.3125rem", marginRight: "1rem", fontSize: "1,25rem", lineHeight: "inherit", whiteSpace: "nowrap", color: "rgba(0,0,0,.9)"  }} onClick={() => setOpenLoginForm(true)} >Login</button>
          <button style={{ all: 'unset', display: "inline-block", paddingTop: "0.3125rem", marginRight: "1rem", fontSize: "1,25rem", lineHeight: "inherit", whiteSpace: "nowrap", color: "rgba(0,0,0,.9)"  }} onClick={() => setOpenRegistrerForm(true)} >Registre-se</button>
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
        <div style={{width: '50%', display: "flex", justifyContent: "end", alignItems: 'center'}}>
          <NavLink className='navbar-brand' to="/">Home</NavLink>
        </div>
      );
      break;
    default:
      navLink = (
        <div style={{width: '50%', display: "flex", justifyContent: "end", alignItems: 'center'}}>
          <NavLink className='navbar-brand' to="/">Home</NavLink>
          <NavLink className='navbar-brand' to="/favorites">Favoritos</NavLink>
          <button style={{ all: 'unset', display: "inline-block", paddingTop: "0.3125rem", marginRight: "1rem", fontSize: "1,25rem", lineHeight: "inherit", whiteSpace: "nowrap", color: "rgba(0,0,0,.9)"  }} onClick={() => setOpenLoginForm(true)} >Login</button>
          <button style={{ all: 'unset', display: "inline-block", paddingTop: "0.3125rem", marginRight: "1rem", fontSize: "1,25rem", lineHeight: "inherit", whiteSpace: "nowrap", color: "rgba(0,0,0,.9)"  }} onClick={() => setOpenRegistrerForm(true)} >Registre-se</button>
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
