import React from "react";
import { FC } from "react";
import "./HomePage.css";
import Cards from "../../components/Cards/Cards";
import Transactions from "../../components/Employyes/Employyes";
import Report from "../../components/Activity/Activity";
import Financial from "../../components/Settings/Settings";
import Subscriptions from "../../components/Subscriptions/Subscriptions";
import WorkAnalitycs from "../../components/WorkAnalytics/WorkAnalitycs";

const HomePage: FC = () => {
    return (
        <div className="home-page">
            <div className="home-content">
                <div className="content-grid-one">
                    <Transactions />
                    <Financial/>
                </div>
                <div className="content-grid-two">
                    <WorkAnalitycs/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;