async function addArticle(articleData) {
    const url = "http://localhost:3000/articles";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(articleData),
    });
    const newArticle = await response.json();
    return newArticle;
  }
  
export { addArticle };
  