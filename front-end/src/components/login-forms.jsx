import { useState, useContext } from 'react';
import './login-forms.css';
import { authenticate } from '../services/user_services';
import DefaltContext from '../context/toggleContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const context = useContext(DefaltContext);

  const { openLoginForm, setOpenLoginForm } = context;

  const makeLogin = async (e) => {
    e.preventDefault();
    setError(false);
    const token = await authenticate(email, password);
    if (token.message) {
      setError(true);
      return;
    } else {
      document.cookie = `token=${token.token}`;
      window.location.reload();
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
            {error && (
            <div className="error-message">
              <span>Erro ao fazer login. Por favor, verifique suas credenciais e tente novamente.</span>
            </div>
            )}
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
