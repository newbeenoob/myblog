"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Mobius Loop SVG Illustration
 * Closed loop: Feedback → Log → AI Refine → Deploy
 * User bubbles at Feedback point
 */
export default function MobiusLoop() {
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
    const loop = svg.querySelector(".loop-path") as SVGPathElement;
    const nodes = svg.querySelectorAll(".loop-node");
    const userBubbles = svg.querySelectorAll(".user-bubble");
    const flowDot = svg.querySelector(".flow-dot");

    // 确保所有元素都存在
    if (!loop || !flowDot) return;

    timelineRef.current = gsap.timeline({ paused: true });

    // Loop path drawing
    timelineRef.current.fromTo(
      loop,
      { strokeDashoffset: 600 },
      { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" },
      0
    );

    // Nodes appearing
    timelineRef.current.fromTo(
      nodes,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.15,
        ease: "back.out(1.7)",
      },
      0.5
    );

    // User bubbles floating
    gsap.to(userBubbles, {
      y: -5,
      opacity: 0.8,
      duration: 1.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
    });

    // Flow dot moving along path
    gsap.to(flowDot, {
      motionPath: {
        path: loop,
        align: loop,
        alignOrigin: [0.5, 0.5],
      },
      duration: 8,
      ease: "none",
      repeat: -1,
    });

    return () => {
      timelineRef.current?.kill();
      gsap.killTweensOf([userBubbles, flowDot]);
    };
  }, [prefersReducedMotion]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 320 240"
      className="w-full h-full"
      style={{ maxWidth: "420px" }}
    >
      {/* Main loop path - Möbius-like shape */}
      <path
        d="M60 120 Q60 40 160 40 Q260 40 260 120 Q260 200 160 200 Q60 200 60 120"
        className="loop-path fill-none stroke-muted-foreground/30 stroke-[2]"
        strokeDasharray="600"
      />

      {/* Flow dot */}
      <circle r="6" className="flow-dot fill-primary" cx="60" cy="120" />

      {/* Loop nodes */}
      {/* Feedback */}
      <g className="loop-node" transform="translate(60, 120)">
        <circle r="22" className="fill-primary/10 stroke-primary/50 stroke-[1.5]" />
        <text y="4" textAnchor="middle" className="text-[8px] fill-primary font-medium">Feedback</text>
      </g>

      {/* Log */}
      <g className="loop-node" transform="translate(160, 40)">
        <circle r="18" className="fill-muted/30 stroke-muted-foreground/50 stroke-[1.5]" />
        <text y="4" textAnchor="middle" className="text-[8px] fill-muted-foreground font-medium">Log</text>
      </g>

      {/* AI Refine */}
      <g className="loop-node" transform="translate(260, 120)">
        <circle r="20" className="fill-muted/30 stroke-muted-foreground/50 stroke-[1.5]" />
        <text y="4" textAnchor="middle" className="text-[8px] fill-muted-foreground font-medium">AI Refine</text>
      </g>

      {/* Deploy */}
      <g className="loop-node" transform="translate(160, 200)">
        <circle r="18" className="fill-muted/30 stroke-muted-foreground/50 stroke-[1.5]" />
        <text y="4" textAnchor="middle" className="text-[8px] fill-muted-foreground font-medium">Deploy</text>
      </g>

      {/* User feedback bubbles */}
      <g transform="translate(25, 90)">
        <g className="user-bubble">
          <rect x="0" y="0" width="50" height="22" rx="11" className="fill-muted/40 stroke-muted-foreground/30 stroke-[1]" />
          <text x="8" y="15" className="text-[6px] fill-muted-foreground font-mono">{`"太淡了"`}</text>
        </g>
      </g>

      <g transform="translate(15, 120)">
        <g className="user-bubble">
          <rect x="0" y="0" width="55" height="22" rx="11" className="fill-muted/40 stroke-muted-foreground/30 stroke-[1]" />
          <text x="8" y="15" className="text-[6px] fill-muted-foreground font-mono">{`"按钮太小"`}</text>
        </g>
      </g>

      {/* Arrow indicators on loop */}
      <polygon points="110,35 115,40 105,40" className="fill-muted-foreground/30" />
      <polygon points="265,160 260,155 260,165" className="fill-muted-foreground/30" />
      <polygon points="110,205 105,200 115,200" className="fill-muted-foreground/30" />
      <polygon points="55,80 60,85 50,85" className="fill-muted-foreground/30" />
    </svg>
  );
}