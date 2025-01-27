import React from 'react';
import './login-forms.css';
import { deleteCookie } from '../utils/cookies';

const LoginForm = ({ openLogout, setOpenLogout }) => {
  const logout = () => {
    deleteCookie('token');
    window.location.reload();
    setOpenLogout(!openLogout);
  }

  const closeModal = () => {
    setOpenLogout(!openLogout);
  };

  if (!openLogout) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" style={{ height: "200"}} onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>X</button>
        <p>Clique no botão abaixo para poder realizar o logout.</p>

        <div >
          <button
            type="button"
            onClick={() => logout()}
            className="login-button">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
