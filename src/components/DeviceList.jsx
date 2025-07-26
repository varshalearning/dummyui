import React, { useRef, useCallback, useState, useEffect } from 'react';
import '../styles/DeviceList.css';

const DeviceList = ({ listOpen, listHeight, onToggle, onResize, sidebarOpen }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const startY = useRef(0);
  const startHeight = useRef(0);
  const rafRef = useRef(null);
  const itemsPerPage = 10;

  const allDevices = [
    { id: 1, name: 'Device Alpha', status: 'online', location: 'Building A', lastSeen: '2 min ago' },
    { id: 2, name: 'Device Beta', status: 'offline', location: 'Building B', lastSeen: '1 hour ago' },
    { id: 3, name: 'Device Gamma', status: 'online', location: 'Building C', lastSeen: 'Just now' },
    { id: 4, name: 'Device Delta', status: 'warning', location: 'Building A', lastSeen: '5 min ago' },
    { id: 5, name: 'Device Epsilon', status: 'online', location: 'Building D', lastSeen: '30 sec ago' },
    { id: 6, name: 'Device Zeta', status: 'offline', location: 'Building E', lastSeen: '3 hours ago' },
    { id: 7, name: 'Device Eta', status: 'online', location: 'Building F', lastSeen: '1 min ago' },
    { id: 8, name: 'Device Theta', status: 'warning', location: 'Building G', lastSeen: '10 min ago' },
    { id: 9, name: 'Device Iota', status: 'online', location: 'Building H', lastSeen: '45 sec ago' },
    { id: 10, name: 'Device Kappa', status: 'offline', location: 'Building I', lastSeen: '2 hours ago' },
    { id: 11, name: 'Device Lambda', status: 'online', location: 'Building J', lastSeen: '30 sec ago' },
    { id: 12, name: 'Device Mu', status: 'warning', location: 'Building K', lastSeen: '15 min ago' },
  ];

  const totalPages = Math.ceil(allDevices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const devices = allDevices.slice(startIndex, startIndex + itemsPerPage);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();

    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Schedule the resize with throttling
    rafRef.current = requestAnimationFrame(() => {
      const deltaY = startY.current - e.clientY;
      const newHeight = Math.max(100, startHeight.current + deltaY); // Minimum height of 100px
      onResize(newHeight);
    });
  }, [isDragging, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'ns-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    startY.current = e.clientY;
    startHeight.current = listHeight;
  }, [listHeight]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return '🟢';
      case 'offline': return '🔴';
      case 'warning': return '🟡';
      default: return '⚫';
    }
  };

  // Collapsed state - show expand button aligned to map center
  if (!listOpen) {
    return (
      <div 
        className={`device-list-collapsed ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
      >
        <button 
          className="expand-button"
          onClick={onToggle}
          aria-label="Show device list"
        >
          <span className="expand-icon">▲</span>
          <span className="expand-text">Device List ({allDevices.length})</span>
        </button>
      </div>
    );
  }

  return (
    <div 
      className="device-list open"
      style={{ height: `${listHeight}px` }}
    >
      <div 
        className={`resize-handle ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
      >
        <div className="resize-indicator"></div>
      </div>
      
      <div className="device-list-header">
        <h3>Device List ({allDevices.length})</h3>
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn" 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            <span className="pagination-info">{currentPage} / {totalPages}</span>
            <button 
              className="pagination-btn" 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        )}
        <button 
          className="toggle-button"
          onClick={onToggle}
          aria-label="Hide device list"
        >
          ▼
        </button>
      </div>

      <div className="device-list-content">
        <div className="device-list-scroll">
          {devices.map(device => (
            <div key={device.id} className="device-card">
              <div className="device-status">
                {getStatusIcon(device.status)}
              </div>
              <div className="device-info">
                <h4>{device.name}</h4>
                <p className="device-location">{device.location}</p>
                <p className="device-last-seen">Last seen: {device.lastSeen}</p>
              </div>
              <div className="device-actions">
                <button className="action-btn">⚙️</button>
                <button className="action-btn">📊</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceList;