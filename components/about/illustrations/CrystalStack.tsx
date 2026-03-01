"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Crystal Stack SVG Illustration
 * Bottom: stacked document blocks
 * Top: iteration flow
 * Blocks crystallize and fall from flow
 */
export default function CrystalStack() {
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
    const stackedBlocks = svg.querySelectorAll(".stacked-block");
    const flowingBlocks = svg.querySelectorAll(".flowing-block");
    const crystallizingBlock = svg.querySelector(".crystallizing");

    timelineRef.current = gsap.timeline({ paused: true });

    // Stacked blocks appearing
    timelineRef.current.fromTo(
      stackedBlocks,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
      },
      0
    );

    // Flowing blocks animation
    gsap.to(flowingBlocks, {
      x: -10,
      opacity: 0.4,
      duration: 1.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
    });

    // Crystallizing block falling
    gsap.to(crystallizingBlock, {
      y: 80,
      opacity: 1,
      duration: 3,
      ease: "power2.in",
      repeat: -1,
      delay: 1,
      onRepeat: function () {
        gsap.set(crystallizingBlock, { y: 0, opacity: 0.6 });
      },
    });

    return () => {
      timelineRef.current?.kill();
      gsap.killTweensOf([flowingBlocks, crystallizingBlock]);
    };
  }, [prefersReducedMotion]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 300 260"
      className="w-full h-full"
      style={{ maxWidth: "400px" }}
    >
      {/* Iteration flow (top) */}
      <g transform="translate(100, 20)">
        <text y="0" className="text-[8px] fill-muted-foreground/50 font-medium">Iteration Flow</text>

        {/* Flowing blocks */}
        <rect x="0" y="15" width="45" height="25" rx="3" className="flowing-block fill-muted-foreground/10 stroke-muted-foreground/30 stroke-[1]" />
        <text x="8" y="30" className="text-[6px] fill-muted-foreground/50 font-mono">Sprint 1</text>

        <rect x="55" y="15" width="45" height="25" rx="3" className="flowing-block fill-muted-foreground/10 stroke-muted-foreground/30 stroke-[1]" />
        <text x="63" y="30" className="text-[6px] fill-muted-foreground/50 font-mono">Sprint 2</text>

        <rect x="110" y="15" width="45" height="25" rx="3" className="flowing-block fill-muted-foreground/10 stroke-muted-foreground/30 stroke-[1]" />
        <text x="118" y="30" className="text-[6px] fill-muted-foreground/50 font-mono">Sprint 3</text>
      </g>

      {/* Crystallizing block */}
      <rect
        x="135"
        y="60"
        width="50"
        height="28"
        rx="4"
        className="crystallizing fill-primary/20 stroke-primary/50 stroke-[1]"
      />
      <text x="145" y="78" className="text-[6px] fill-primary font-mono">.md</text>

      {/* Arrow down */}
      <path d="M160 95 L160 115" className="stroke-primary/40 stroke-[1] fill-none" />
      <polygon points="160,118 157,112 163,112" className="fill-primary/40" />

      {/* Knowledge base label */}
      <text x="150" y="135" textAnchor="middle" className="text-[8px] fill-muted-foreground/60 font-medium">
        Knowledge Base
      </text>

      {/* Stacked document blocks (bottom) */}
      <g transform="translate(60, 150)">
        <rect x="0" y="80" width="180" height="30" rx="4" className="stacked-block fill-muted/30 stroke-muted-foreground/40 stroke-[1]" />
        <text x="10" y="99" className="text-[7px] fill-muted-foreground font-mono">best-practices.md</text>

        <rect x="0" y="45" width="180" height="30" rx="4" className="stacked-block fill-muted/30 stroke-muted-foreground/40 stroke-[1]" />
        <text x="10" y="64" className="text-[7px] fill-muted-foreground font-mono">architecture.md</text>

        <rect x="0" y="10" width="180" height="30" rx="4" className="stacked-block fill-muted/30 stroke-muted-foreground/40 stroke-[1]" />
        <text x="10" y="29" className="text-[7px] fill-muted-foreground font-mono">patterns.md</text>
      </g>

      {/* Crystal sparkle decoration */}
      <circle cx="80" cy="200" r="2" className="fill-primary/30" />
      <circle cx="220" cy="185" r="2" className="fill-primary/30" />
      <circle cx="100" cy="175" r="1.5" className="fill-primary/20" />
    </svg>
  );
}