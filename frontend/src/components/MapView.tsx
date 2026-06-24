import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { formatINR, type Property } from "@/lib/properties";

// Fix default Leaflet icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom highlight icon for hovered property
const highlightIcon = L.divIcon({
  className: 'custom-pin-highlight',
  html: `<div style="background-color: hsl(var(--primary)); width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); animation: pulse 2s infinite;"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

// A small dictionary to map text locations to rough GPS coordinates in Coimbatore
const GEO_LOOKUP: Record<string, [number, number]> = {
  "rs puram": [11.0045, 76.9482],
  "peelamedu": [11.0286, 77.0045],
  "gandhipuram": [11.0183, 76.9658],
  "saibaba colony": [11.0264, 76.9452],
  "race course": [11.0006, 76.9746],
  "saravanampatti": [11.0805, 76.9961],
  "vada valli": [11.0315, 76.9150],
  "thudiyalur": [11.0664, 76.9377],
  "ramnathapuram": [10.9926, 76.9921],
  "marine drive": [11.0168, 76.9558], // Placeholder
};

const resolveCoordinates = (locationStr: string): [number, number] => {
  if (!locationStr) return [11.0168, 76.9558];
  const normalized = locationStr.toLowerCase();
  
  for (const [key, coords] of Object.entries(GEO_LOOKUP)) {
    if (normalized.includes(key)) {
      // Add a tiny bit of random jitter so pins don't completely overlap if in same area
      const jitterLat = (Math.random() - 0.5) * 0.005;
      const jitterLng = (Math.random() - 0.5) * 0.005;
      return [coords[0] + jitterLat, coords[1] + jitterLng];
    }
  }
  
  // Default Coimbatore center + bigger jitter for unknown areas
  const jitterLat = (Math.random() - 0.5) * 0.05;
  const jitterLng = (Math.random() - 0.5) * 0.05;
  return [11.0168 + jitterLat, 76.9558 + jitterLng];
};

type Props = {
  properties: Property[];
  hoveredId: string | null;
  onHover?: (id: string | null) => void;
};

// Component to handle flying to a marker when hovered in the list
function MapController({ hoveredId, markers }: { hoveredId: string | null, markers: any[] }) {
  const map = useMap();
  useEffect(() => {
    if (hoveredId) {
      const marker = markers.find(m => m.id === hoveredId);
      if (marker) {
        map.flyTo(marker.position, 15, { duration: 0.8 });
      }
    }
  }, [hoveredId, markers, map]);
  return null;
}

export function MapView({ properties, hoveredId, onHover }: Props) {
  // Pre-calculate positions so they don't jump around on re-renders
  const markers = properties.map(p => {
     const pos = resolveCoordinates(p.location);
     return { ...p, position: pos };
  });

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] z-0">
      <MapContainer 
        center={[11.0168, 76.9558]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <MapController hoveredId={hoveredId} markers={markers} />
        
        {markers.map(m => (
          <Marker 
            key={m.id} 
            position={m.position}
            icon={hoveredId === m.id ? highlightIcon : DefaultIcon}
            eventHandlers={{
              mouseover: () => onHover?.(m.id),
              mouseout: () => onHover?.(null),
              click: () => onHover?.(m.id)
            }}
          >
            <Popup className="rounded-xl">
               <div className="flex flex-col gap-1 p-1 min-w-[150px]">
                 <div className="font-semibold text-sm leading-tight">{m.title}</div>
                 <div className="text-primary font-bold text-base">{formatINR(m.price)}</div>
                 <div className="text-xs text-muted-foreground mt-1">{m.location}</div>
               </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating property count */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[400] flex items-center gap-2 rounded-full bg-background/95 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-md border border-border">
        <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
        Showing {properties.length} properties
      </div>
    </div>
  );
}
