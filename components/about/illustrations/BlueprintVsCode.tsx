"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Blueprint vs Code SVG Illustration
 * Left: semi-transparent architecture blueprint
 * Right: growing code blocks
 * Blueprint always one step ahead
 */
export default function BlueprintVsCode() {
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
    const blueprintBlocks = svg.querySelectorAll(".blueprint-block");
    const codeBlocks = svg.querySelectorAll(".code-block");
    const arrow = svg.querySelector(".flow-arrow");

    timelineRef.current = gsap.timeline({ paused: true });

    // Blueprint blocks appearing first
    timelineRef.current.fromTo(
      blueprintBlocks,
      { opacity: 0, y: -20 },
      {
        opacity: 0.7,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      },
      0
    );

    // Code blocks following
    timelineRef.current.fromTo(
      codeBlocks,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      0.8
    );

    // Arrow pulse
    gsap.to(arrow, {
      x: 5,
      opacity: 0.6,
      duration: 1,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      timelineRef.current?.kill();
      gsap.killTweensOf(arrow);
    };
  }, [prefersReducedMotion]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 320 200"
      className="w-full h-full"
      style={{ maxWidth: "420px" }}
    >
      {/* Blueprint section (left) */}
      <g transform="translate(20, 20)">
        <text y="0" className="text-[9px] fill-muted-foreground/50 font-medium">Blueprint</text>

        {/* Blueprint grid */}
        <rect x="0" y="15" width="100" height="140" className="fill-muted/10 stroke-muted-foreground/30 stroke-[1] stroke-dasharray-[4,4]" />

        {/* Blueprint blocks */}
        <g className="blueprint-block" style={{ transition: 'all 0.3s ease' }}>
          <rect x="10" y="25" width="80" height="30" className="fill-primary/5 stroke-primary/30 stroke-[1]" style={{ transition: 'all 0.3s ease' }} />
          <rect x="10" y="25" width="80" height="30" className="fill-transparent" style={{ pointerEvents: 'auto' }} />
          <text x="15" y="43" className="text-[6px] fill-muted-foreground/70 font-mono" style={{ pointerEvents: 'auto', userSelect: 'text', transition: 'all 0.3s ease', fill: '#6b7280' }}>Logo</text>
          <line x1="60" y1="30" x2="60" y2="50" className="stroke-muted-foreground/30 stroke-[1]" style={{ transition: 'all 0.3s ease' }} />
          <circle cx="70" cy="40" r="1.5" className="fill-muted-foreground/50" style={{ transition: 'all 0.3s ease' }} />
          <circle cx="77" cy="40" r="1.5" className="fill-muted-foreground/50" style={{ transition: 'all 0.3s ease' }} />
          <circle cx="84" cy="40" r="1.5" className="fill-muted-foreground/50" style={{ transition: 'all 0.3s ease' }} />
        </g>

        <g className="blueprint-block" style={{ transition: 'all 0.3s ease' }}>
          <rect x="10" y="65" width="80" height="25" className="fill-muted-foreground/5 stroke-muted-foreground/30 stroke-[1]" style={{ transition: 'all 0.3s ease' }} />
          <rect x="10" y="65" width="80" height="25" className="fill-transparent" style={{ pointerEvents: 'auto' }} />
          <line x1="20" y1="72" x2="40" y2="72" className="stroke-muted-foreground/50 stroke-[1]" style={{ transition: 'all 0.3s ease' }} />
          <line x1="20" y1="78" x2="40" y2="78" className="stroke-muted-foreground/50 stroke-[1]" style={{ transition: 'all 0.3s ease' }} />
          <line x1="20" y1="84" x2="40" y2="84" className="stroke-muted-foreground/50 stroke-[1]" style={{ transition: 'all 0.3s ease' }} />
          <text x="45" y="80" className="text-[5px] fill-muted-foreground/70 font-mono" style={{ transition: 'all 0.3s ease', fill: '#6b7280' }}>Nav Links</text>
        </g>

        <g className="blueprint-block" style={{ transition: 'all 0.3s ease' }}>
          <rect x="10" y="100" width="35" height="30" className="fill-muted-foreground/5 stroke-muted-foreground/30 stroke-[1]" style={{ transition: 'all 0.3s ease' }} />
          <rect x="10" y="100" width="35" height="30" className="fill-transparent" style={{ pointerEvents: 'auto' }} />
          <text x="27.5" y="115" className="text-[5px] fill-muted-foreground/70 font-mono text-center" style={{ pointerEvents: 'auto', userSelect: 'text', textAnchor: 'middle', transition: 'all 0.3s ease', fill: '#6b7280' }}>Hero Section</text>
          <rect x="55" y="100" width="35" height="30" className="fill-muted-foreground/5 stroke-muted-foreground/30 stroke-[1]" style={{ transition: 'all 0.3s ease' }} />
          <rect x="55" y="100" width="35" height="30" className="fill-transparent" style={{ pointerEvents: 'auto' }} />
          <text x="72.5" y="115" className="text-[5px] fill-muted-foreground/70 font-mono text-center" style={{ pointerEvents: 'auto', userSelect: 'text', textAnchor: 'middle', transition: 'all 0.3s ease', fill: '#6b7280' }}>Feature List</text>
        </g>
      </g>

      {/* Arrow */}
      <g transform="translate(140, 90)">
        <path d="M0 0 L30 0" className="flow-arrow stroke-primary/50 stroke-[1.5] fill-none" markerEnd="url(#arrow-blueprint)" />
      </g>

      {/* Code section (right) */}
      <g transform="translate(180, 20)">
        <text y="0" className="text-[9px] fill-muted-foreground/50 font-medium">Code</text>

        {/* Code container */}
        <rect x="0" y="15" width="120" height="140" className="fill-card stroke-border stroke-[1]" />

        {/* Code blocks */}
        <g className="code-block">
          <rect x="8" y="25" width="100" height="20" className="fill-muted/30" rx="2" />
          <text x="12" y="38" className="text-[6px] fill-muted-foreground font-mono" style={{ fill: '#6b7280' }}>const app = ...</text>
        </g>

        <g className="code-block">
          <rect x="8" y="50" width="100" height="20" className="fill-muted/30" rx="2" />
          <text x="12" y="63" className="text-[6px] fill-muted-foreground/60 font-mono" style={{ fill: '#6b7280' }}>{'<div>...</div>'}</text>
        </g>

        <g className="code-block">
          <rect x="8" y="75" width="100" height="20" className="fill-muted/30" rx="2" />
          <text x="12" y="88" className="text-[6px] fill-muted-foreground/60 font-mono" style={{ fill: '#6b7280' }}>{'<div>...</div>'}</text>
        </g>

        <g className="code-block">
          <rect x="8" y="100" width="100" height="20" className="fill-muted/30" rx="2" />
          <text x="12" y="113" className="text-[6px] fill-muted-foreground font-mono" style={{ fill: '#6b7280' }}>export default</text>
        </g>

        {/* Growing indicator */}
        <g className="code-block">
          <rect x="8" y="125" width="50" height="15" className="fill-primary/10 stroke-primary/30 stroke-[1]" rx="2" />
          <text x="12" y="135" className="text-[5px] fill-primary font-mono">+ new</text>
        </g>
      </g>

      {/* Arrow marker */}
      <defs>
        <marker
          id="arrow-blueprint"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" className="fill-primary/50" />
        </marker>
      </defs>
    </svg>
  );
}