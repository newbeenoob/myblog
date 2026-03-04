"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { motion } from "framer-motion";

export default function ProfileCard() {
  const { language } = useLanguage();
  const [imageError, setImageError] = useState(false);

  // Profile data
  const profileData = {
    name: language === "zh" ? "安德鲁 Andrew" : "Andrew",
    identity:
      language === "zh"
        ? "B端 产品经理 ｜ 应届生 ｜ 现居广州 ｜ 求职中"
        : "B2B Product Manager ｜ Fresh Graduate ｜ Based in Guangzhou ｜ Open to Work",
    focus:
      language === "zh"
        ? "关注AI 能力 在真实业务场景中的结构化落地"
        : "Focused on structured implementation of AI tech in real business scenarios",
    motto: '"流水不争先，争的是滔滔不绝"',
  };

  return (
    <div
      className="w-full p-6 sm:p-8 rounded-2xl mb-10"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(42, 47, 58, 0.8)",
      }}
    >
      {/* Desktop: Two columns layout */}
      <div className="hidden sm:flex items-center gap-5">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {!imageError ? (
            <motion.img
              src="/images/avatar.png"
              alt="Andrew avatar"
              className="w-20 h-20 rounded-full object-cover"
              onError={() => setImageError(true)}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
          ) : (
            <motion.div
              className="w-20 h-20 rounded-full bg-muted flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-2xl font-bold text-muted-foreground">A</span>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-foreground mb-1">{profileData.name}</h2>
          <p className="text-sm text-muted-foreground mb-1">{profileData.identity}</p>
          <p className="text-sm text-muted-foreground/70">{profileData.focus}</p>
          <p className="text-xs text-muted-foreground/50 mt-2 italic">{profileData.motto}</p>
        </div>
      </div>

      {/* Mobile: Stacked layout */}
      <div className="sm:hidden text-center">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          {!imageError ? (
            <motion.img
              src="/images/avatar.png"
              alt="Andrew avatar"
              className="w-20 h-20 rounded-full object-cover"
              onError={() => setImageError(true)}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
          ) : (
            <motion.div
              className="w-20 h-20 rounded-full bg-muted flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-2xl font-bold text-muted-foreground">A</span>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-foreground mb-1">{profileData.name}</h2>
        <p className="text-sm text-muted-foreground mb-1">{profileData.identity}</p>
        <p className="text-sm text-muted-foreground/70">{profileData.focus}</p>
        <p className="text-xs text-muted-foreground/50 mt-2 italic">{profileData.motto}</p>
      </div>
    </div>
  );
}