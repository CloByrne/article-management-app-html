async function updateArticle(articleId, formData) {
  const url = `http://localhost:3000/articles/${articleId}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      title: formData.get("title"),
      body: formData.get("body"),
      published: formData.get("published"),
    }),
  });
  const updatedArticle = await response.json();
  return updatedArticle;
}
  