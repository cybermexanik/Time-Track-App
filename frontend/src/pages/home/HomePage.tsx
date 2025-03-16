import React from "react";
import { FC } from "react";
import "./HomePage.css";
import Cards from "../../components/Cards/Cards";
import Transactions from "../../components/Employyes/Employyes";
import Report from "../../components/Report/Report";
import Financial from "../../components/Settings/Settings";
import Subscriptions from "../../components/Subscriptions/Subscriptions";

const HomePage: FC = () => {
    return (
        <div className="home-page">
            <div className="home-content">
                <div className="content-grid-one">
                    <Report />
                    <Transactions />
                </div>
                <div className="content-grid-two">
                    <Financial/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;