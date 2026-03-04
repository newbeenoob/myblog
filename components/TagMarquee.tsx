"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

// Tag data with different color themes
const tagColors = [
  { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-600 dark:text-violet-400", glow: "shadow-violet-500/20" },
  { bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-600 dark:text-teal-400", glow: "shadow-teal-500/20" },
  { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-600 dark:text-blue-400", glow: "shadow-blue-500/20" },
  { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-600 dark:text-amber-400", glow: "shadow-amber-500/20" },
  { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-600 dark:text-rose-400", glow: "shadow-rose-500/20" },
  { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-600 dark:text-emerald-400", glow: "shadow-emerald-500/20" },
  { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-600 dark:text-indigo-400", glow: "shadow-indigo-500/20" },
  { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-600 dark:text-cyan-400", glow: "shadow-cyan-500/20" },
  { bg: "bg-pink-500/10", border: "border-pink-500/30", text: "text-pink-600 dark:text-pink-400", glow: "shadow-pink-500/20" },
  { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-600 dark:text-orange-400", glow: "shadow-orange-500/20" },
  { bg: "bg-sky-500/10", border: "border-sky-500/30", text: "text-sky-600 dark:text-sky-400", glow: "shadow-sky-500/20" },
  { bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/30", text: "text-fuchsia-600 dark:text-fuchsia-400", glow: "shadow-fuchsia-500/20" },
  { bg: "bg-lime-500/10", border: "border-lime-500/30", text: "text-lime-600 dark:text-lime-400", glow: "shadow-lime-500/20" },
];

const tagTranslations: Record<string, { zh: string; en: string }> = {
  "产品设计": { zh: "产品设计", en: "Product Design" },
  "B端产品": { zh: "B端产品", en: "2B Product" },
  "AI coding": { zh: "AI coding", en: "AI Coding" },
  "敏捷开发": { zh: "敏捷开发", en: "Agile Dev" },
  "项目管理": { zh: "项目管理", en: "Project Mgmt" },
  "AI教育": { zh: "AI+教育", en: "AI Education" },
  "AI客服": { zh: "AI客服", en: "AI Customer Service" },
  "AI内容营销": { zh: "AI+营销", en: "AI Marketing" },
  "评估飞轮": { zh: "评估飞轮", en: "Evaluation Flywheel" },
  "知识工程": { zh: "知识工程", en: "Knowledge Eng" },
  "数据驱动决策": { zh: "数据驱动决策", en: "Data-Driven Decisions" },
  "企业数字化转型": { zh: "企业数字化转型", en: "Enterprise Digital Transformation" },
  "AI-Native": { zh: "AI-Native", en: "AI-Native" },
  "产品求职": { zh: "产品求职", en: "PM Job Search" },
};

const tagKeys = [
  "产品设计",
  "B端产品新人",
  "AI coding",
  "敏捷开发",
  "项目管理",
  "AI教育",
  "AI客服",
  "AI内容营销",
  "评估飞轮",
  "知识工程",
  "数据驱动决策",
  "ENFJ",
  "产品求职",
];

// Split tags into two rows (alternating)
const row1Keys = tagKeys.filter((_, i) => i % 2 === 0); // 0, 2, 4, 6, 8, 10, 12
const row2Keys = tagKeys.filter((_, i) => i % 2 === 1); // 1, 3, 5, 7, 9, 11

interface TagItemProps {
  tagKey: string;
  globalIndex: number;
  language: "zh" | "en";
}

function TagItem({ tagKey, globalIndex, language }: TagItemProps) {
  const color = tagColors[globalIndex % tagColors.length];
  const tag = tagTranslations[tagKey]?.[language] || tagKey;

  return (
    <span
      className={`
        inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium
        ${color.bg} ${color.border} ${color.text}
        border transition-all duration-300
        hover:shadow-lg ${color.glow}
        hover:-translate-y-0.5 hover:brightness-110
        cursor-default select-none whitespace-nowrap
      `}
    >
      {tag}
    </span>
  );
}

export default function TagMarquee() {
  const { t, language } = useLanguage();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // If reduced motion is preferred, show static tags
  if (prefersReducedMotion) {
    return (
      <div className="w-full">
        <h3 className="text-center text-lg font-semibold text-muted-foreground mb-4">
          {t("tags.title")}
        </h3>
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {tagKeys.map((tagKey, index) => (
            <TagItem key={tagKey} tagKey={tagKey} globalIndex={index} language={language} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Title */}
      <h3 className="text-center text-lg font-semibold text-muted-foreground mb-4">
        {t("tags.title")}
      </h3>

      {/* Marquee container */}
      <div
        className="space-y-3"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Row 1: Left to Right */}
        <div className="relative overflow-hidden">
          <div
            className={`flex gap-3 animate-marquee-ltr ${isPaused ? "animation-paused" : ""}`}
            style={isPaused ? { animationPlayState: "paused" } : {}}
          >
            {/* Double the tags for seamless loop */}
            {[...row1Keys, ...row1Keys].map((tagKey, index) => (
              <TagItem
                key={`row1-${index}`}
                tagKey={tagKey}
                globalIndex={tagKeys.indexOf(tagKey)}
                language={language}
              />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="relative overflow-hidden">
          <div
            className={`flex gap-3 animate-marquee-rtl ${isPaused ? "animation-paused" : ""}`}
            style={isPaused ? { animationPlayState: "paused" } : {}}
          >
            {/* Double the tags for seamless loop */}
            {[...row2Keys, ...row2Keys].map((tagKey, index) => (
              <TagItem
                key={`row2-${index}`}
                tagKey={tagKey}
                globalIndex={tagKeys.indexOf(tagKey)}
                language={language}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}