import { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "关于本站",
  description: "了解本站的设计原则和 AI 协作方法，探索产品经理如何与 AI 伙伴共同构建数字产品。",
};

export default function AboutPage() {
  return <AboutContent />;
}