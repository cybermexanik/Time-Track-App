import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import "./DeleteZone.css";
import React from "react";

const DeleteZone = () => {
    return (
        <motion.div
            className="danger-zone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="danger-header">
                <Trash2 className="danger-icon" size={24} />
                <h2 className="danger-title">Danger Zone</h2>
            </div>
            <p className="danger-text">
                Permanently delete your account and all of your content.
            </p>
            <button className="danger-button">Delete Account</button>
        </motion.div>
    );
};
export default DeleteZone;
