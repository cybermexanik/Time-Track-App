import * as React from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import {useState} from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); 
    console.log('Login attempt:', formData);

  try{
    const response = await fetch("http://localhost:3000/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        Accept:"application/json",
      },
      body:JSON.stringify({
        email: formData.email,
        password: formData.password,
      })
    });

    const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Ошибка ${response.status}: ${response.statusText}`);
      }

      console.log('Login successful:', data);

      const token = data.token;

      if (!token) {
         throw new Error("Токен не получен от сервера при успешном входе.");
      }

      localStorage.setItem('authToken', token);

      navigate('/'); 

    } catch (err) {
      console.error('Login failed:', err);
      setError(err instanceof Error ? err.message : "Произошла неизвестная ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Вход в систему</h2>
          <p className="text-silver-v1">Введите данные для входа</p>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading} 
            />
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Нет аккаунта? <Link to="/register" className="auth-link">Зарегистрироваться</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;