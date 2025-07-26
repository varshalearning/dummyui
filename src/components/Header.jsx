import React from 'react';
import { FiMenu, FiMoon, FiSun } from 'react-icons/fi';
import UserMenu from './UserMenu';
import '../styles/Header.css';

const Header = ({ isSidebarOpen, toggleSidebar, toggleTheme, isDarkMode, user, onLogout }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={toggleSidebar}>
          <FiMenu size={20} />
        </button>
        <h1 className="header-title gradient-text">WeighLink</h1>
      </div>
      <div className="header-right">
        <button className="theme-button" onClick={toggleTheme}>
          {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
        <UserMenu user={user} onLogout={onLogout} />
      </div>
    </header>
  );
};

export default Header;