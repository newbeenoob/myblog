"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Triangle Convergence SVG Illustration
 * Three vertices: Core UX, Tech Stack, Visual Tone
 * Center: pulsing MVP.start() anchor
 */
export default function TriConverge() {
  const svgRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!svgRef.current || prefersReducedMotion) return;

    const svg = svgRef.current;
    const centerDot = svg.querySelector(".center-dot");
    const centerRing = svg.querySelector(".center-ring");
    const vertices = svg.querySelectorAll(".vertex");
    const lines = svg.querySelectorAll(".converge-line");

    // Create timeline
    timelineRef.current = gsap.timeline({ paused: true });

    // Animate convergence lines drawing in
    timelineRef.current.fromTo(
      lines,
      { strokeDashoffset: 200 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        stagger: 0.2,
      },
      0
    );

    // Animate vertices fading in
    timelineRef.current.fromTo(
      vertices,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.15,
      },
      0.5
    );

    // Center pulsing animation (continuous)
    gsap.to(centerDot, {
      scale: 1.3,
      opacity: 0.6,
      duration: 1.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Ring expansion animation
    gsap.to(centerRing, {
      scale: 2,
      opacity: 0,
      duration: 2,
      ease: "power2.out",
      repeat: -1,
    });

    // Cleanup
    return () => {
      timelineRef.current?.kill();
      gsap.killTweensOf([centerDot, centerRing]);
    };
  }, [prefersReducedMotion]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 300 260"
      className="w-full h-full"
      style={{ maxWidth: "400px" }}
    >
      {/* Background task list decoration (faded) */}
      <text x="20" y="30" className="text-[10px] fill-muted-foreground/20 font-mono">
        □ Define core pages...
      </text>
      <text x="20" y="50" className="text-[10px] fill-muted-foreground/20 font-mono">
        □ Choose tech stack...
      </text>
      <text x="20" y="70" className="text-[10px] fill-muted-foreground/20 font-mono">
        □ Set visual tone...
      </text>

      {/* Triangle vertices */}
      <g className="vertex" transform="translate(150, 40)">
        <circle r="8" className="fill-muted-foreground/30 stroke-muted-foreground stroke-[1.5]" />
        <text y="25" textAnchor="middle" className="text-[10px] fill-muted-foreground font-medium">
          Core UX
        </text>
      </g>

      <g className="vertex" transform="translate(60, 200)">
        <circle r="8" className="fill-muted-foreground/30 stroke-muted-foreground stroke-[1.5]" />
        <text y="25" textAnchor="middle" className="text-[10px] fill-muted-foreground font-medium">
          Tech Stack
        </text>
      </g>

      <g className="vertex" transform="translate(240, 200)">
        <circle r="8" className="fill-muted-foreground/30 stroke-muted-foreground stroke-[1.5]" />
        <text y="25" textAnchor="middle" className="text-[10px] fill-muted-foreground font-medium">
          Visual Tone
        </text>
      </g>

      {/* Convergence lines */}
      <line
        x1="150" y1="48"
        x2="150" y2="130"
        className="converge-line stroke-muted-foreground/40 stroke-[1]"
        strokeDasharray="200"
        style={{ strokeDashoffset: 200 }}
      />
      <line
        x1="68" y1="193"
        x2="150" y2="130"
        className="converge-line stroke-muted-foreground/40 stroke-[1]"
        strokeDasharray="200"
        style={{ strokeDashoffset: 200 }}
      />
      <line
        x1="232" y1="193"
        x2="150" y2="130"
        className="converge-line stroke-muted-foreground/40 stroke-[1]"
        strokeDasharray="200"
        style={{ strokeDashoffset: 200 }}
      />

      {/* Center MVP.start() anchor */}
      <g transform="translate(150, 130)">
        {/* Pulsing ring */}
        <circle
          className="center-ring fill-none stroke-primary stroke-[1]"
          r="16"
          style={{ opacity: 0.5 }}
        />
        {/* Center dot */}
        <circle
          className="center-dot fill-primary"
          r="6"
        />
        {/* Label */}
        <text y="35" textAnchor="middle" className="text-[9px] fill-primary font-mono font-medium">
          MVP.start()
        </text>
      </g>
    </svg>
  );
}