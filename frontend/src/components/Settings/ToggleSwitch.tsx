import * as React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ label, isOn, onToggle }) => {
    return (
        <div className="toggle-container">
            <span className="toggle-label">{label}</span>
            <button
                className={`toggle-button ${isOn ? "on" : "off"}`}
                onClick={onToggle}
            >
                <span className={`toggle-indicator ${isOn ? "on" : "off"}`}></span>
            </button>
        </div>
    );
};

export default ToggleSwitch;
