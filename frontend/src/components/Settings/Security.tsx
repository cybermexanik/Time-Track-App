import { Lock } from "lucide-react";
import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { useState } from "react";
import "./Security.css";

const Security = () => {
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <SettingSection icon={Lock} title="Security">
            <ToggleSwitch
                label="Two-Factor Authentication"
                isOn={twoFactor}
                onToggle={() => setTwoFactor(!twoFactor)}
            />
            <div className="security-button-container">
                <button className="security-button">Change Password</button>
            </div>
        </SettingSection>
    );
};
export default Security;
