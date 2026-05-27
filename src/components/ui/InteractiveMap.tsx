"use client";

import React, { useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export interface MapMarker {
  id: string;
  lng: number;
  lat: number;
  element?: React.ReactNode;
  popupContent?: string;
}

export interface InteractiveMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  interactive?: boolean;
  onCenterChange?: (lng: number, lat: number) => void;
  routePath?: [number, number][];
  fitBounds?: boolean;
  bounds?: [[number, number], [number, number]];
  className?: string;
}

export default function InteractiveMap({
  center = [-84.3800, 33.7089],
  zoom = 13,
  markers = [],
  interactive = true,
  onCenterChange,
  routePath,
  fitBounds = false,
  bounds,
  className = "w-full h-full"
}: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!token) {
      console.warn("Mapbox access token is missing.");
      return;
    }

    mapboxgl.accessToken = token;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: center,
      zoom: zoom,
      interactive: interactive,
      bounds: bounds, // Apply explicit bounds if provided
      fitBoundsOptions: bounds ? { padding: 40 } : undefined
    });

    const map = mapRef.current;

    map.on('load', () => {
      // Add route line if provided
      if (routePath && routePath.length > 0) {
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: routePath
            }
          }
        });

        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3b82f6', // blue-500
            'line-width': 6,
            'line-opacity': 0.6
          }
        });
      }

      if (fitBounds) {
        const bounds = new mapboxgl.LngLatBounds();
        let hasBounds = false;
        
        if (markers && markers.length > 0) {
          markers.forEach(m => bounds.extend([m.lng, m.lat]));
          hasBounds = true;
        }
        
        if (routePath && routePath.length > 0) {
          routePath.forEach(p => bounds.extend([p[0], p[1]]));
          hasBounds = true;
        }

        if (hasBounds) {
          map.fitBounds(bounds, { padding: 60, maxZoom: 16 });
        }
      }
    });

    map.on('move', () => {
      if (onCenterChange) {
        const currentCenter = map.getCenter();
        onCenterChange(currentCenter.lng, currentCenter.lat);
      }
    });

    return () => {
      map.remove();
    };
  }, []); // Note: mapbox-gl initialization is meant to happen once.

  // Update markers when props change
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // Remove old markers that are not in the new array
    const currentMarkerIds = markers.map(m => m.id);
    Object.keys(markersRef.current).forEach(id => {
      if (!currentMarkerIds.includes(id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });

    // Add or update markers
    markers.forEach(markerData => {
      if (markersRef.current[markerData.id]) {
        // Update existing marker position
        markersRef.current[markerData.id].setLngLat([markerData.lng, markerData.lat]);
      } else {
        // Create new marker
        const options: mapboxgl.MarkerOptions = {};
        if (markerData.element) {
          const el = document.createElement('div');
          const root = createRoot(el);
          root.render(markerData.element);
          options.element = el;
        }
        
        const m = new mapboxgl.Marker(options)
          .setLngLat([markerData.lng, markerData.lat])
          .addTo(map);
        
        if (markerData.popupContent) {
          const popup = new mapboxgl.Popup({ offset: 25, closeButton: false, className: 'mapbox-dark-popup' })
            .setHTML(markerData.popupContent);
          m.setPopup(popup);
        }
        
        markersRef.current[markerData.id] = m;
      }
    });
  }, [markers]);

  return (
    <div className={`relative ${className}`}>
      {!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-950 text-zinc-400 p-6 text-center">
          <p className="border border-zinc-800 p-4 rounded-xl bg-zinc-900/50">
            Please add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your .env.local file to load the map.
          </p>
        </div>
      )}
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
