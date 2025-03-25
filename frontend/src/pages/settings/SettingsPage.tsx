import * as React from "react";
import { FC } from "react";
import Notifications from "../../components/Settings/Notifications";
import './SettingsPage.css';
import Security from "../../components/Settings/Security";
import DeleteZone from "../../components/Settings/DeleteZone";
import Profile from "../../components/Settings/Profile";


const SettingsPage: FC = () => {
    return <div className="settings-page">
        <div className="settings-content">
            <div className="content-grid-four">
                <Profile/>
            </div>
            <div className="content-grid-1">
                <Notifications />
            </div>
            <div className="content-grid-two">
                <Security/>
            </div>
            <div className="content-grid-three">
                <DeleteZone/>
            </div>
        </div>
    </div>
}

export default SettingsPage;