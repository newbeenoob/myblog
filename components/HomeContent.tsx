"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import ArticleList from "./ArticleList";
import QRCode from "./QRCode";
import { useLanguage } from "./LanguageContext";
import { Article } from "./ArticleCard";

// Dynamically import the map component to avoid SSR issues with Leaflet
const ResidenceMapCard = dynamic(() => import("./ResidenceMapCard"), {
  ssr: false,
  loading: () => (
    <div className="w-full">
      <h2 className="text-3xl font-serif font-bold mb-4">现居地</h2>
      <div className="w-full aspect-[3/2] sm:aspect-[16/9] rounded-xl border border-border/50 bg-muted/30 animate-pulse" />
      <p className="text-muted-foreground text-sm mt-2 text-center">加载中...</p>
    </div>
  ),
});

interface HomeContentProps {
  articles: Article[];
}

export default function HomeContent({ articles }: HomeContentProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Latest Articles Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-2">{t("articles.latest")}</h2>
              <p className="text-muted-foreground">{t("articles.subtitle")}</p>
            </div>
            <Link
              href="/articles"
              className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              {t("articles.viewAll")}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <ArticleList articles={articles} />

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              {t("articles.viewAll")}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-4">{t("about.title")}</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {t("about.description1")}
                <br />
                {t("about.description2")}
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t("about.description3")}
                <br />
                {t("about.description4")}
              </p>
              <div className="flex gap-4">
                <a
                  href="/resume"
                  className="px-6 py-2 rounded-lg font-medium border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-300"
                >
                  {t("about.learnMore")}
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <QRCode />
            </div>
          </div>
        </div>
      </section>

      {/* Residence Map Section - Added here after About, before Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ResidenceMapCard enableClouds={true} enablePlane={true} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">1+</div>
              <div className="text-muted-foreground">{t("stats.experience")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">10+</div>
              <div className="text-muted-foreground">{t("stats.articles")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">5+</div>
              <div className="text-muted-foreground">{t("stats.projects")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">1000+</div>
              <div className="text-muted-foreground">{t("stats.growth")}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}