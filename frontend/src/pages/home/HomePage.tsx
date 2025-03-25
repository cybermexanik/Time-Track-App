import * as React from "react";
import { FC } from "react";
import "./HomePage.css";
import Users from "../../components/Employyes/Employyes";
import WorkAnalitycs from "../../components/Activity/WorkAnalitycs";
import Profile from "../../components/Settings/Profile";

const HomePage: FC = () => {
    return (
        <div className="home-page">
            <div className="home-content">
                <div className="content-grid-one">
                    <Users />
                    <Profile/>
                </div>
                <div className="content-grid-two">
                    <WorkAnalitycs/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;