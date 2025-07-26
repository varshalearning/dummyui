import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapPanel from './components/MapPanel';
import DeviceList from './components/DeviceList';
import Login from './components/Login';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [deviceListHeight, setDeviceListHeight] = useState(300);
  const [isDeviceListOpen, setIsDeviceListOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const toggleDeviceList = () => {
    setIsDeviceListOpen(!isDeviceListOpen);
  };

  const handleDeviceListResize = (newHeight) => {
    setDeviceListHeight(newHeight);
  };

  if (!isLoggedIn) {
    return (
      <ErrorBoundary>
        <Login onLogin={handleLogin} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="app">
      <Header 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        user={user}
        onLogout={handleLogout}
      />
      <div className="main-content">
        <Sidebar isOpen={isSidebarOpen} />
        <div className={`content-area ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <MapPanel listOpen={isDeviceListOpen} listHeight={deviceListHeight} sidebarOpen={isSidebarOpen} />
          <DeviceList 
            listOpen={isDeviceListOpen}
            listHeight={deviceListHeight}
            onToggle={toggleDeviceList}
            onResize={handleDeviceListResize}
            sidebarOpen={isSidebarOpen}
          />
        </div>
      </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
