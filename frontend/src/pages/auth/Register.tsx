import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname:'',
    middlename:'',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Register attempt:', formData);

    if (formData.password !== formData.confirmPassword) {
      console.error("Пароли не совпадают");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          surname: formData.surname,
          middlename: formData.middlename,
        }),
      });

      if (response.ok) {
        console.log('Registration successful for email:', formData.email);
        navigate('/auth'); // Redirect to /auth on successful registration
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        // Optionally display an error message to the user
      }
    } catch (error) {
      console.error('Error during registration:', error);
      // Optionally display an error message to the user
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Регистрация</h2>
          <p className="text-silver-v1">Создайте новый аккаунт</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>

        <div className="form-group">
            <label htmlFor="email">Почта</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
        </div>

        <div className="form-group">
            <label htmlFor="surname">Фамилия</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
        </div>


          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="middlename">Отчество</label>
            <input
              type="text"
              id="middlename"
              name="middlename"
              value={formData.middlename}
              onChange={handleChange}
              required
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Зарегистрироваться
          </button>
        </form>

        <div className="auth-footer">
          <p>Уже есть аккаунт? <Link to="/auth" className="auth-link">Войти</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;