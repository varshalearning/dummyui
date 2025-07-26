import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MapPanel from './components/MapPanel';
import DeviceList from './components/DeviceList';
import { ThemeProvider } from './context/ThemeContext';
import './styles/App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [listOpen, setListOpen] = useState(true);
  const [listHeight, setListHeight] = useState(300);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const toggleList = useCallback(() => {
    setListOpen(prev => !prev);
  }, []);

  const handleListResize = useCallback((newHeight) => {
    setListHeight(Math.max(200, Math.min(500, newHeight)));
  }, []);

  return (
    <ThemeProvider>
      <div className="app">
        <Header onToggleSidebar={toggleSidebar} />
        <div className="main-content">
          <Sidebar isOpen={sidebarOpen} />
          <div className={`content-area ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <MapPanel 
              listOpen={listOpen} 
              listHeight={listHeight}
            />
            <DeviceList 
              isOpen={listOpen}
              height={listHeight}
              sidebarOpen={sidebarOpen}
              onToggle={toggleList}
              onResize={handleListResize}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
