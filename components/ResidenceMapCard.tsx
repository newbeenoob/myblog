"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLanguage } from "./LanguageContext";

interface ResidenceMapCardProps {
  enableClouds?: boolean;
  enablePlane?: boolean;
}

// Guangzhou coordinates
const GUANGZHOU: [number, number] = [23.1291, 113.2644];

// Custom breathing marker icon
function createBreathingIcon() {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div class="marker-container">
        <div class="marker-glow"></div>
        <div class="marker-ring"></div>
        <div class="marker-dot"></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

// Static marker for reduced motion
function createStaticIcon() {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div class="marker-container static">
        <div class="marker-dot"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

export default function ResidenceMapCard({
  enableClouds = false,
  enablePlane = false,
}: ResidenceMapCardProps) {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const markerIcon = useMemo(() => {
    return prefersReducedMotion ? createStaticIcon() : createBreathingIcon();
  }, [prefersReducedMotion]);

  if (!mounted) {
    return (
      <div className="w-full max-w-[60%] mx-auto aspect-[3/2] rounded-xl border border-border/50 bg-muted/30 animate-pulse" />
    );
  }

  return (
    <div className="w-full max-w-[60%] mx-auto">
      {/* Title */}
      <h2 className="text-3xl font-serif font-bold mb-4 text-center">{t('map.title')}</h2>

      {/* Map Card */}
      <div className="relative w-full aspect-[3/2] sm:aspect-[16/9] rounded-xl border border-border/50 bg-card shadow-lg overflow-hidden z-10">
        {/* Map Container */}
        <MapContainer
          center={GUANGZHOU}
          zoom={9}
          className="w-full h-full"
          style={{ width: "100%", height: "100%" }}
          dragging={true}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            subdomains={['a', 'b', 'c']}
            maxZoom={19}
          />
          <Marker position={GUANGZHOU} icon={markerIcon} />
        </MapContainer>

        {/* Cloud overlay */}
        {enableClouds && !prefersReducedMotion && (
          <div className="cloud-overlay pointer-events-none">
            <div className="cloud cloud-1" />
            <div className="cloud cloud-2" />
          </div>
        )}

        {/* Plane overlay */}
        {enablePlane && !prefersReducedMotion && (
          <div className="plane-overlay pointer-events-none">
            <span className="plane">✈️</span>
          </div>
        )}

        {/* Dark mode overlay for better contrast */}
        <div className="absolute inset-0 pointer-events-none dark:bg-black/5" />
      </div>

      {/* Location label */}
      <p className="text-muted-foreground text-sm mt-2 text-center">
        {t('map.location')}
      </p>
    </div>
  );
}