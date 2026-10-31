import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Zap, ShieldCheck } from 'lucide-react';

export default function ParkingMap({
  spaces = [],
  selectedSpotId = null,
  onSelectSpot,
  onBookSpot
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  // Fix Leaflet's default icon path issues with bundlers
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
    });
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const defaultCenter = [12.9716, 77.5946];
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear previous markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    if (!spaces || spaces.length === 0) return;

    const bounds = L.latLngBounds();

    spaces.forEach((spot) => {
      const lat = spot.latitude || 12.9716;
      const lng = spot.longitude || 77.5946;
      bounds.extend([lat, lng]);

      const isSelected = selectedSpotId === spot.id;

      // Custom HTML Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background: ${isSelected ? '#0284c7' : '#0f172a'};
            color: #ffffff;
            padding: 4px 8px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            border: 2px solid #ffffff;
            cursor: pointer;
            transform: scale(${isSelected ? '1.15' : '1.0'});
            transition: all 0.2s ease;
            white-space: nowrap;
          ">
            <span>🅿️</span>
            <span>₹${spot.pricePerHour.toFixed(2)}/h</span>
          </div>
        `,
        iconSize: [80, 32],
        iconAnchor: [40, 16]
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      // Popup Content
      const popupHtml = `
        <div style="font-family: inherit; width: 220px; padding: 2px;">
          <div style="position: relative; border-radius: 10px; overflow: hidden; margin-bottom: 8px;">
            <img src="${spot.image}" alt="${spot.name}" style="width: 100%; height: 90px; object-fit: cover;" />
            <span style="position: absolute; bottom: 6px; right: 6px; background: rgba(15,23,42,0.8); color: white; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 6px;">
              ★ ${spot.rating}
            </span>
          </div>
          <h4 style="margin: 0 0 2px 0; font-size: 13px; font-weight: 700; color: #0f172a; line-height: 1.2;">
            ${spot.name}
          </h4>
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748b;">
            ${spot.location}
          </p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 11px;">
            <span style="color: #0284c7; font-weight: 700;">₹${spot.pricePerHour.toFixed(2)} / hour</span>
            <span style="color: #059669; font-weight: 600;">${spot.availableSpaces} spots left</span>
          </div>
          <button id="book-btn-${spot.id}" style="
            width: 100%;
            background: #0284c7;
            color: white;
            border: none;
            padding: 6px 10px;
            border-radius: 8px;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.15s;
          ">
            Book Spot Now
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 260 });

      marker.on('popupopen', () => {
        const bookBtn = document.getElementById(`book-btn-${spot.id}`);
        if (bookBtn) {
          bookBtn.onclick = () => {
            if (onBookSpot) onBookSpot(spot);
          };
        }
      });

      marker.on('click', () => {
        if (onSelectSpot) onSelectSpot(spot);
      });

      markersRef.current[spot.id] = marker;
    });

    if (spaces.length > 0 && !selectedSpotId) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    }

    return () => {
      // Map stays initialized across small state re-renders
    };
  }, [spaces, selectedSpotId, onBookSpot, onSelectSpot]);

  // Handle selected spot zooming
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedSpotId) return;

    const marker = markersRef.current[selectedSpotId];
    if (marker) {
      const spot = spaces.find((s) => s.id === selectedSpotId);
      if (spot) {
        mapInstanceRef.current.flyTo(
          [spot.latitude || 12.9716, spot.longitude || 77.5946],
          15,
          { duration: 1.2 }
        );
        marker.openPopup();
      }
    }
  }, [selectedSpotId, spaces]);

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
      {/* Map Target */}
      <div ref={mapContainerRef} className="w-full h-full min-h-[420px]" />

      {/* Floating Map Legend */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-lg border border-slate-200 text-[11px] flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-semibold text-slate-700">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block" />
          <span>Active Hubs ({spaces.length})</span>
        </div>
        <span className="text-slate-300">|</span>
        <div className="flex items-center gap-1 text-slate-500">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>EV Ready</span>
        </div>
        <span className="text-slate-300">|</span>
        <div className="flex items-center gap-1 text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>CCTV Monitored</span>
        </div>
      </div>
    </div>
  );
}
