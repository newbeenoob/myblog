"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
    titleZh: "初始化：最简可行原则",
    titleEn: "The Minimalist Initialization",
    principle:
      "拒绝过度设计，通过三点定面快速破局：核心页面、技术栈、审美风格。",
    pmThought:
      "在模糊中建立秩序，是产品起步阶段最高效的决策。",
    promptTitle: "初始化 - Prompt 原文",
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
    titleZh: "项目空间：PM 的 AI 数字化基座",
    titleEn: "Digital Foundation",
    principle:
      "将 PM 的思维逻辑转化为 AI 可理解的结构化指令集（CLI 思维）。",
    pmThought:
      "好的产品经理不只输出需求，更设计生产需求的工厂。",
    promptTitle: "项目空间 - Prompt 原文",
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
    titleZh: "SDD 规范：精确的语言桥梁",
    titleEn: "Precision in Communication",
    principle:
      "统一向AI提需求的语言模式，使用 EARS (Easy Approach to Requirements Syntax) 消除歧义。",
    pmThought:
      "减少与 AI 的无效沟通，本质是在减少产品的开发成本。",
    promptTitle: "SDD 规范 - Prompt 原文",
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
    titleZh: "方案决策：文档先行",
    titleEn: "Docs-First Strategy",
    principle:
      "在代码落地前，先进行逻辑推演。不确定的实现，由 AI 提供实现方案（Implementation Plan）进行预评审。",
    pmThought:
      "文档是思考的留痕，也是控制项目风险的保证。",
    promptTitle: "文档先行 - Prompt 原文",
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
    titleZh: "增量迭代：螺旋式上升",
    titleEn: "Incremental Growth",
    principle:
      "遵循 基础功能 → 交互优化 → 高级功能 的路径，每一层都是对上一层的加固。",
    pmThought:
      "快不代表乱，循序渐进才能确保每一阶段的产物都是稳定的。",
    promptTitle: "增量迭代 - Prompt 原文",
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
    titleZh: "沉淀：经验的资产化",
    titleEn: "Knowledge Capitalization",
    principle:
      "里程碑完成后，将最佳实践沉淀为 .md。让下一次迭代不是重头开始，而是站在自己的肩膀上。",
    pmThought:
      "资产化思考，让未来迭代有迹可循。",
    promptTitle: "经验资产化 - Prompt 原文",
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
    titleZh: "回归：用户访谈与闭环",
    titleEn: "User-Centric Loop",
    principle:
      "走出实验室，回归真实反馈。记录毛病、AI 修复、版本进化。",
    pmThought:
      "经过用户验证才是终点。",
    promptTitle: "用户闭环 - Prompt 原文",
    promptContent: `Design a Möbius loop / closed cycle:
Feedback → Log → AI Refine → Deploy

Add user feedback bubbles at Feedback point:
- "太淡了"
- "按钮太小"

Animate continuous flow.
Show the feedback loop never ends.`,
    Illustration: MobiusLoop,
  },
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
                4天，96小时，
                <br />
                <span className="text-primary">以及我和我的 AI 伙伴</span>
                <br />
                的 124 次对话。
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-muted-foreground"
              >
                下面展示的，是本站的设计原则（以及它们如何被落实）
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
              titleZh={section.titleZh}
              titleEn={section.titleEn}
              principle={section.principle}
              pmThought={section.pmThought}
              promptTitle={section.promptTitle}
              promptContent={section.promptContent}
              illustration={<section.Illustration />}
              reversed={index % 2 === 1}
            />
          ))}
        </section>

        {/* Bottom Section */}
        <section className="py-16">
          <h2 className="text-2xl font-serif font-bold mb-6">更多感悟</h2>
          <LinkCard
            title="智能客服的下一站：从对话到执行"
            summary="记录我在 4 天里如何把 AI 变成协作伙伴，从 0 到 1 构建这个网站的全过程。"
            href="/articles/ai-collaboration-journey"
          />
        </section>
      </div>
    </div>
  );
}