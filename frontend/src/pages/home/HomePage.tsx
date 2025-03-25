import * as React from "react";
import { FC } from "react";
import "./HomePage.css";
import Users from "../../components/Employyes/Employyes";
import Financial from "../../components/Settings/Settings";
import WorkAnalitycs from "../../components/Activity/WorkAnalitycs";

const HomePage: FC = () => {
    return (
        <div className="home-page">
            <div className="home-content">
                <div className="content-grid-one">
                    <Users />
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