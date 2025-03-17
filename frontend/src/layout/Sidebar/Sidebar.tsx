import { FC, useEffect, useState } from 'react';
import { personsImgs } from '../../utils/images';
import { navigationLinks } from '../../data/data';
import "./Sidebar.css";
import { useContext } from 'react';
import { SidebarContext } from '../../context/sidebarContext';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Sidebar: FC = () => {
  const [activeLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext) as { isSidebarOpen: boolean };
  const location = useLocation();
  const navigate = useNavigate();

  const isAuth = true;

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <div className={ `sidebar ${sidebarClass}` }>
      <div className="user-info">
          <div className="info-img img-fit-cover">
              <img src={ personsImgs.person_two } alt="profile image" />
          </div>
          <span className="info-name">Иван Иванов</span>
      </div>

      <nav className="navigation">
          <ul className="nav-list">
          {navigationLinks.map((navigationLink) => (
            <li className="nav-item" key={navigationLink.id}>
              {navigationLink.title === 'Выйти' ? (
                <button 
                  className="nav-link"
                  onClick={handleLogout}
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
  )
}

export default Sidebar
