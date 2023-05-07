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
  
    // Gets the radio buttons
    const showPublished = document.querySelector(
        'input[name="showPublished"]:checked'
      ).value;

    // Filters the articles based on the selected radio button
    const filteredArticles = articles.filter((article) => {
        if (showPublished === "published") {
        return article.published;
        } else if (showPublished === "unpublished") {
        return !article.published;
        } else {
        return true;
        }
    });

    // Loops through each filtered article and creates a div element to display it
    filteredArticles.forEach((article) => {
        const articleDiv = document.createElement("div");
        articleDiv.classList.add("article");      

      // Creates a div element for the title and buttons
        const titleAndButtonsDiv = document.createElement("div");
        titleAndButtonsDiv.classList.add("title-and-buttons");
  
      // Creates a heading element for the article title
      const title = document.createElement("h3");
      title.innerText = article.title;
      articleDiv.appendChild(title);
  
      // Creates a button element for expanding/collapsing the article body
      const expandBtn = document.createElement("button");
      expandBtn.innerText = "Expand";
      expandBtn.classList.add("expand-btn");
      articleDiv.appendChild(expandBtn);
  
      // Creates a paragraph element for the article body
      const body = document.createElement("p");
      body.innerText = article.body;
      articleDiv.appendChild(body);
      body.style.display = "none";
      body.id = `article-body-${article.id}`; 
  
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
  
      // Add event listener to expand/collapse button
      expandBtn.addEventListener("click", () => {
        if (body.style.display === "none") {
          body.style.display = "block";
          expandBtn.innerText = "Collapse";
        } else {
          body.style.display = "none";
          expandBtn.innerText = "Expand";
        }
      });
    });
    // Add event listeners to the radio buttons
    const showPublishedRadios = document.querySelectorAll('input[name="showPublished"]');
    showPublishedRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
            renderArticles(articles);
        });
    });
}
  