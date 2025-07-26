import React from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/Header.css';

const Header = ({ onToggleSidebar }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="menu-button"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>
        <nav className="breadcrumb">
          <span>Dashboard</span>
          <span className="separator">/</span>
          <span>Device Management</span>
        </nav>
      </div>
      <div className="header-right">
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        <div className="user-profile">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
            alt="User avatar"
            className="avatar"
          />
          <span className="user-name">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;