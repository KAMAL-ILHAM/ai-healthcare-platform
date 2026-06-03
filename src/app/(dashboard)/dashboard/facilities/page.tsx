'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Search, Phone, 
  Building2, Star, ShieldAlert, X, ChevronRight,
  Navigation, Activity, ArrowRight, Home, Loader2, Bot, AlertTriangle, Car
} from 'lucide-react';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10">
      <div className="p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-indigo-100 shadow-lg flex flex-col items-center text-center">
        <MapPin className="w-10 h-10 text-indigo-500 mb-3 animate-bounce" />
        <h3 className="font-bold text-slate-800 mb-1">Memuat Peta Interaktif...</h3>
        <p className="text-sm text-slate-500">Menghubungkan ke satelit OpenStreetMap</p>
      </div>
    </div>
  ),
});

const categories = ['Semua', 'Rumah Sakit', 'Klinik', 'Apotek'];

const emergencyContacts = [
  { id: 1, name: 'Ambulans Nasional', number: '119' },
  { id: 2, name: 'RSUD A.W. Sjahranie', number: '0541-738118' },
  { id: 3, name: 'RS Samarinda Medika', number: '0541-7273000' },
  { id: 4, name: 'RS Dirgahayu', number: '0541-731333' },
  { id: 5, name: 'RS Hermina Samarinda', number: '0541-2082525' },
  { id: 6, name: 'PMI Samarinda', number: '0541-731662' },
];

interface Facility {
  id: number;
  name: string;
  category: string;
  lat: number;
  lon: number;
  distance: string;
  address: string;
}

interface Location {
  lat: number;
  lng: number;
}

interface RouteInfo {
  duration: string;
  distance: string;
}

const DEFAULT_LOCATION: Location = { lat: -0.5022, lng: 117.1536 };

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
}

function formatDuration(seconds: number): string {
  if (!seconds) return '0 mnt';
  const mins = Math.ceil(seconds / 60);
  if (mins < 60) return `${mins} mnt`;
  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hrs} jam ${remainingMins > 0 ? remainingMins + ' mnt' : ''}`;
}

export default function FacilitiesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [currentLocation, setCurrentLocation] = useState<Location>(DEFAULT_LOCATION); 
  const [mapCenter, setMapCenter] = useState<Location>(DEFAULT_LOCATION); 
  
  const [routePolyline, setRoutePolyline] = useState<[number, number][]>([]); 
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAllFacilitiesModalOpen, setIsAllFacilitiesModalOpen] = useState(false);

  const handleLocateMe = useCallback(() => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
          setCurrentLocation(loc);
          setMapCenter(loc); 
          setSearchQuery('');
          setSelectedFacilityId(null);
          setRoutePolyline([]); 
          setRouteInfo(null);
          setIsLocating(false);
        },
        (error) => {
          console.warn("GPS ditolak/gagal.", error);
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
    }
  }, []);

  useEffect(() => { handleLocateMe(); }, [handleLocateMe]);

  const fetchFacilities = useCallback(async (location: Location) => {
    setIsLoadingData(true);
    setApiError(null);
    try {
      const radius = 10000; 
      const query = `
        [out:json][timeout:15];
        nwr["amenity"~"^(hospital|clinic|pharmacy)$"](around:${radius},${location.lat},${location.lng});
        out center;
      `;

      const response = await fetch('/api/overpass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`
      });
      
      if (!response.ok) {
        if (response.status === 504) throw new Error("Server OSM sibuk (Timeout). Coba geser sedikit peta Anda.");
        throw new Error(`Server menolak permintaan (${response.status})`);
      }
      
      const data = await response.json();

      const parsedFacilities: Facility[] = data.elements
        .filter((el: any) => el.tags && el.tags.name)
        .map((el: any) => {
          const lat = el.lat || el.center?.lat;
          const lon = el.lon || el.center?.lon;
          const type = el.tags.amenity;
          
          let categoryName = 'Lainnya';
          if (type === 'hospital') categoryName = 'Rumah Sakit';
          else if (type === 'clinic') categoryName = 'Klinik';
          else if (type === 'pharmacy') categoryName = 'Apotek';

          return {
            id: el.id,
            name: el.tags.name,
            category: categoryName,
            lat: lat,
            lon: lon,
            distance: calculateDistance(location.lat, location.lng, lat, lon),
            address: el.tags['addr:street'] || el.tags['addr:full'] || 'Alamat tidak tersedia',
          };
        })
        .sort((a: Facility, b: Facility) => parseFloat(a.distance) - parseFloat(b.distance));

      setFacilities(parsedFacilities);
    } catch (error: any) {
      setApiError(error.message || "Gagal menghubungi satelit pencarian.");
      setFacilities([]);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => { fetchFacilities(currentLocation); }, [currentLocation, fetchFacilities]);

  // --- CORES: FUNGSI TRIGGER PENCARI JALAN RAYA ---
  const handleSelectFacility = useCallback((facility: Facility) => {
    setSelectedFacilityId(facility.id);
    setMapCenter({ lat: facility.lat, lng: facility.lon });
    
    // Hitung rute jalan raya real dari titik pin pencarian awal
    const fetchRouteLine = async (start: Location, end: Facility) => {
      try {
        setRouteInfo(null);
        const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lon},${end.lat}?overview=full&geometries=geojson`);
        const data = await res.json();
        
        if (data.routes && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
          setRoutePolyline(coords);
          
          setRouteInfo({
            duration: formatDuration(data.routes[0].duration),
            distance: (data.routes[0].distance / 1000).toFixed(1) + ' KM'
          });
        }
      } catch (err) {
        console.error("Gagal menggambar rute:", err);
      }
    };
    
    fetchRouteLine(currentLocation, facility);
  }, [currentLocation]);

  const handleSearchLocation = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearchingLocation(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`);
      const data = await res.json();
      
      if (data && data.length > 0) {
        const newLoc = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        setCurrentLocation(newLoc);
        setMapCenter(newLoc);
        setSelectedFacilityId(null);
        setRoutePolyline([]);
        setRouteInfo(null);
      } else {
        alert("Lokasi tidak ditemukan. Coba kata kunci lain.");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    } finally {
      setIsSearchingLocation(false);
    }
  };

  const filteredFacilities = activeCategory === 'Semua' ? facilities : facilities.filter(f => f.category === activeCategory);

  useEffect(() => {
    const globalElements = document.querySelectorAll('aside, nav, header, [class*="sidebar" i], [class*="navbar" i]');
    globalElements.forEach((el) => { (el as HTMLElement).style.setProperty('display', 'none', 'important'); });
    return () => { globalElements.forEach((el) => { (el as HTMLElement).style.display = ''; }); };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f8fafc] font-sans text-slate-800 flex flex-col overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.03), rgba(6,182,212,0.03))' }}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="absolute top-0 w-full p-4 md:p-6 flex items-center justify-between z-50 pointer-events-none">
        <div className="text-[14px] font-bold text-slate-700 pointer-events-auto bg-white/90 px-6 py-2.5 rounded-full backdrop-blur-md border border-slate-200/60 shadow-sm tracking-wide flex items-center gap-2">
          <Bot className="w-4 h-4 text-indigo-600" />
          FASKES
        </div>
        <button onClick={() => router.push('/dashboard')} className="pointer-events-auto flex items-center gap-2.5 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-slate-200/60 hover:border-indigo-300 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-full shadow-sm transition-all duration-200 text-[13px] font-semibold">
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 p-4 md:p-6 pt-20 md:pt-24 relative z-10 overflow-hidden">
        
        {/* KOLOM KIRI */}
        <div className="flex-1 flex flex-col gap-4 h-full min-w-0">
          <form onSubmit={handleSearchLocation} className="relative w-full shadow-sm rounded-xl bg-white border border-slate-200 focus-within:ring-2 ring-indigo-500/20 focus-within:border-indigo-400 transition-all shrink-0">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              {isSearchingLocation ? <Loader2 className="h-5 w-5 text-indigo-500 animate-spin" /> : <Search className="h-5 w-5 text-slate-400" />}
            </div>
            <input
              type="text" 
              placeholder="Ketik nama kota atau daerah (Contoh: Balikpapan)... lalu Enter"
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-transparent border-none text-[14px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
          </form>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 shrink-0">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap px-4 py-2 rounded-lg text-[13px] font-semibold transition-all shadow-sm border ${activeCategory === cat ? 'bg-slate-800 text-white border-transparent' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-600'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="flex-1 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden relative z-0">
             <MapComponent 
               currentLocation={currentLocation}
               mapCenter={mapCenter} 
               facilities={filteredFacilities} 
               routePolyline={routePolyline}
               onSelectFacility={handleSelectFacility} // Sambungkan aksi klik pin di map
               onMapClick={(lat, lng) => {
                 const newLoc = { lat, lng };
                 setCurrentLocation(newLoc);
                 setMapCenter(newLoc);
                 setSelectedFacilityId(null);
                 setRoutePolyline([]);
                 setRouteInfo(null);
                 setSearchQuery('');
               }}
             />
             <button
               onClick={handleLocateMe}
               disabled={isLocating}
               className="absolute bottom-6 right-4 z-[400] w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-100 hover:bg-slate-50 hover:text-indigo-600 transition-all text-slate-700 disabled:opacity-70"
               title="Kembali ke Lokasi Saya"
             >
               {isLocating ? <Loader2 className="w-5 h-5 animate-spin text-indigo-600" /> : <Navigation className="w-5 h-5" />}
             </button>
          </div>
        </div>

        {/* KOLOM KANAN */}
        <div className="w-full md:w-[380px] shrink-0 h-full flex flex-col gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-[#E11D48] to-[#BE123C] p-5 text-white shadow-md relative overflow-hidden shrink-0 border border-rose-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10 flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-sm">
                <ShieldAlert className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-[16px] font-bold tracking-tight mb-0.5">Panggilan Darurat</h2>
                <p className="text-rose-100 text-[12px] font-medium mb-3">Akses cepat siaga 24 Jam.</p>
                <button onClick={() => setIsEmergencyModalOpen(true)} className="bg-white text-rose-600 text-[12px] font-bold px-3 py-2 rounded-lg hover:bg-rose-50 hover:shadow-sm transition-all flex items-center justify-center gap-2 w-full">
                  <Phone className="w-3.5 h-3.5" /> Lihat Nomor Darurat
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden p-1">
            <div className="p-4 pb-2 shrink-0 border-b border-slate-100 mx-2 mb-2 flex justify-between items-center">
              <h3 className="font-bold text-[15px] text-slate-800">Fasilitas Terdekat</h3>
              {isLoadingData && <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />}
            </div>

            <div className="flex-1 overflow-y-auto px-3 space-y-2 scrollbar-thin scrollbar-thumb-slate-200 pb-2">
              {apiError && (
                <div className="text-center p-5 bg-rose-50 rounded-xl border border-rose-100 mt-2">
                  <AlertTriangle className="w-6 h-6 text-rose-500 mx-auto mb-2 opacity-80" />
                  <p className="text-[13px] text-rose-700 font-medium leading-relaxed">{apiError}</p>
                </div>
              )}

              {!isLoadingData && !apiError && filteredFacilities.length === 0 && (
                <div className="text-center p-6 text-sm text-slate-400">Tidak ada fasilitas ditemukan dalam radius 3 KM.</div>
              )}

              {filteredFacilities.slice(0, 5).map((facility) => (
                <div 
                  key={facility.id} 
                  onClick={() => handleSelectFacility(facility)}
                  className={`flex gap-3 items-center p-2 rounded-xl transition-all border cursor-pointer ${
                    selectedFacilityId === facility.id ? 'bg-indigo-50/70 border-indigo-200 shadow-sm' : 'hover:bg-slate-50 border-transparent hover:border-slate-200 bg-white/40'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                    {facility.category === 'Rumah Sakit' ? <Building2 className="w-5 h-5 text-indigo-500" /> : 
                     facility.category === 'Apotek' ? <Activity className="w-5 h-5 text-emerald-500" /> : 
                     <Bot className="w-5 h-5 text-cyan-500"/>}
                  </div>
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-bold text-slate-800 truncate">{facility.name}</h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] font-medium text-slate-500">
                        <span className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md border border-indigo-100">{facility.category}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {selectedFacilityId === facility.id && routeInfo ? routeInfo.distance : facility.distance + ' KM'}
                        </span>
                      </div>
                      {selectedFacilityId === facility.id && routeInfo && (
                        <div className="mt-2 flex items-center gap-1.5">
                          <span className="text-white bg-indigo-600 px-2 py-0.5 rounded md font-bold text-[10px] flex items-center gap-1 shadow-sm">
                            <Car className="w-3 h-3" /> {routeInfo.duration}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* IKON PANAH NAVIGASI DI SEBELAH KANAN CARD */}
                    <div className={`p-2 rounded-lg border transition-all ${
                      selectedFacilityId === facility.id 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20' 
                        : 'bg-slate-50 text-slate-400 border-slate-100 group-hover:text-indigo-600'
                    }`}>
                      <Navigation className={`w-4 h-4 transform rotate-45 ${selectedFacilityId === facility.id ? 'fill-white' : ''}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 pt-2 shrink-0 border-t border-slate-100">
              <button onClick={() => setIsAllFacilitiesModalOpen(true)} className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 hover:text-indigo-600 hover:bg-white hover:border-indigo-200 rounded-lg text-[13px] font-semibold transition-all shadow-sm">
                Lihat Semua Fasilitas <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL DARURAT --- */}
      <AnimatePresence>
        {isEmergencyModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEmergencyModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="w-full max-w-md bg-white rounded-2xl shadow-xl relative z-10 overflow-hidden border border-slate-200">
              <div className="bg-rose-50 border-b border-rose-100 p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-rose-200 text-rose-600 flex items-center justify-center shadow-sm"><Phone className="w-5 h-5" /></div>
                  <div><h3 className="font-bold text-[15px] text-slate-900">Nomor Darurat Samarinda</h3><p className="text-[12px] font-medium text-slate-600">Siaga 24 Jam</p></div>
                </div>
                <button onClick={() => setIsEmergencyModalOpen(false)} className="p-2 text-slate-400 hover:bg-rose-100 hover:text-rose-600 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2 bg-slate-50/50">
                {emergencyContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 hover:border-rose-200 hover:shadow-sm transition-all group">
                    <div><h4 className="text-[14px] font-bold text-slate-800">{contact.name}</h4><p className="text-[13px] font-semibold text-rose-600 mt-0.5">{contact.number}</p></div>
                    <a href={`tel:${contact.number}`} className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-all shadow-sm"><Phone className="w-4 h-4" /></a>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL DAFTAR SEMUA FASILITAS --- */}
      <AnimatePresence>
        {isAllFacilitiesModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAllFacilitiesModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="w-full max-w-[900px] h-[85vh] bg-white rounded-2xl shadow-xl relative z-10 flex flex-col border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-[16px] text-slate-800 tracking-tight">Data Fasilitas Real-Time</h3>
                  {isLoadingData && <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />}
                </div>
                <button onClick={() => setIsAllFacilitiesModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-5 shrink-0 bg-slate-50 border-b border-slate-200">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-[12px] font-semibold border ${activeCategory === cat ? 'bg-slate-800 text-white border-transparent shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}>{cat}</button>
                  ))}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-5 bg-slate-50 scrollbar-thin scrollbar-thumb-slate-200">
                
                {apiError && (
                  <div className="text-center p-5 bg-rose-50 rounded-xl border border-rose-100 mb-4">
                    <AlertTriangle className="w-6 h-6 text-rose-500 mx-auto mb-2 opacity-80" />
                    <p className="text-[13px] text-rose-700 font-medium leading-relaxed">{apiError}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredFacilities.map((facility) => (
                    <div 
                      key={facility.id} 
                      onClick={() => {
                        handleSelectFacility(facility);
                        setIsAllFacilitiesModalOpen(false); 
                      }}
                      className={`border rounded-xl overflow-hidden hover:shadow-md transition-all group flex flex-col p-4 cursor-pointer bg-white ${
                        selectedFacilityId === facility.id ? 'border-indigo-500 bg-indigo-50/10' : 'border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded uppercase tracking-wider">{facility.category}</span>
                      </div>
                      <h4 className="text-[14px] font-bold text-slate-800 line-clamp-1 mb-1">{facility.name}</h4>
                      <p className="text-[12px] font-medium text-slate-500 line-clamp-2 mb-3 h-8">{facility.address}</p>
                      
                      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[12px] font-bold text-slate-600 flex items-center gap-1.5">
                          <Navigation className="w-3.5 h-3.5 text-indigo-500" /> 
                          {selectedFacilityId === facility.id && routeInfo ? routeInfo.distance : facility.distance + ' KM'}
                        </span>
                        
                        {selectedFacilityId === facility.id && routeInfo ? (
                          <span className="text-white bg-indigo-600 px-2 py-1 rounded-md font-bold text-[11px] flex items-center gap-1 shadow-sm">
                            <Car className="w-3 h-3" /> {routeInfo.duration}
                          </span>
                        ) : (
                          <span className="text-indigo-600 font-semibold text-[11px] group-hover:underline">Lihat Rute &rarr;</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}