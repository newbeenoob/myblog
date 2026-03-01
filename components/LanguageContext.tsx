"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "zh" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  zh: {
    // Navigation
    "nav.home": "首页",
    "nav.articles": "文章",
    "nav.resume": "履历",
    "nav.about": "关于",
    // Hero
    "hero.name": "安德鲁",
    "hero.nameEn": "/ Andrew",
    "hero.description": "在技术语言和业务语言的交汇处，记录思考、分享产品见解、探索创新。",
    "hero.description2": "每一个产品决策都是一次对话，每一篇文章都是一次沉淀。",
    "hero.browseArticles": "浏览文章",
    "hero.viewResume": "查看履历",
    // Tags
    "tags.title": "关注领域",
    // Roles
    "role.pm": "B端产品经理新人",
    "role.learner": "终身学习者",
    "role.recorder": "生活记录者",
    "role.uservalue": "关注用户价值",
    "role.aitech": "关注AI技术",
    // Contact
    "contact.button": "联系我",
    "contact.title": "反馈与建议",
    "contact.description": "请扫描上方二维码关注公众号，",
    "contact.description2": "在公众号中发送消息进行反馈",
    // About
    "about.title": "关于我",
    "about.description1": "你好，我是安德鲁（Andrew），一名热爱产品和用户体验的产品经理。",
    "about.description2": "在这个博客里，我会分享关于产品设计、用户研究和商业策略的内容。",
    "about.description3": "我相信产品应该服务于用户，设计应该有温度。",
    "about.description4": "每一个产品决策都是一次学习的机会，每一篇文章都是思考的结晶。",
    "about.learnMore": "了解更多",
    // Stats
    "stats.experience": "年产品经验",
    "stats.articles": "产品文章",
    "stats.projects": "产品项目",
    "stats.growth": "用户增长",
    // Resume
    "resume.skills.pm": "产品管理",
    "resume.skills.data": "数据分析",
    "resume.skills.ai": "AI 产品方法论",
    "resume.skills.tools": "工具与方法",
    "resume.timeline": "时间线",
    "resume.cta.title": "期待与你交流",
    "resume.cta.description": "如果你想了解更多或者有机会合作，欢迎联系我！",
    "resume.cta.button": "联系我",
    // Articles
    "articles.title": "文章",
    "articles.description": "探索技术、分享思考、记录成长。在这里，我会分享关于软件开发、技术探索和个人成长的内容。",
    "articles.all": "全部",
    "articles.empty": "暂无文章",
    "articles.emptyHint": "文章正在准备中，敬请期待...",
    "articles.backToList": "返回文章列表",
    "articles.viewMore": "查看更多文章",
    "articles.author": "产品思考者",
    "articles.latest": "最新文章",
    "articles.subtitle": "探索技术，分享思考",
    "articles.viewAll": "查看全部",
    // Map
    "map.title": "现居地",
    "map.location": "中国 · 广东 · 广州",
    "map.loading": "加载中...",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.articles": "Articles",
    "nav.resume": "Resume",
    "nav.about": "About",
    // Hero
    "hero.name": "Andrew",
    "hero.nameEn": "",
    "hero.description": "Bridging technology and business, sharing product insights and exploring innovation.",
    "hero.description2": "Every product decision is a conversation, every article is a reflection.",
    "hero.browseArticles": "Browse Articles",
    "hero.viewResume": "View Resume",
    // Tags
    "tags.title": "Focus Areas",
    // Roles
    "role.pm": "B2B Product Manager",
    "role.learner": "Lifelong Learner",
    "role.recorder": "Life Recorder",
    "role.uservalue": "User Value Focus",
    "role.aitech": "AI Technology Focus",
    // Contact
    "contact.button": "Contact",
    "contact.title": "Contact / Feedback",
    "contact.description": "Scan the QR code to follow and message me",
    "contact.description2": "for feedback.",
    // About
    "about.title": "About Me",
    "about.description1": "Hi, I'm Andrew, a product manager passionate about product and user experience.",
    "about.description2": "In this blog, I share content about product design, user research, and business strategy.",
    "about.description3": "I believe products should serve users, and design should have warmth.",
    "about.description4": "Every product decision is a learning opportunity, every article is a crystallization of thought.",
    "about.learnMore": "Learn More",
    // Stats
    "stats.experience": "Years in Product",
    "stats.articles": "Articles",
    "stats.projects": "Projects",
    "stats.growth": "User Growth",
    // Resume
    "resume.skills.pm": "Product Management",
    "resume.skills.data": "Data Analysis",
    "resume.skills.ai": "AI Product Methods",
    "resume.skills.tools": "Tools & Methods",
    "resume.timeline": "Timeline",
    "resume.cta.title": "Let's Connect",
    "resume.cta.description": "If you want to learn more or collaborate, feel free to reach out!",
    "resume.cta.button": "Contact Me",
    // Articles
    "articles.title": "Articles",
    "articles.description": "Exploring technology, sharing thoughts, recording growth. Here I share software development, technical exploration, and personal growth.",
    "articles.all": "All",
    "articles.empty": "No Articles Yet",
    "articles.emptyHint": "Articles are being prepared, stay tuned...",
    "articles.backToList": "Back to Articles",
    "articles.viewMore": "View More Articles",
    "articles.author": "Product Thinker",
    "articles.latest": "Latest Articles",
    "articles.subtitle": "Exploring technology, sharing thoughts",
    "articles.viewAll": "View All",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "zh" || savedLang === "en")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const translation = translations[language][key];
    return translation !== undefined ? translation : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}