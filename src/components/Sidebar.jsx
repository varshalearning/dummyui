import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h2>Tools</h2>
        </div>
        <div className="sidebar-sections">
          <div className="tool-section">
            <h3>Device Management</h3>
            <button className="tool-btn primary">
              <span className="tool-icon">➕</span>
              Device Onboarding
            </button>
            <button className="tool-btn danger">
              <span className="tool-icon">➖</span>
              Device Offboarding
            </button>
          </div>
          
          <div className="tool-section">
            <h3>User Management</h3>
            <button className="tool-btn primary">
              <span className="tool-icon">👤</span>
              Add User
            </button>
            <button className="tool-btn secondary">
              <span className="tool-icon">⚙️</span>
              Manage Users
            </button>
          </div>
          
          <div className="tool-section">
            <h3>Analytics</h3>
            <button className="tool-btn secondary">
              <span className="tool-icon">📊</span>
              View Analytics
            </button>
            <button className="tool-btn secondary">
              <span className="tool-icon">📈</span>
              Generate Reports
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
