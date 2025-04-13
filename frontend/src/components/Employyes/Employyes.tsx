import "./Employyes.css";
import { transactions } from "../../data/data";
import { iconsImgs } from "../../utils/images";
import * as React from "react";
import {FC, useEffect, useState} from "react";
import { UserOutlined } from '@ant-design/icons';

const Users: FC = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("http://localhost:3000/api/user");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
            } catch (e: any) {
                setError(e.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    
    return (
        <div className="grid-one-item grid-common grid-c2">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Пользователи:</h3>
            </div>

            <div className="grid-content">
                <div className="grid-items">
                    <div className="users-scroll-container">
                        {users.map((user) => (
                            <div className="grid-item" key={user.id}>
                                <div className="grid-item-l">
                                    <div className="avatar img-fit-cover">
                                        {user.avatarUrl ? (
                                            <img src={user.avatarUrl} alt={user.name} />
                                        ) : (
                                            <UserOutlined style={{ fontSize: '32px' }} />
                                        )}
                                    </div>
                                    <p className="text">
                                        {user.name} {user.surname}
                                    </p>
                                </div>
                                <div className="grid-item-r">
                                    <div className="user-status">
                                        <span
                                            className={`status-dot ${user.status ? 'status-online' : 'status-offline'}`}
                                        ></span>
                                            {user.status ? 'Online' : 'Offline'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;