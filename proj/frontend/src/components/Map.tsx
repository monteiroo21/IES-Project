import { useRef, useEffect } from "react";
import { MapWidget } from "./map-widget";

interface Marker {
  lat: number;
  lon: number;
  label?: string;
  id?:number;
  chainId?:number;
}

interface MapProps {
  zoomLevel: number;
  markers: Marker[];
}

export default function Map({ zoomLevel, markers }: MapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapWidget | null>(null);

  useEffect(() => {
    if (containerRef.current && mapRef.current === null) {
      mapRef.current = new MapWidget(containerRef.current);
      mapRef.current.locateUser();
    }

    if (mapRef.current) {
      mapRef.current.setZoom(zoomLevel);

      if (markers) {
        markers.forEach((marker) => {
          mapRef.current?.addMarker(marker.lat, marker.lon, marker.label,marker.id,marker.chainId);
        });
      }
    }
  }, [zoomLevel, markers]);

  return (
    <div className="flex justify-center items-center h-[60vh] w-full">
      <div className="w-[120vh] h-full 	rounded-xl" ref={containerRef} />
    </div>
  );
}
