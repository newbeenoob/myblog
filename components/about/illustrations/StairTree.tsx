"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Stair Tree SVG Illustration
 * Directory tree structure with .agent/, AGENT.md
 * Highlighted rules and workflows folders
 * Connected to AI core icon
 */
export default function StairTree() {
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
    const folders = svg.querySelectorAll(".folder");
    const connector = svg.querySelector(".connector-line");
    const aiCore = svg.querySelector(".ai-core");

    timelineRef.current = gsap.timeline({ paused: true });

    // Animate folders appearing with depth
    timelineRef.current.fromTo(
      folders,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.15,
      },
      0
    );

    // Draw connector line
    timelineRef.current.fromTo(
      connector,
      { strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" },
      0.8
    );

    // AI core pulse
    gsap.to(aiCore, {
      scale: 1.1,
      opacity: 0.8,
      duration: 1.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      timelineRef.current?.kill();
      gsap.killTweensOf(aiCore);
    };
  }, [prefersReducedMotion]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 300 260"
      className="w-full h-full"
      style={{ maxWidth: "400px" }}
    >
      {/* Directory tree structure */}
      <g className="folder" transform="translate(30, 30)">
        <rect x="0" y="0" width="120" height="24" rx="4" className="fill-muted/30 stroke-muted-foreground/40 stroke-[1]" />
        <text x="10" y="16" className="text-[10px] fill-muted-foreground font-mono">📁 .agent/</text>
      </g>

      <g className="folder" transform="translate(50, 65)">
        <rect x="0" y="0" width="110" height="24" rx="4" className="fill-muted/30 stroke-muted-foreground/40 stroke-[1]" />
        <text x="10" y="16" className="text-[10px] fill-muted-foreground font-mono">📄 AGENT.md</text>
      </g>

      <g className="folder" transform="translate(70, 100)">
        <rect x="0" y="0" width="100" height="24" rx="4" className="fill-primary/10 stroke-primary/40 stroke-[1]" />
        <text x="10" y="16" className="text-[10px] fill-primary font-mono">📁 rules/</text>
      </g>

      <g className="folder" transform="translate(70, 135)">
        <rect x="0" y="0" width="100" height="24" rx="4" className="fill-primary/10 stroke-primary/40 stroke-[1]" />
        <text x="10" y="16" className="text-[10px] fill-primary font-mono">📁 workflows/</text>
      </g>

      <g className="folder" transform="translate(30, 180)">
        <rect x="0" y="0" width="120" height="24" rx="4" className="fill-muted/30 stroke-muted-foreground/40 stroke-[1]" />
        <text x="10" y="16" className="text-[10px] fill-muted-foreground font-mono">📁 prompts/</text>
      </g>

      {/* Connector line to AI */}
      <line
        x1="180" y1="130"
        x2="240" y2="130"
        className="connector-line stroke-primary/50 stroke-[1.5] fill-none"
        strokeDasharray="100"
      />

      {/* AI Core Icon */}
      <g className="ai-core" transform="translate(250, 130)">
        <circle r="25" className="fill-primary/10 stroke-primary stroke-[1.5]" />
        <text textAnchor="middle" y="5" className="text-[12px] fill-primary font-bold">AI</text>
      </g>

      {/* Label */}
      <text x="230" y="180" textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium">
        Rules-Driven
      </text>
    </svg>
  );
}