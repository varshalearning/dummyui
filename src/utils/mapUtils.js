export const initializeMap = (mapElement) => {
  const L = window.L;
  if (!L) {
    console.warn('Leaflet not loaded. Please include Leaflet CSS and JS in your HTML.');
    return null;
  }

  // Create map with custom options
  const map = L.map(mapElement, {
    center: [17.3850, 78.4867], // Hyderabad coordinates
    zoom: 13,
    zoomControl: true, // Enable default zoom control
    attributionControl: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    touchZoom: true,
    boxZoom: true,
    keyboard: true
  });

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
    minZoom: 3
  }).addTo(map);

  // Position zoom control
  map.zoomControl.setPosition('topright');

  // Add search control (if Leaflet.Control.Search is available)
  if (L.Control.Search) {
    const searchControl = new L.Control.Search({
      position: 'topleft',
      layer: null, // Will be set when markers are added
      propertyName: 'name',
      marker: false,
      moveToLocation: function(latlng, title, map) {
        map.setView(latlng, 16);
      }
    });
    map.addControl(searchControl);
  }

  // Add sample device markers
  const markers = addDeviceMarkers(map);

  // If search control exists, add markers to search
  if (L.Control.Search && map.searchControl) {
    map.searchControl.options.layer = markers;
  }

  return map;
};

export const addDeviceMarkers = (map) => {
  const L = window.L;
  if (!L || !map) return null;

  const devices = [
    { 
      lat: 17.3850, 
      lng: 78.4867, 
      name: 'Device Alpha', 
      status: 'online',
      location: 'Building A',
      lastSeen: '2 min ago'
    },
    { 
      lat: 17.4065, 
      lng: 78.4772, 
      name: 'Device Beta', 
      status: 'offline',
      location: 'Building B',
      lastSeen: '1 hour ago'
    },
    { 
      lat: 17.3616, 
      lng: 78.4747, 
      name: 'Device Gamma', 
      status: 'online',
      location: 'Building C',
      lastSeen: 'Just now'
    },
    { 
      lat: 17.4126, 
      lng: 78.4957, 
      name: 'Device Delta', 
      status: 'warning',
      location: 'Building A',
      lastSeen: '5 min ago'
    },
  ];

  const markersLayer = L.layerGroup();

  devices.forEach(device => {
    const icon = getStatusIcon(device.status);
    
    const customIcon = L.divIcon({
      html: `<div class="device-marker ${device.status}">${icon}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15],
      className: 'custom-marker-container'
    });

    const marker = L.marker([device.lat, device.lng], { 
      icon: customIcon,
      title: device.name
    });

    // Add device data to marker for search functionality
    marker.name = device.name;
    marker.device = device;

    // Create popup content
    const popupContent = `
      <div class="device-popup">
        <div class="popup-header">
          <h4>${device.name}</h4>
          <span class="status-badge ${device.status}">${device.status}</span>
        </div>
        <div class="popup-content">
          <p><strong>Location:</strong> ${device.location}</p>
          <p><strong>Last Seen:</strong> ${device.lastSeen}</p>
          <div class="popup-actions">
            <button class="popup-btn primary">View Details</button>
            <button class="popup-btn secondary">Settings</button>
          </div>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent, {
      maxWidth: 250,
      className: 'custom-popup'
    });

    markersLayer.addLayer(marker);
  });

  markersLayer.addTo(map);
  return markersLayer;
};

export const getStatusIcon = (status) => {
  switch (status) {
    case 'online': return '🟢';
    case 'offline': return '🔴';
    case 'warning': return '🟡';
    default: return '⚫';
  }
};

export const resizeMap = (map) => {
  if (map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }
};

// Map event handlers
export const handleMapEvents = (map) => {
  if (!map) return;

  map.on('click', (e) => {
    console.log('Map clicked at:', e.latlng);
  });

  map.on('zoomend', (e) => {
    console.log('Zoom level:', map.getZoom());
  });

  map.on('moveend', (e) => {
    console.log('Map center:', map.getCenter());
  });
};

