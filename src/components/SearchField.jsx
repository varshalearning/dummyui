import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

const SearchField = () => {
  const map = useMap();
  
  useEffect(() => {
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
      position: 'topright',
      placeholder: 'Search location...',
      expand: 'touch', // Always show expanded on desktop
      collapsed: false, // Start expanded
      geocoder: new L.Control.Geocoder.Nominatim(),
      showResultIcons: true,
      suggestMinLength: 3,
      suggestTimeout: 250,
      queryMinLength: 3
    }).on('markgeocode', function(e) {
      const { center } = e.geocode;
      map.setView(center, 13);
    });

    map.addControl(geocoder);
    return () => map.removeControl(geocoder);
  }, [map]);

  return null;
};

export default SearchField;