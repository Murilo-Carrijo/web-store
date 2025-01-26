import React, { useState } from 'react';
import './register-forms.css';
import { register } from '../services/user_services';

const RegisterForms = ({ openRegistrerForm, setOpenRegistrerForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_verifyPassword, setVerifyPassword] = useState('');
  const [error, setError] = useState({ field: "", message: "", render: false });

  const closeModal = () => {
    setOpenRegistrerForm(!openRegistrerForm);
  };

  if (!openRegistrerForm) return null;

  const checkName = (name) => {
    if (name.length < 3) {
      setError({ field: "name", message: "Nome deve ter no mínimo 3 caracteres.", render: true });
      return false;
    }
    setError({ field: "name", message: "", render: false });
    return true;
  };

  const checkEmail = (email) => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const checkEmail = emailRegex.test(email);
    if (!checkEmail) {
      setError({ field: "email", message: "Email inválido.", render: true });
      return false;
    }
    setError({ field: "email", message: "", render: false });
    return true;
  };

  const checkPassword = (password) => {
    if (password.length < 6) {
      setError({ field: "password", message: "Senha deve ter no mínimo 6 caracteres.", render: true });
      return false;
    }
    setError({ field: "password", message: "", render: false });
    return true;
  };

  const checkSecondPassword = (checkPass) => {
    if (checkPass.length < 6) {
      setError({ field: "checkPass", message: "Senha deve ter no mínimo 6 caracteres.", render: true });
      return false;
    }

    if (checkPass !== password) {
      setError({ field: "checkPass", message: "A confirmação de senha deve ser igual a senha.", render: true });
      return false;
    }
    setError({ field: "checkPass", message: "", render: false });
    return true;
  };

  const registerUser = async () => {
    if (!checkName(name) || !checkEmail(email) || !checkPassword(password) || !checkSecondPassword(_verifyPassword)) {
      return;
    }

    try {
      await register(name, email, password);
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar usuário.');
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>X</button>
        <form className="login-form">
          <div className="input-group">
            <label>Nome:</label>
            <input
              type="text"
              onChange={(e) => {
                checkName(e.target.value);
                setName(e.target.value);
              }}
              value={name}
              required
            />
            {error.field === "name" && error.render && (
              <div className="error-message">
                <p>{error.message}</p>
              </div>
            )}
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              onChange={(e) => {
                checkEmail(e.target.value);
                setEmail(e.target.value);
              }}
              value={email}
              required
            />
            {error.field === "email" && error.render && (
              <div className="error-message">
                <p>{error.message}</p>
              </div>
            )}
          </div>
          <div className="input-group">
            <label>Senha:</label>
            <input
              type="password"
              onChange={(e) => {
                checkPassword(e.target.value);
                setPassword(e.target.value);
              }}
              required />
            {error.field === "password" && error.render && (
              <div className="error-message">
                <p>{error.message}</p>
              </div>
            )}
          </div>
          <div className="input-group">
            <label>Confirme a senha:</label>
            <input
              type="password"
              onChange={(e) => {
                checkSecondPassword(e.target.value);
                setVerifyPassword(e.target.value);
              }}
              required />
            {error.field === "checkPass" && error.render && (
              <div className="error-message">
                <p>{error.message}</p>
              </div>
            )}
          </div>
          <button
            type="submit"
            onClick={registerUser}
            className="login-button">
            Criar conta
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForms;
