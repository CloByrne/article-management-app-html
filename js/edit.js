async function updateArticle(articleId, articleData) {
    const url = `http://localhost:3000/articles/${articleId}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(articleData),
    });
    const updatedArticle = await response.json();
    return updatedArticle;
  }
  
export { updateArticle };
  