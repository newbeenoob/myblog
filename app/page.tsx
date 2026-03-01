import { Metadata } from "next";
import Hero from "@/components/Hero";
import HomeContent from "@/components/HomeContent";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "首页",
  description: "安德鲁的产品沉思录 - 一个关于产品、思考与生活的个人博客",
};
export default function HomePage() {
  const articles = getAllArticles().slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Rest of the page content */}
      <HomeContent articles={articles} />
    </div>
  );
}