"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * EARS Funnel SVG Illustration
 * Left: fuzzy natural language
 * Middle: EARS filter (When... The system shall...)
 * Right: deterministic test cases
 */
export default function EarsFunnel() {
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
    const inputTexts = svg.querySelectorAll(".input-text");
    const filterLines = svg.querySelectorAll(".filter-line");
    const outputBoxes = svg.querySelectorAll(".output-box");

    timelineRef.current = gsap.timeline({ paused: true });

    // Input texts flowing in
    timelineRef.current.fromTo(
      inputTexts,
      { opacity: 0, x: -30 },
      {
        opacity: 0.6,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      },
      0
    );

    // Filter lines appearing
    timelineRef.current.fromTo(
      filterLines,
      { strokeDashoffset: 50 },
      { strokeDashoffset: 0, duration: 1, stagger: 0.1 },
      0.5
    );

    // Output boxes appearing
    timelineRef.current.fromTo(
      outputBoxes,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "back.out(1.7)",
      },
      1
    );

    // Continuous flow animation
    gsap.to(inputTexts, {
      opacity: 0.4,
      duration: 1.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.3,
    });

    return () => {
      timelineRef.current?.kill();
      gsap.killTweensOf(inputTexts);
    };
  }, [prefersReducedMotion]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 320 220"
      className="w-full h-full"
      style={{ maxWidth: "420px" }}
    >
      {/* Input - Fuzzy natural language */}
      <g transform="translate(10, 30)">
        <text className="input-text text-[9px] fill-muted-foreground/60 font-mono" y="0">
          {`"用户应该能..."`}
        </text>
        <text className="input-text text-[9px] fill-muted-foreground/60 font-mono" y="20">
          {`"需要更好的体验"`}
        </text>
        <text className="input-text text-[9px] fill-muted-foreground/60 font-mono" y="40">
          {`"这个功能要简单"`}
        </text>
        <text className="input-text text-[9px] fill-muted-foreground/60 font-mono" y="60">
          {`"速度要快一点"`}
        </text>
      </g>

      {/* Arrow to funnel */}
      <path
        d="M95 70 L110 70"
        className="stroke-muted-foreground/30 stroke-[1] fill-none"
        markerEnd="url(#arrowhead)"
      />

      {/* Funnel / EARS Filter */}
      <g transform="translate(115, 20)">
        {/* Funnel shape */}
        <path
          d="M0 0 L80 0 L60 180 L20 180 Z"
          className="fill-muted/20 stroke-muted-foreground/40 stroke-[1]"
        />

        {/* EARS syntax lines */}
        <text className="filter-line text-[7px] fill-primary font-mono" x="15" y="50">
          When [condition]
        </text>
        <text className="filter-line text-[7px] fill-primary font-mono" x="15" y="70">
          The system shall
        </text>
        <text className="filter-line text-[7px] fill-primary font-mono" x="15" y="90">
          [action]
        </text>

        {/* Filter label */}
        <text className="text-[8px] fill-muted-foreground font-medium" x="40" y="150" textAnchor="middle">
          EARS
        </text>
      </g>

      {/* Arrow from funnel */}
      <path
        d="M200 70 L215 70"
        className="stroke-muted-foreground/30 stroke-[1] fill-none"
      />

      {/* Output - Test Cases */}
      <g transform="translate(220, 25)">
        <g className="output-box">
          <rect x="0" y="0" width="90" height="28" rx="4" className="fill-card stroke-primary/40 stroke-[1]" />
          <text x="8" y="12" className="text-[7px] fill-muted-foreground font-mono">TC-001:</text>
          <text x="8" y="22" className="text-[6px] fill-foreground font-mono">✓ Pass</text>
        </g>
        <g className="output-box">
          <rect x="0" y="35" width="90" height="28" rx="4" className="fill-card stroke-primary/40 stroke-[1]" />
          <text x="8" y="47" className="text-[7px] fill-muted-foreground font-mono">TC-002:</text>
          <text x="8" y="57" className="text-[6px] fill-foreground font-mono">✓ Pass</text>
        </g>
        <g className="output-box">
          <rect x="0" y="70" width="90" height="28" rx="4" className="fill-card stroke-primary/40 stroke-[1]" />
          <text x="8" y="82" className="text-[7px] fill-muted-foreground font-mono">TC-003:</text>
          <text x="8" y="92" className="text-[6px] fill-foreground font-mono">✓ Pass</text>
        </g>

        <text x="45" y="120" textAnchor="middle" className="text-[8px] fill-muted-foreground">
          Test Cases
        </text>
      </g>

      {/* Arrow marker definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" className="fill-muted-foreground/30" />
        </marker>
      </defs>
    </svg>
  );
}