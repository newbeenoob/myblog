"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import SectionCard from "@/components/about/SectionCard";
import LinkCard from "@/components/about/LinkCard";

// Import illustrations
import TriConverge from "@/components/about/illustrations/TriConverge";
import EarsFunnel from "@/components/about/illustrations/EarsFunnel";
import BlueprintVsCode from "@/components/about/illustrations/BlueprintVsCode";
import ConcentricGrowth from "@/components/about/illustrations/ConcentricGrowth";
import CrystalStack from "@/components/about/illustrations/CrystalStack";
import MobiusLoop from "@/components/about/illustrations/MobiusLoop";
import DirectoryTree from "@/components/DirectoryTree";

// Section data with prompts
const sections = [
  {
    number: 1,
    titleKey: "about.section1.title",
    principleKey: "about.section1.principle",
    pmThoughtKey: "about.section1.pmThought",
    promptTitleKey: "about.section1.promptTitle",
    promptContent: `Design a triangle convergence SVG with three vertices:
- Core UX (top)
- Tech Stack (bottom-left)
- Visual Tone (bottom-right)

Center point: MVP.start() with subtle pulse animation.
Use 1px strokes, grayscale palette, primary color for center anchor.
Keep it minimal and elegant.`,
    Illustration: TriConverge,
  },
  {
    number: 2,
    titleKey: "about.section2.title",
    principleKey: "about.section2.principle",
    pmThoughtKey: "about.section2.pmThought",
    promptTitleKey: "about.section2.promptTitle",
    promptContent: `Create a stair-tree directory visualization:
.agent/
  AGENT.md
  rules/       <- highlighted
  workflows/   <- highlighted
  prompts/

Connect to AI core with animated line.
Rules-driven generation concept.
Use depth/shadow for 3D effect.`,
    Illustration: DirectoryTree,
  },
  {
    number: 3,
    titleKey: "about.section3.title",
    principleKey: "about.section3.principle",
    pmThoughtKey: "about.section3.pmThought",
    promptTitleKey: "about.section3.promptTitle",
    promptContent: `Design an EARS funnel model:
- Left: fuzzy natural language inputs
- Middle: EARS filter (When... The system shall...)
- Right: deterministic test cases

Animate flow from left to right.
Show transformation from ambiguity to clarity.`,
    Illustration: EarsFunnel,
  },
  {
    number: 4,
    titleKey: "about.section4.title",
    principleKey: "about.section4.principle",
    pmThoughtKey: "about.section4.pmThought",
    promptTitleKey: "about.section4.promptTitle",
    promptContent: `Create blueprint vs code comparison:
- Left: semi-transparent architecture blueprint
- Right: growing code blocks

Blueprint should always be one step ahead.
Animate the transformation process.
Use subtle animations to show progression.`,
    Illustration: BlueprintVsCode,
  },
  {
    number: 5,
    titleKey: "about.section5.title",
    principleKey: "about.section5.principle",
    pmThoughtKey: "about.section5.pmThought",
    promptTitleKey: "about.section5.promptTitle",
    promptContent: `Design concentric growth rings:
- Center: MVP core
- Second ring: UX Polish
- Outer ring: Advanced Features

Animate expansion outward.
Show layered progression.
Primary color for center, fading outward.`,
    Illustration: ConcentricGrowth,
  },
  {
    number: 6,
    titleKey: "about.section6.title",
    principleKey: "about.section6.principle",
    pmThoughtKey: "about.section6.pmThought",
    promptTitleKey: "about.section6.promptTitle",
    promptContent: `Create crystal stacking visualization:
- Bottom: stacked document blocks (.md files)
- Top: iteration flow (Sprint 1, 2, 3...)

Show blocks crystallizing and falling from flow.
Animate the precipitation process.
Knowledge base grows over time.`,
    Illustration: CrystalStack,
  },
  {
    number: 7,
    titleKey: "about.section7.title",
    principleKey: "about.section7.principle",
    pmThoughtKey: "about.section7.pmThought",
    promptTitleKey: "about.section7.promptTitle",
    promptContent: `Design a Möbius loop / closed cycle:
Feedback → Log → AI Refine → Deploy

Animate continuous flow.
Show the feedback loop never ends.`,
    Illustration: MobiusLoop,
  }
];

// Hero illustration - floating orbits
function HeroIllustration() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  return (
    <div className="relative w-full h-64 lg:h-80">
      <svg viewBox="0 0 300 250" className="w-full h-full">
        {/* Background task list (faded decoration) */}
        <text x="10" y="20" className="text-[10px] fill-muted-foreground/15 font-mono">
          □ Define MVP scope
        </text>
        <text x="10" y="40" className="text-[10px] fill-muted-foreground/15 font-mono">
          □ Setup project structure
        </text>
        <text x="10" y="60" className="text-[10px] fill-muted-foreground/15 font-mono">
          □ Configure AI rules
        </text>
        <text x="10" y="80" className="text-[10px] fill-muted-foreground/15 font-mono">
          □ Design components
        </text>

        {/* Orbit rings */}
        <circle
          cx="200"
          cy="130"
          r="80"
          className="fill-none stroke-muted-foreground/20 stroke-[1]"
          style={{
            animation: !prefersReducedMotion ? "orbit-rotate 40s linear infinite" : undefined,
            transformOrigin: "200px 130px",
          }}
        />
        <circle
          cx="200"
          cy="130"
          r="55"
          className="fill-none stroke-muted-foreground/30 stroke-[1]"
          style={{
            animation: !prefersReducedMotion ? "orbit-rotate 30s linear infinite reverse" : undefined,
            transformOrigin: "200px 130px",
          }}
        />
        <circle
          cx="200"
          cy="130"
          r="30"
          className="fill-none stroke-primary/40 stroke-[1.5]"
        />

        {/* Floating dots on orbits */}
        <circle
          cx="280"
          cy="130"
          r="4"
          className="fill-primary/50"
          style={{
            animation: !prefersReducedMotion ? "orbit-rotate 40s linear infinite" : undefined,
            transformOrigin: "200px 130px",
          }}
        />
        <circle
          cx="200"
          cy="75"
          r="3"
          className="fill-muted-foreground/40"
          style={{
            animation: !prefersReducedMotion ? "orbit-rotate 30s linear infinite reverse" : undefined,
            transformOrigin: "200px 130px",
          }}
        />

        {/* Center point */}
        <circle cx="200" cy="130" r="8" className="fill-primary" />
        <circle cx="200" cy="130" r="12" className="fill-none stroke-primary/50 stroke-[1]" />

        {/* Decorative dashed lines */}
        <line
          x1="50"
          y1="200"
          x2="150"
          y2="200"
          className="stroke-muted-foreground/20 stroke-[1] stroke-dasharray-[4,4]"
        />
        <line
          x1="220"
          y1="220"
          x2="280"
          y2="220"
          className="stroke-muted-foreground/20 stroke-[1] stroke-dasharray-[4,4]"
        />

        {/* Small decorative dots */}
        <circle cx="50" cy="200" r="2" className="fill-muted-foreground/20" />
        <circle cx="280" cy="220" r="2" className="fill-muted-foreground/20" />
      </svg>

      {/* Code block decoration */}
      <div className="absolute bottom-4 left-4 lg:left-8 p-3 rounded-lg bg-muted/30 border border-border/50 font-mono text-xs text-muted-foreground">
        <code>
          MVP.start()<br />
          loop(observe → act → learn)
        </code>
      </div>
    </div>
  );
}

export default function AboutContent() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-6"
              >
                {t('about.hero.title')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-muted-foreground"
              >
                {t('about.hero.description')}
              </motion.p>
            </div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1"
            >
              <HeroIllustration />
            </motion.div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-border/50 my-8" />

        {/* Sections */}
        <section className="divide-y divide-border/30">
          {sections.map((section, index) => (
            <SectionCard
              key={section.number}
              number={section.number}
              title={t(section.titleKey) as string}
              principle={t(section.principleKey) as string}
              pmThought={t(section.pmThoughtKey) as string}
              promptTitle={t(section.promptTitleKey) as string}
              promptContent={section.promptContent}
              illustration={<section.Illustration />}
              reversed={index % 2 === 1}
            />
          ))}
        </section>

        {/* Bottom Section */}
        <section className="py-16">
          <h2 className="text-2xl font-serif font-bold mb-6">{t('about.moreInsights')}</h2>
          <LinkCard
            title="4天，96小时，我如何从0到1构建一个可演进的个人网站"
            summary="一次面试课题，也可以把它当成一个真实产品来做"
            href="/articles/ai_ide_exper"
          />
        </section>
      </div>
    </div>
  );
}