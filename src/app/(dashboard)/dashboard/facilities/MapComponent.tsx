'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation } from 'lucide-react';

// --- CUSTOM ICONS ---
// 🌟 PERBAIKAN MOBILE: Ukuran ikon peta diperkecil sedikit agar tidak menutupi jalanan saat dibuka di HP
const createCustomIcon = (bgColor: string, svgPath: string) => {
  return L.divIcon({
    html: `
      <div style="background-color: ${bgColor}; width: 28px; height: 28px; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          ${svgPath}
        </svg>
      </div>
    `,
    className: 'custom-leaflet-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
};

const userSvg = '<polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>';
const rsSvg = '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path>';
const klinikSvg = '<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>';
const apotekSvg = '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path><path d="m8.5 8.5 7 7"></path>';

const userIcon = createCustomIcon('#4F46E5', userSvg);
const rsIcon = createCustomIcon('#E11D48', rsSvg); 
const klinikIcon = createCustomIcon('#06b6d4', klinikSvg);
const apotekIcon = createCustomIcon('#10b981', apotekSvg);

// --- KOMPONEN: AUTO CENTER PETA ---
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    // 🌟 PERBAIKAN: Zoom otomatis sedikit dijauhkan (14) agar area yang terlihat di HP lebih luas
    map.flyTo(center, 14, { animate: true, duration: 1.5 });
    const timeout = setTimeout(() => { map.invalidateSize(); }, 400);
    return () => clearTimeout(timeout);
  }, [center, map]);
  return null;
}

// --- KOMPONEN: KLIK PETA ---
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapComponent({ 
  currentLocation,
  mapCenter,
  facilities,
  routePolyline,
  onMapClick,
  onSelectFacility
}: { 
  currentLocation: any,
  mapCenter: any,
  facilities: any[],
  routePolyline: [number, number][],
  onMapClick: (lat: number, lng: number) => void,
  onSelectFacility: (facility: any) => void
}) {
  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <MapContainer 
        center={[mapCenter.lat, mapCenter.lng]} 
        zoom={14} 
        style={{ width: '100%', height: '100%', zIndex: 0, cursor: 'crosshair' }} 
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        
        {routePolyline && routePolyline.length > 0 && (
          <>
            {/* 🌟 PERBAIKAN MOBILE: Garis polyline dikecilkan sedikit agar rute terlihat lebih halus di layar HP */}
            <Polyline positions={routePolyline} color="#6366F1" weight={6} opacity={0.3} lineCap="round" lineJoin="round" />
            <Polyline positions={routePolyline} color="#4F46E5" weight={4} opacity={0.9} lineCap="round" lineJoin="round" />
          </>
        )}

        <MapUpdater center={[mapCenter.lat, mapCenter.lng]} />
        <MapClickHandler onMapClick={onMapClick} />

        <Marker position={[currentLocation.lat, currentLocation.lng]} icon={userIcon}>
          <Popup className="font-sans font-bold text-xs">Titik Awal</Popup>
        </Marker>

        {facilities.map((facility) => {
          let icon = klinikIcon;
          if (facility.category === 'Rumah Sakit') icon = rsIcon;
          if (facility.category === 'Apotek') icon = apotekIcon;

          return (
            <Marker key={facility.id} position={[facility.lat, facility.lon]} icon={icon}>
              {/* 🌟 PERBAIKAN MOBILE: Popup diatur lebar maksimalnya (max-w-[200px]) agar rapi di HP */}
              <Popup className="font-sans rounded-xl max-w-[200px]">
                <div className="flex flex-col gap-1 w-full p-0.5">
                  <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider">{facility.category}</span>
                  <span className="font-bold text-slate-800 text-[12px] leading-snug mb-2">{facility.name}</span>
                  
                  <button
                    onClick={() => onSelectFacility(facility)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Navigation className="w-3 h-3 fill-white rotate-45" />
                    Cari Jalan
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
}