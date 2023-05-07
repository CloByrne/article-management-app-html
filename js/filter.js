function filterArticles(articles, publishedStatus) {
  if (publishedStatus === "all") {
    return articles;
  }
  return articles.filter((article) => {
    return article.published === (publishedStatus === "published");
  });
}
  
export { filterArticles };
  