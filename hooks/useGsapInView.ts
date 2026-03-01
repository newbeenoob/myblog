"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseGsapInViewOptions {
  animation?: (element: HTMLElement) => gsap.core.Timeline;
  markers?: boolean;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

/**
 * Custom hook for GSAP ScrollTrigger animations
 * - Plays animation when element enters viewport
 * - Pauses when leaves viewport
 * - Respects prefers-reduced-motion
 */
export function useGsapInView(options: UseGsapInViewOptions = {}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || prefersReducedMotion || !options.animation) return;

    // Create timeline
    timelineRef.current = options.animation(element);

    // Create ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: options.start || "top 80%",
      end: options.end || "bottom 20%",
      markers: options.markers || false,
      onEnter: () => {
        timelineRef.current?.play();
      },
      onLeave: () => {
        timelineRef.current?.pause();
      },
      onEnterBack: () => {
        timelineRef.current?.play();
      },
      onLeaveBack: () => {
        timelineRef.current?.pause();
      },
    });

    return () => {
      trigger.kill();
      timelineRef.current?.kill();
    };
  }, [prefersReducedMotion, options]);

  return { elementRef, prefersReducedMotion };
}

/**
 * Creates a gentle floating animation
 */
export function createFloatAnimation(
  element: HTMLElement,
  selector: string,
  options: {
    y?: number;
    duration?: number;
    stagger?: number;
  } = {}
) {
  const { y = 6, duration = 3, stagger = 0.2 } = options;

  return gsap.timeline({ paused: true }).to(element.querySelectorAll(selector), {
    y: `+=${y}`,
    duration,
    ease: "sine.inOut",
    stagger: {
      each: stagger,
      repeat: -1,
      yoyo: true,
    },
  });
}

/**
 * Creates a rotation animation
 */
export function createRotateAnimation(
  element: HTMLElement,
  selector: string,
  options: {
    duration?: number;
    direction?: 1 | -1;
  } = {}
) {
  const { duration = 30, direction = 1 } = options;

  return gsap.timeline({ paused: true }).to(element.querySelectorAll(selector), {
    rotation: direction * 360,
    duration,
    ease: "none",
    repeat: -1,
  });
}

/**
 * Creates a pulse/breathing animation
 */
export function createPulseAnimation(
  element: HTMLElement,
  selector: string,
  options: {
    minOpacity?: number;
    maxOpacity?: number;
    duration?: number;
  } = {}
) {
  const { minOpacity = 0.3, maxOpacity = 0.9, duration = 2 } = options;

  return gsap.timeline({ paused: true }).to(element.querySelectorAll(selector), {
    opacity: maxOpacity,
    duration,
    ease: "sine.inOut",
    stagger: {
      each: 0.3,
      repeat: -1,
      yoyo: true,
    },
  });
}

/**
 * Creates a stroke dash animation for SVG paths
 */
export function createStrokeAnimation(
  element: HTMLElement,
  selector: string,
  options: {
    duration?: number;
  } = {}
) {
  const { duration = 2 } = options;

  const paths = element.querySelectorAll(selector);
  paths.forEach((path) => {
    const length = (path as SVGPathElement).getTotalLength?.() || 100;
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
  });

  return gsap.timeline({ paused: true }).to(paths, {
    strokeDashoffset: 0,
    duration,
    ease: "power2.inOut",
    stagger: 0.1,
  });
}