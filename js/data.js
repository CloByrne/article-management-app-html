// Sets the base URL for the API requests
const BASE_URL = "http://localhost:3000";

// Fetches the articles data from the API
export async function fetchArticles() {
  try {
    const response = await fetch(`${BASE_URL}/articles`, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Renders the articles on the webpage
export function renderArticles(articles) {
  // Gets the element where the articles will be displayed
  const articleList = document.querySelector("#article-list");
  // Clears any existing articles from the element
  articleList.innerHTML = "";
  // Loops through each article and creates a div element to display it
  articles.forEach((article) => {
    const articleDiv = document.createElement("div");
    articleDiv.classList.add("article");

    // Creates a heading element for the article title
    const title = document.createElement("h3");
    title.innerText = article.title;
    articleDiv.appendChild(title);

    // Creates a paragraph element for the article content
    const content = document.createElement("p");
    content.innerText = article.content;
    articleDiv.appendChild(content);

    // Creates a paragraph element for the published status of the article
    const published = document.createElement("p");
    published.innerText = `Published: ${article.published ? "Yes" : "No"}`;
    articleDiv.appendChild(published);

    // Creates a div element for the buttons (edit and delete)
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    // Creates a button element for editing the article
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.setAttribute("data-id", article.id);
    buttonsDiv.appendChild(editBtn);

    // Creates a button element for deleting the article
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.setAttribute("data-id", article.id);
    buttonsDiv.appendChild(deleteBtn);

    // Adds the buttons div to the article div
    articleDiv.appendChild(buttonsDiv);
    // Adds the article div to the article list element
    articleList.appendChild(articleDiv);
  });
}
