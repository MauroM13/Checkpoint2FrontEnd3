import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Form.module.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const data = await response.json();
      const { token } = data;

      // Salve o token no localStorage
      localStorage.setItem('authToken', token);

      // Redirecione para a página principal
      history.push('/');

      // Exiba uma mensagem de sucesso 
      alert('Login bem-sucedido');
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas informações novamente.');
    }
  };

  return (
    <>
      <div
        className={`text-center card container ${styles.card} ${
          styles[localStorage.getItem('themeMode')] // Aplica o estilo de acordo com o tema no localStorage
        }`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              required
              value={formData.login}
              onChange={(e) => setFormData({ ...formData, login: e.target.value })}
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {error && <p className="error-message">{error}</p>}
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
