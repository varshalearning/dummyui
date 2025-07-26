import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import SearchField from './SearchField';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import '../styles/MapPanel.css';

const DynamicTileLayer = () => {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <TileLayer
      attribution={isDark ? '&copy; <a href="https://carto.com/">CARTO</a>' : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}
      url={isDark ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
      updateWhenZooming={false}
      updateWhenIdle={true}
    />
  );
};

// Component to handle map resize
const MapResizer = ({ listOpen, listHeight, sidebarOpen }) => {
  const map = useMap();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [map, listOpen, listHeight, sidebarOpen]);
  
  return null;
};

const MapPanel = ({ listOpen, listHeight, sidebarOpen }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!map) return;

    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: false,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: false,
      searchLabel: 'Search location...'
    });

    map.addControl(searchControl);

    return () => {
      if (map && searchControl) {
        map.removeControl(searchControl);
      }
    };
  }, [map]);

  const mapHeight = listOpen ? `calc(100% - ${listHeight}px - 16px)` : '100%';

  return (
    <div 
      className="map-panel"
      style={{ height: mapHeight }}
    >
      <div className="map-container">
        <MapContainer
          className="leaflet-map"
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomAnimation={true}
          fadeAnimation={true}
        >
          <DynamicTileLayer />
          <MapResizer listOpen={listOpen} listHeight={listHeight} sidebarOpen={sidebarOpen} />
          <SearchField />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPanel;