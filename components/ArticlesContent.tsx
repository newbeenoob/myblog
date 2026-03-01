"use client";

import ArticleList from "./ArticleList";
import { useLanguage } from "./LanguageContext";
import { Article } from "./ArticleCard";

interface ArticlesContentProps {
  articles: Article[];
  tags: string[];
}

export default function ArticlesContent({ articles, tags }: ArticlesContentProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">{t("articles.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {t("articles.description")}
          </p>
        </header>

        {/* Tags Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground">
              {t("articles.all")}
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <ArticleList articles={articles} showAll />
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold mb-2">{t("articles.empty")}</h2>
            <p className="text-muted-foreground">
              {t("articles.emptyHint")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}