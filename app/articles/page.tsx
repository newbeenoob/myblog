import { Metadata } from "next";
import ArticlesContent from "@/components/ArticlesContent";
import { getAllArticles, getAllTags } from "@/lib/articles";

export const metadata: Metadata = {
  title: "文章",
  description: "浏览所有技术文章，探索前端开发、人工智能和软件工程等领域的知识。",
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  const tags = getAllTags();

  return <ArticlesContent articles={articles} tags={tags} />;
}