import { getAllArticles } from "@/lib/articles";

export async function GET() {
  const baseUrl = "https://andrews-meditations.com";
  const articles = getAllArticles();

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>安德鲁的沉思录</title>
    <link>${baseUrl}</link>
    <description>一个关于技术、思考与生活的个人博客。探索软件开发的奥秘，分享生活感悟，记录成长点滴。</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${articles
      .map((article) => {
        const pubDate = new Date(article.date).toUTCString();
        return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/articles/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/articles/${article.slug}</guid>
      <description><![CDATA[${article.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${article.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}