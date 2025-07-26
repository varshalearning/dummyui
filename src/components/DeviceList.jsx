import React, { useRef, useCallback, useState, useEffect } from 'react';
import '../styles/DeviceList.css';

const DeviceList = ({ isOpen, height, onToggle, onResize, sidebarOpen }) => {
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const devices = [
    { id: 1, name: 'Device Alpha', status: 'online', location: 'Building A', lastSeen: '2 min ago' },
    { id: 2, name: 'Device Beta', status: 'offline', location: 'Building B', lastSeen: '1 hour ago' },
    { id: 3, name: 'Device Gamma', status: 'online', location: 'Building C', lastSeen: 'Just now' },
    { id: 4, name: 'Device Delta', status: 'warning', location: 'Building A', lastSeen: '5 min ago' },
    { id: 5, name: 'Device Epsilon', status: 'online', location: 'Building D', lastSeen: '30 sec ago' },
  ];

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaY = startY.current - e.clientY;
    const newHeight = startHeight.current + deltaY;
    // Use requestAnimationFrame for smooth resizing
    requestAnimationFrame(() => {
      onResize(newHeight);
    });
  }, [isDragging, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'ns-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    startY.current = e.clientY;
    startHeight.current = height;
  }, [height]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return '🟢';
      case 'offline': return '🔴';
      case 'warning': return '🟡';
      default: return '⚫';
    }
  };

  // Collapsed state - show expand button aligned to map center
  if (!isOpen) {
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
          <span className="expand-text">Device List ({devices.length})</span>
        </button>
      </div>
    );
  }

  return (
    <div 
      className="device-list open"
      style={{ height: `${height}px` }}
    >
      <div 
        className={`resize-handle ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleMouseDown}
      >
        <div className="resize-indicator"></div>
      </div>
      
      <div className="device-list-header">
        <h3>Device List ({devices.length})</h3>
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
