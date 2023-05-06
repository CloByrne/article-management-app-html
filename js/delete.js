async function deleteArticle(articleId) {
    const url = `http://localhost:3000/articles/${articleId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    const deletedArticle = await response.json();
    return deletedArticle;
  }
  
export { deleteArticle };
  