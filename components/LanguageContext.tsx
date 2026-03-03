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
    "hero.aboutSite": "关于本站",
    "hero.aboutSiteTooltip": "点击速览本站的设计过程与设计原则 👀",
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
    "about.section1.title": "初始化：最简可行原则",
    "about.section1.principle": "拒绝过度设计，通过三点定面快速破局：核心页面、技术栈、审美风格。",
    "about.section1.pmThought": "在模糊中建立秩序，是产品起步阶段最高效的决策。",
    "about.section1.promptTitle": "初始化 - Prompt 原文",
    "about.section2.title": "项目空间：PM 的 AI 数字化基座",
    "about.section2.principle": "将 PM 的思维逻辑转化为 AI 可理解的结构化指令集（CLI 思维）。",
    "about.section2.pmThought": "好的产品经理不只输出需求，更设计生产需求的工厂。",
    "about.section2.promptTitle": "项目空间 - Prompt 原文",
    "about.section3.title": "SDD 规范：精确的语言桥梁",
    "about.section3.principle": "统一向AI提需求的语言模式，使用 EARS (Easy Approach to Requirements Syntax) 消除歧义。",
    "about.section3.pmThought": "减少与 AI 的无效沟通，本质是在减少产品的开发成本。",
    "about.section3.promptTitle": "SDD 规范 - Prompt 原文",
    "about.section4.title": "方案决策：文档先行",
    "about.section4.principle": "在代码落地前，先进行逻辑推演。不确定的实现，由 AI 提供实现方案（Implementation Plan）进行预评审。",
    "about.section4.pmThought": "文档是思考的留痕，也是控制项目风险的保证。",
    "about.section4.promptTitle": "文档先行 - Prompt 原文",
    "about.section5.title": "增量迭代：螺旋式上升",
    "about.section5.principle": "遵循 基础功能 → 交互优化 → 高级功能 的路径，每一层都是对上一层的加固。",
    "about.section5.pmThought": "每一次迭代都是一次加固，而不是推翻重来。",
    "about.section5.promptTitle": "增量迭代 - Prompt 原文",
    "about.section6.title": "沉淀：知识复利",
    "about.section6.principle": "将临时对话沉淀为长期规则，让 AI 成为可复用的协作伙伴。",
    "about.section6.pmThought": "真正的效率提升，来自于知识的沉淀和复用。",
    "about.section6.promptTitle": "知识沉淀 - Prompt 原文",
    "about.section7.title": "反馈闭环：持续优化",
    "about.section7.principle": "通过用户反馈和数据洞察，不断优化产品体验和 AI 协作流程。",
    "about.section7.pmThought": "反馈是产品迭代的源动力，也是 AI 学习的最佳素材。",
    "about.section7.promptTitle": "反馈闭环 - Prompt 原文",
    "about.hero.title": "4天，96小时，以及我和我的 AI 伙伴的 124 次对话。",
    "about.hero.description": "下面展示的，是本站的设计原则（以及它们如何被落实）",
    "about.moreInsights": "更多感悟",
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
    // Footer
    "footer.brand": "安德鲁的产品思考",
    "footer.description": "在技术语言和业务语言的交汇处，记录思考、分享产品见解、探索创新。",
    "footer.nav": "导航",
    "footer.resources": "资源",
    "footer.rss": "RSS 订阅",
    "footer.sitemap": "站点地图",
    "footer.copyright": "© {{year}} 安德鲁的产品思考. All rights reserved.",
    "footer.builtWith": "Built with",
    "footer.love": "♥",
    "footer.tech": "using Next.js & Tailwind CSS",
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
    "hero.aboutSite": "About Site",
    "hero.aboutSiteTooltip": "Click to browse the design process and principles of this site 👀",
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
    "about.description1": "Hello, I'm Andrew, a product manager passionate about product and user experience.",
    "about.description2": "In this blog, I share content about product design, user research, and business strategy.",
    "about.description3": "I believe products should serve users, and design should have temperature.",
    "about.description4": "Every product decision is a learning opportunity, every article is a crystallization of thought.",
    "about.learnMore": "Learn More",
    "about.section1.title": "The Minimalist Initialization",
    "about.section1.principle": "Reject over-engineering, break through quickly with three pillars: core pages, tech stack, and visual tone.",
    "about.section1.pmThought": "Establishing order in ambiguity is the most efficient decision in the product startup phase.",
    "about.section1.promptTitle": "Initialization - Prompt Original",
    "about.section2.title": "Digital Foundation",
    "about.section2.principle": "Transform PM's thinking logic into structured instructions that AI can understand (CLI mindset).",
    "about.section2.pmThought": "Good product managers not only output requirements, but also design factories that produce requirements.",
    "about.section2.promptTitle": "Project Space - Prompt Original",
    "about.section3.title": "Precision in Communication",
    "about.section3.principle": "Unify the language pattern for requesting AI, use EARS (Easy Approach to Requirements Syntax) to eliminate ambiguity.",
    "about.section3.pmThought": "Reducing ineffective communication with AI essentially reduces product development costs.",
    "about.section3.promptTitle": "SDD Specification - Prompt Original",
    "about.section4.title": "Docs-First Strategy",
    "about.section4.principle": "Before coding, conduct logical deduction. For uncertain implementations, have AI provide an Implementation Plan for pre-review.",
    "about.section4.pmThought": "Documentation is a record of thinking and a guarantee to control project risks.",
    "about.section4.promptTitle": "Docs-First - Prompt Original",
    "about.section5.title": "Incremental Growth",
    "about.section5.principle": "Follow the path: Basic Functions → Interaction Optimization → Advanced Features, each layer reinforces the previous one.",
    "about.section5.pmThought": "Every iteration is a reinforcement, not a complete overhaul.",
    "about.section5.promptTitle": "Incremental Iteration - Prompt Original",
    "about.section6.title": "Knowledge Compounding",
    "about.section6.principle": "Precipitate temporary conversations into long-term rules, making AI a reusable collaboration partner.",
    "about.section6.pmThought": "Genuine efficiency improvement comes from knowledge precipitation and reuse.",
    "about.section6.promptTitle": "Knowledge Precipitation - Prompt Original",
    "about.section7.title": "Feedback Loop",
    "about.section7.principle": "Continuously optimize product experience and AI collaboration processes through user feedback and data insights.",
    "about.section7.pmThought": "Feedback is the driving force for product iteration and the best material for AI learning.",
    "about.section7.promptTitle": "Feedback Loop - Prompt Original",
    "about.hero.title": "4 Days, 96 Hours, and 124 Conversations with My AI Partner.",
    "about.hero.description": "Below are the design principles of this site (and how they were implemented)",
    "about.moreInsights": "More Insights",
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
    // Map
    "map.title": "Current Location",
    "map.location": "China · Guangdong · Guangzhou",
    "map.loading": "Loading...",
    // Footer
    "footer.brand": "Andrew's Product Thoughts",
    "footer.description": "Bridging technology and business, sharing product insights and exploring innovation.",
    "footer.nav": "Navigation",
    "footer.resources": "Resources",
    "footer.rss": "RSS Feed",
    "footer.sitemap": "Sitemap",
    "footer.copyright": "© {{year}} Andrew's Product Thoughts. All rights reserved.",
    "footer.builtWith": "Built with",
    "footer.love": "♥",
    "footer.tech": "using Next.js & Tailwind CSS",
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
    return translations[language][key] as string;
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