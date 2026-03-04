"use client";

import { useState } from "react";
import Timeline from "./Timeline";
import ProfileCard from "./ProfileCard";
import { useLanguage } from "./LanguageContext";
import ContactFormModal from "./ContactFormModal";

const timelineItemsZh = [
  {
    type: "work" as const,
    title: "中台产品经理",
    company: "货拉拉科技",
    location: "深圳",
    date: "2025年7月 - 2025年10月",
    description:
      "深度参与大模型驱动的客服中台全流程建设，负责从需求分析、指标拆解到模型优化的闭环管理。凭借对多业务场景的模块化抽象与算法调优，显著优化了分流率与理解准确度等核心体验指标，高效赋能搬家、货运等多条业务线。",
    tags: ["智能客服", "中后台产品", "数据分析", "评测飞轮"],
  },
  {
    type: "work" as const,
    title: "产品经理",
    company: "筷子科技",
    location: "广州",
    date: "2025年2月 - 2025年5月",
    description:
      "参与 AI 搜索工具“灵光索”迭代，通过重构“意图理解-内容检索”链路及 120 条歧义评测集，驱动对话轮次提升 75%，灵感采集率提升近 60%。",
    tags: ["AI内容营销", "用户体验", "A/B测试", "数据分析"],
  },
  {
    type: "project" as const,
    title: "智能客服中台升级",
    date: "2025年",
    description:
      "参与大模型智能客服中台升级设计，通过模块化配置与 300+ 场景评测集，将工单自动填充准确率提升至 87.6%。在 A/B 测试中实现一次解答率提升 4%，并预计缩短客服 25% 的平均话后处理时长，实现了服务效率与 AI 落地效果的双重增长。",
    tags: ["AI产品", "用户研究", "产品设计", "数据分析"],
  },
  {
    type: "education" as const,
    title: "华南农业大学 硕士",
    company: "人工智能 专业硕士",
    location: "广州",
    date: "2023年9月 - 2026年6月",
    description: "主修人工智能专业，专注于 AI 产品设计与开发。",
    tags: ["人工智能", "自然语言处理", "计算机视觉", "GPA 3.8"],
  },

  {
    type: "work" as const,
    title: "产品助理",
    company: "津虹数字科技",
    location: "广州",
    date: "2024年6月 - 2024年12月",
    description:
      "深度参与 AIGC 绘本从预研到交付的全生命周期，定义了包含写作、文生图及 TTS 的核心逻辑链条，通过 MVP 快速验证确保了教育内容的合规性与一致性。",
    tags: ["AI+在线教育", "产品设计", "MVP产品" , "项目管理"],
  },
];

const timelineItemsEn = [
  {
    type: "work" as const,
    title: "Middle Platform Product Manager",
    company: "Lalamove Technology",
    location: "Shenzhen",
    date: "Jul 2025 - Oct 2025",
    description:
      "Deeply involved in the full-process construction of a large model-driven customer service middle platform, responsible for closed-loop management from requirement analysis, metric decomposition to model optimization. Through modular abstraction of multiple business scenarios and algorithm tuning, significantly optimized core experience metrics such as diversion rate and understanding accuracy, efficiently empowering multiple business lines including moving and freight.",
    tags: ["Intelligent Customer Service", "Middle Platform Product", "Data Analysis", "Evaluation Flywheel"],
  },
  {
    type: "work" as const,
    title: "Product Manager",
    company: "Kuaizi Technology",
    location: "Guangzhou",
    date: "Feb 2025 - May 2025",
    description:
      "Participated in the iteration of AI search tool 'Lingguangsuo', driving a 75% increase in conversation rounds and nearly 60% increase in inspiration collection rate by reconstructing the 'intent understanding - content retrieval' link and 120 ambiguity evaluation sets.",
    tags: ["AI Content Marketing", "User Experience", "A/B Testing", "Data Analysis"],
  },
  {
    type: "project" as const,
    title: "Intelligent Customer Service Middle Platform Upgrade",
    date: "2025",
    description:
      "Participated in the upgrade design of a large model intelligent customer service middle platform, improving the automatic ticket filling accuracy to 87.6% through modular configuration and 300+ scenario evaluation sets. Achieved a 4% increase in one-time resolution rate in A/B testing, and is expected to shorten the average post-call processing time by 25%, achieving dual growth in service efficiency and AI implementation effects.",
    tags: ["AI Product", "User Research", "Product Design", "Data Analysis"],
  },
  {
    type: "education" as const,
    title: "Master of Artificial Intelligence",
    company: "South China Agricultural University",
    location: "Guangzhou",
    date: "Sep 2023 - Jun 2026",
    description: "Major in Artificial Intelligence, focusing on AI product design and development.",
    tags: ["Artificial Intelligence", "Natural Language Processing", "Computer Vision", "GPA 3.8"],
  },
  {
    type: "work" as const,
    title: "Product Assistant",
    company: "Jinhong Digital Technology",
    location: "Guangzhou",
    date: "Jun 2024 - Dec 2024",
    description:
      "Deeply involved in the full lifecycle of AIGC picture books from pre-research to delivery, defining the core logic chain including writing, text-to-image, and TTS. Ensured the compliance and consistency of educational content through MVP rapid validation.",
    tags: ["AI + Online Education", "Product Design", "MVP Product", "Project Management"],
  },
];

const skillsZh = {
  pm: {
    title: "产品管理",
    items: ["需求分析", "业务流程梳理", "原型设计", "项目管理"],
  },
  data: {
    title: "数据分析",
    items: ["数据看板", "漏斗分析", "A/B测试", "SQL"],
  },
  ai: {
    title: "AI 产品方法论",
    items: ["提示词工程", "评估飞轮", "知识工程", "工作流设计"],
  },
  tools: {
    title: "工具与方法",
    items: ["Figma", "Jira", "敏捷开发", "Cursor", "Google AI Studio"],
  },
};

const skillsEn = {
  pm: {
    title: "Product Management",
    items: ["Requirement Analysis", "Process Mapping", "Prototyping", "Project Management"],
  },
  data: {
    title: "Data Analysis",
    items: ["Dashboards", "Funnel Analysis", "A/B Testing", "SQL"],
  },
  ai: {
    title: "AI Product Methods",
    items: ["Prompt Engineering", "Evaluation Flywheel", "Knowledge Engineering", "Workflow Design"],
  },
  tools: {
    title: "Tools & Methods",
    items: ["Figma", "Jira", "Agile", "Cursor", "Google AI Studio"],
  },
};

export default function ResumeContent() {
  const { language, t } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const timelineItems = language === "zh" ? timelineItemsZh : timelineItemsEn;
  const skills = language === "zh" ? skillsZh : skillsEn;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">{t("nav.resume")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "zh"
              ? "记录成长轨迹，分享职业历程。每一次经历都是宝贵的财富。"
              : "Recording growth milestones, sharing career journey. Every experience is a valuable asset."}
          </p>
        </header>

        {/* Profile Card */}
        <ProfileCard />

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">
            {language === "zh" ? "技能专长" : "Skills & Expertise"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-border/50 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                {skills.pm.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.pm.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-0.5 rounded-md text-sm bg-muted text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border/50 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                {skills.data.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.data.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-0.5 rounded-md text-sm bg-muted text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border/50 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {skills.ai.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.ai.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-0.5 rounded-md text-sm bg-muted text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border/50 bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                {skills.tools.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-0.5 rounded-md text-sm bg-muted text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-8">{t("resume.timeline")}</h2>
          <Timeline items={timelineItems} />
        </section>

        {/* Contact CTA */}
        <section className="mt-16 text-center">
          <div className="p-8 rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-2xl font-semibold mb-2">{t("resume.cta.title")}</h2>
            <p className="text-muted-foreground mb-6">
              {t("resume.cta.description")}
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {t("resume.cta.button")}
            </button>
            <ContactFormModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
          </div>
        </section>
      </div>
    </div>
  );
}