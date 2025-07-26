import React, { useState } from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const [activeSection, setActiveSection] = useState('navigation');

  const sections = [
    {
      id: 'navigation',
      title: 'Navigation',
      items: ['Dashboard', 'Devices', 'Analytics', 'Reports']
    },
    {
      id: 'actions',
      title: 'Actions',
      items: ['Add Device', 'Bulk Import', 'Export Data', 'Sync All']
    },
    {
      id: 'filters',
      title: 'Filters',
      items: ['By Status', 'By Location', 'By Type', 'Custom Filter']
    },
    {
      id: 'analytics',
      title: 'Analytics',
      items: ['Real-time Data', 'Historical', 'Predictions', 'Alerts']
    },
    {
      id: 'settings',
      title: 'Settings',
      items: ['Preferences', 'Notifications', 'Security', 'API Keys']
    }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h2>Control Panel</h2>
        </div>
        <div className="sidebar-sections">
          {sections.map(section => (
            <div key={section.id} className="section">
              <button 
                className={`section-header ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              >
                <span>{section.title}</span>
                <span className={`arrow ${activeSection === section.id ? 'expanded' : ''}`}>
                  ▼
                </span>
              </button>
              <div className={`section-content ${activeSection === section.id ? 'expanded' : ''}`}>
                {section.items.map(item => (
                  <button key={item} className="section-item">
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
