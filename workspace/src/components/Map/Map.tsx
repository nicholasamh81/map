import React, { useEffect } from 'react';
import L from 'leaflet';
import useWorkspaceStore from '@/store/workspaceStore';
import './Map.css';

const Map: React.FC = () => {
  const { markers, isDarkMode } = useWorkspaceStore();
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstanceRef = React.useRef<L.Map | null>(null);
  const markersRef = React.useRef<Map<string, L.Marker>>(new Map());

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([20, 0], 2);

    // Add tile layer
    const tileUrl = isDarkMode
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  // Update markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove old markers
    markersRef.current.forEach((marker) => {
      map.removeLayer(marker);
    });
    markersRef.current.clear();

    // Add new markers
    markers.forEach((marker) => {
      const leafletMarker = L.marker([marker.latitude, marker.longitude])
        .bindPopup(`<strong>${marker.title}</strong>`)
        .addTo(map);

      markersRef.current.set(marker.id, leafletMarker);
    });
  }, [markers]);

  // Update theme
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Update tile layer on theme change
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const tileUrl = isDarkMode
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);
  }, [isDarkMode]);

  return <div ref={mapRef} className="map-container" />;
};

export default Map;
