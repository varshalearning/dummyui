import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import SearchField from './SearchField';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { initializeMap, resizeMap } from '../utils/mapUtils';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import '../styles/MapPanel.css';

const MapPanel = ({ listOpen, listHeight }) => {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const [map, setMap] = useState(null);

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

  useEffect(() => {
    if (!map) return;

    // Create search provider
    const provider = new OpenStreetMapProvider();

    // Create search control
    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      showMarker: false, // Disable marker on search
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: false,
      searchLabel: 'Search location...'
    });

    map.addControl(searchControl);

    // Cleanup
    return () => {
      map.removeControl(searchControl);
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
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            updateWhenZooming={false}
            updateWhenIdle={true}
          />
          <SearchField />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPanel;