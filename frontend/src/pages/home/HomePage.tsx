import React from "react";
import { FC } from "react";
import "./HomePage.css";

const HomePage: FC = () => {
    return (
        <div className="home-page">
            <h1>Добро пожаловать на главную страницу</h1>
            <p>Это домашняя страница вашего приложения.</p>
            <div className="home-content">
                <div className="home-card">
                    <h2>Статистика</h2>
                    <p>Здесь будет отображаться статистика</p>
                </div>
                <div className="home-card">
                    <h2>Последние активности</h2>
                    <p>Здесь будут отображаться последние активности</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;