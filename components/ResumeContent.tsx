"use client";

import Timeline from "./Timeline";
import { useLanguage } from "./LanguageContext";

const timelineItemsZh = [
  {
    type: "work" as const,
    title: "高级产品经理",
    company: "科技创新公司",
    location: "北京",
    date: "2022年3月 - 至今",
    description:
      "负责核心产品的产品规划和设计，带领产品团队完成多个重要项目，推动用户增长和业务目标达成。",
    tags: ["产品规划", "用户研究", "数据分析", "团队管理"],
  },
  {
    type: "work" as const,
    title: "产品经理",
    company: "互联网科技公司",
    location: "上海",
    date: "2020年6月 - 2022年2月",
    description:
      "参与电商平台的产品设计和优化，提升用户体验和转化率，推动产品迭代。",
    tags: ["电商产品", "用户体验", "A/B测试", "数据分析"],
  },
  {
    type: "project" as const,
    title: "智能客服产品",
    date: "2023年",
    description:
      "设计并推出智能客服系统，整合AI技术，提升客户服务效率和用户满意度。",
    tags: ["AI产品", "用户研究", "产品设计", "数据分析"],
  },
  {
    type: "education" as const,
    title: "工商管理 学士",
    company: "知名大学",
    location: "北京",
    date: "2016年9月 - 2020年6月",
    description: "主修工商管理专业，专注于市场营销和产品管理方向。",
    tags: ["工商管理", "市场营销", "产品管理", "GPA 3.8"],
  },
  {
    type: "project" as const,
    title: "移动应用产品",
    date: "2023年",
    description:
      "设计并推出移动应用产品，通过用户研究和数据分析，实现用户增长和活跃度提升。",
    tags: ["移动产品", "用户研究", "A/B测试", "数据分析"],
  },
  {
    type: "work" as const,
    title: "产品助理",
    company: "创业科技公司",
    location: "北京",
    date: "2019年6月 - 2019年9月",
    description:
      "参与产品需求分析和用户研究，协助产品经理完成产品规划和设计。",
    tags: ["需求分析", "用户研究", "产品设计", "项目管理"],
  },
];

const timelineItemsEn = [
  {
    type: "work" as const,
    title: "Senior Product Manager",
    company: "Tech Innovation Co.",
    location: "Beijing",
    date: "Mar 2022 - Present",
    description:
      "Lead product planning and design for core products, managing the product team to deliver key projects and drive user growth.",
    tags: ["Product Planning", "User Research", "Data Analysis", "Team Management"],
  },
  {
    type: "work" as const,
    title: "Product Manager",
    company: "Internet Tech Co.",
    location: "Shanghai",
    date: "Jun 2020 - Feb 2022",
    description:
      "Participated in e-commerce platform product design and optimization, improving user experience and conversion rates.",
    tags: ["E-commerce", "User Experience", "A/B Testing", "Data Analysis"],
  },
  {
    type: "project" as const,
    title: "AI Customer Service Product",
    date: "2023",
    description:
      "Designed and launched an intelligent customer service system integrating AI technology to improve service efficiency.",
    tags: ["AI Product", "User Research", "Product Design", "Data Analysis"],
  },
  {
    type: "education" as const,
    title: "Bachelor of Business Administration",
    company: "Top University",
    location: "Beijing",
    date: "Sep 2016 - Jun 2020",
    description: "Major in Business Administration, focusing on Marketing and Product Management.",
    tags: ["Business Admin", "Marketing", "Product Management", "GPA 3.8"],
  },
  {
    type: "project" as const,
    title: "Mobile App Product",
    date: "2023",
    description:
      "Designed and launched a mobile app product, achieving user growth through user research and data analysis.",
    tags: ["Mobile Product", "User Research", "A/B Testing", "Data Analysis"],
  },
  {
    type: "work" as const,
    title: "Product Assistant",
    company: "Startup Tech Co.",
    location: "Beijing",
    date: "Jun 2019 - Sep 2019",
    description:
      "Participated in product requirement analysis and user research, assisting product managers with planning and design.",
    tags: ["Requirement Analysis", "User Research", "Product Design", "Project Management"],
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
            <a
              href="mailto:hello@andrews-meditations.com"
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
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}