import React, { useState } from 'react';
import './login-forms.css';

const LoginForm = ({ openLoginForm, setOpenLoginForm }) => {
  const closeModal = () => {
    setOpenLoginForm(!openLoginForm);
  };

  if (!openLoginForm) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>X</button>
        <form className="login-form">
          <div className="input-group">
            <label>Email:</label>
            <input type="email" required />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
