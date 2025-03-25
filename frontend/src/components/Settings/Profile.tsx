import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import "./Profile.css";

const Profile = () => {
    return (
        <SettingSection icon={User} title="Profile">
            <div className="profile-container">
                <img
                    src="https://randomuser.me/api/portraits/men/3.jpg"
                    alt="Profile"
                    className="profile-image"
                />

                <div>
                    <h3 className="profile-name">John Doe</h3>
                    <p className="profile-email">john.doe@example.com</p>
                </div>
            </div>

            <button className="profile-button">Edit Profile</button>
        </SettingSection>
    );
};
export default Profile;
