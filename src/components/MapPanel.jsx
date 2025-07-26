import React, { useEffect, useRef } from 'react';
import { initializeMap, resizeMap } from '../utils/mapUtils';
import '../styles/MapPanel.css';

const MapPanel = ({ listOpen, listHeight }) => {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);

  useEffect(() => {
    // Initialize map on first render
    if (mapRef.current && !leafletMapRef.current) {
      leafletMapRef.current = initializeMap(mapRef.current);
    }
  }, []);

  useEffect(() => {
    // Resize map when panel dimensions change
    if (leafletMapRef.current) {
      resizeMap(leafletMapRef.current);
    }
  }, [listOpen, listHeight]);

  const mapHeight = listOpen ? `calc(100% - ${listHeight}px - 16px)` : '100%';

  return (
    <div 
      className="map-panel"
      style={{ height: mapHeight }}
    >
      <div className="map-container">
        <div 
          ref={mapRef}
          className="leaflet-map"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default MapPanel;