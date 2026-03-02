const { getAllArticles } = require('./lib/articles');

async function testArticles() {
  try {
    const articles = getAllArticles();
    console.log('Articles found:', articles.length);
    articles.forEach(article => {
      console.log('\nArticle:', article.title);
      console.log('Slug:', article.slug);
      console.log('Date:', article.date);
      console.log('Tags:', article.tags);
      console.log('Description:', article.description);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

testArticles();