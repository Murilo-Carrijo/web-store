import React, { useState } from 'react';
import './login-forms.css';
import { authenticate } from '../services/user_services';

const LoginForm = ({ openLoginForm, setOpenLoginForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const makeLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await authenticate(email, password);
      document.cookie = `token=${token}`;
      console.log(token);
    } catch (error) {
      console.error(error);
    }
  };
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
            <input
              type="email"
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              required />
          </div>
          <button
            type="submit"
            onClick={makeLogin}
            className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
