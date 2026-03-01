"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Concentric Growth SVG Illustration
 * Center: MVP core
 * Second ring: UX Polish
 * Outer ring: Advanced Features
 */
export default function ConcentricGrowth() {
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!svgRef.current || prefersReducedMotion) return;

    const svg = svgRef.current;
    const rings = svg.querySelectorAll(".growth-ring");
    const centerCore = svg.querySelector(".center-core");

    timelineRef.current = gsap.timeline({ paused: true });

    // Rings expanding outward
    timelineRef.current.fromTo(
      rings,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: (i) => 0.8 - i * 0.2,
        duration: 0.8,
        stagger: 0.25,
        ease: "power2.out",
      },
      0
    );

    // Center core pulse
    gsap.to(centerCore, {
      scale: 1.15,
      duration: 1.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Rings subtle rotation
    gsap.to(rings, {
      rotation: 5,
      duration: 8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.5,
    });

    return () => {
      timelineRef.current?.kill();
      gsap.killTweensOf([rings, centerCore]);
    };
  }, [prefersReducedMotion]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 300 260"
      className="w-full h-full"
      style={{ maxWidth: "400px" }}
    >
      {/* Outer ring - Advanced Features */}
      <circle
        cx="150"
        cy="130"
        r="100"
        className="growth-ring fill-none stroke-muted-foreground/20 stroke-[1]"
      />
      <text x="150" y="20" textAnchor="middle" className="text-[8px] fill-muted-foreground/40 font-medium">
        Advanced Features
      </text>

      {/* Middle ring - UX Polish */}
      <circle
        cx="150"
        cy="130"
        r="65"
        className="growth-ring fill-none stroke-muted-foreground/40 stroke-[1.5]"
      />
      <text x="150" y="55" textAnchor="middle" className="text-[8px] fill-muted-foreground/60 font-medium">
        UX Polish
      </text>

      {/* Inner ring - MVP Core */}
      <circle
        cx="150"
        cy="130"
        r="35"
        className="growth-ring fill-primary/10 stroke-primary/40 stroke-[1.5]"
      />

      {/* Center core */}
      <g className="center-core" transform="translate(150, 130)">
        <circle r="18" className="fill-primary stroke-primary stroke-[1]" />
        <text y="5" textAnchor="middle" className="text-[9px] fill-primary-foreground font-bold">
          MVP
        </text>
      </g>

      {/* Arrow indicators showing growth direction */}
      <g transform="translate(150, 130)">
        {/* Top arrow */}
        <path d="M0 -45 L0 -55" className="stroke-muted-foreground/30 stroke-[1] fill-none" />
        <polygon points="0,-58 -3,-53 3,-53" className="fill-muted-foreground/30" />
      </g>

      {/* Decorative dots on rings */}
      <circle cx="150" cy="30" r="3" className="fill-muted-foreground/20" />
      <circle cx="250" cy="130" r="3" className="fill-muted-foreground/20" />
      <circle cx="150" cy="230" r="3" className="fill-muted-foreground/20" />
      <circle cx="50" cy="130" r="3" className="fill-muted-foreground/20" />

      {/* Middle ring dots */}
      <circle cx="150" cy="65" r="2" className="fill-muted-foreground/40" />
      <circle cx="215" cy="130" r="2" className="fill-muted-foreground/40" />
      <circle cx="150" cy="195" r="2" className="fill-muted-foreground/40" />
      <circle cx="85" cy="130" r="2" className="fill-muted-foreground/40" />
    </svg>
  );
}