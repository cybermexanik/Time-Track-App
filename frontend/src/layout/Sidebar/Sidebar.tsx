import { FC, useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserOutlined, LoadingOutlined, WarningOutlined, LoginOutlined } from '@ant-design/icons';
import { navigationLinks } from '../../data/data';
import "./Sidebar.css";
import { SidebarContext } from '../../context/sidebarContext';
import React from 'react';

const Sidebar: FC = () => {
    const [sidebarClass, setSidebarClass] = useState("");
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { isSidebarOpen } = useContext(SidebarContext) as { isSidebarOpen: boolean }; 
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setSidebarClass(isSidebarOpen ? 'sidebar-change' : '');
    }, [isSidebarOpen]);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    console.warn("Auth token not found.");
                    setIsLoading(false); 
                    setUserData(null); 
                    return;
                }

                const response = await fetch('http://localhost:3000/api/user/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    if (response.status === 401) {
                        console.error('Unauthorized access. Token might be invalid or expired.', errorText);
                        localStorage.removeItem('authToken');
                        setError("Ошибка аутентификации. Попробуйте войти снова.");
                    } else {
                        console.error(`Network error: ${response.status} ${response.statusText}. ${errorText}`);
                        throw new Error(`Ошибка сети: ${response.status}. ${errorText}`);
                    }
                    setUserData(null);
                    setIsLoading(false);
                    return; 
                }

                const data: UserData = await response.json();
                console.log("User data received in Sidebar:", data); 
                setUserData(data);

            } catch (err) {
                console.error("Ошибка при загрузке данных пользователя:", err);
                setError(err instanceof Error ? err.message : "Неизвестная ошибка загрузки данных");
                setUserData(null); 
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []); 

    const handleLogout = () => {
        console.log('Logging out...');
        localStorage.removeItem('authToken');
        setUserData(null);
        setError(null);
        navigate('/auth'); 
    };

    const renderUserInfo = () => {
        if (isLoading) {
            return (
                <div className="user-info loading-state">
                    <LoadingOutlined className="user-info-icon" spin />
                    <span className="info-text">Загрузка...</span>
                </div>
            );
        }

        if (error) {
            return (
                 <div className="user-info error-state">
                     <WarningOutlined className="user-info-icon error-icon" />
                     <span className="info-text error-text" title={error}>Ошибка</span>
                 </div>
             );
        }

        if (userData) {
            const fullName = `${userData.name || ''} ${userData.surname || ''}`.trim() || 'Пользователь';
            const roleName = userData.role ? userData.role.role_name : 'Роль не указана';

            return (
                <div className="user-info logged-in">
                    <div className="user-avatar-container">
                        {userData.avatarUrl ? (
                            <img
                                src={userData.avatarUrl}
                                alt="profile avatar"
                                className="user-avatar-image"
                            />
                        ) : (
                            <div className="user-avatar-placeholder">
                                <UserOutlined />
                            </div>
                        )}
                    </div>
                    <div className="user-details">
                        <span className="user-name" title={fullName}>{fullName}</span>
                        <span className="user-role" title={roleName}>{roleName}</span>
                    </div>
                 </div>
            );
        }
         return (
            <Link to="/auth" className="user-info logged-out" title="Войти">
                 <div className="user-avatar-placeholder guest">
                      <LoginOutlined />
                 </div>
                 <div className="user-details">
                     <span className="user-name">Гость</span>
                      <span className="user-role">Войдите в систему</span>
                 </div>
            </Link>
        );
    };

    return (
        <div className={`sidebar ${sidebarClass}`}>
            <div className="profile-section">
                {renderUserInfo()}
            </div>

            <nav className="navigation">
                <ul className="nav-list">
                    {navigationLinks
                        .filter(link => link.title !== 'Выйти' || !!userData)
                        .map((navigationLink) => (
                            <li className="nav-item" key={navigationLink.id}>
                                {navigationLink.title === 'Выйти' ? (
                                    <button
                                        className="nav-link logout-button"
                                        onClick={handleLogout}
                                        disabled={isLoading}
                                    >
                                        <img src={navigationLink.image} className="nav-link-icon" alt={navigationLink.title} />
                                        <span className="nav-link-text">{navigationLink.title}</span>
                                    </button>
                                ) : (
                                    <Link
                                        to={navigationLink.path}
                                        className={`nav-link ${location.pathname === navigationLink.path ? 'active' : ''}`}
                                    >
                                        <img src={navigationLink.image} className="nav-link-icon" alt={navigationLink.title} />
                                        <span className="nav-link-text">{navigationLink.title}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;