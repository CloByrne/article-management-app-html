import { fetchArticles, renderArticles } from "./data.js";

const BASE_URL = "http://localhost:3000";

const articleList = document.querySelector("#articles");
const addForm = document.querySelector("#add-form");
const editForm = document.querySelector("#edit-form");

async function loadData() {
  try {
    const response = await fetch(`${BASE_URL}/articles`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    renderArticles(data);

  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadData();
});

// Add event listener to "Add Article" button
document.querySelector("#add-btn").addEventListener("click", () => {
  addForm.style.display = "block";
  editForm.style.display = "none";
});

// Add event listener to "Submit" button in "Add Article" form
document.querySelector("#add-submit").addEventListener("click", async (e) => {
  e.preventDefault();

  const title = document.querySelector("#add-title").value;
  const content = document.querySelector("#add-content").value;
  const published = document.querySelector("#add-published").checked;

  const response = await fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, published }),
  });

  if (!response.ok) {
    console.error("Error adding article");
  } else {
    addForm.style.display = "none";
    renderArticles(await fetchArticles());
  }
});

// Add event listener to "Edit" button for each article
articleList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const articleId = e.target.getAttribute("data-id");
    const article = await fetch(`${BASE_URL}/articles/${articleId}`, {
      headers: { Accept: "application/json" },
    }).then((res) => res.json());

    document.querySelector("#edit-id").value = article.id;
    document.querySelector("#edit-title").value = article.title;
    document.querySelector("#edit-content").value = article.content;
    document.querySelector("#edit-published").checked = article.published;

    addForm.style.display = "none";
    editForm.style.display = "block";
  }
});

// Add event listener to "Submit" button in "Edit Article" form
document
  .querySelector("#edit-submit")
  .addEventListener("click", async (e) => {
    e.preventDefault();

    const id = document.querySelector("#edit-id").value;
    const title = document.querySelector("#edit-title").value;
    const content = document.querySelector("#edit-content").value;
    const published = document.querySelector("#edit-published").checked;

    const response = await fetch(`${BASE_URL}/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, published }),
    });

    if (!response.ok) {
      console.error("Error editing article");
    } else {
      addForm.style.display = "none";
      editForm.style.display = "none";
      renderArticles(await fetchArticles());
    }
  });

// Add event listener to "Delete" button for each article
articleList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const articleId = e.target.getAttribute("data-id");

    const response = await fetch(`${BASE_URL}/articles/${articleId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Error deleting article");
    } else {
      renderArticles(await fetchArticles());
    }
  }
});

// Render initial list of articles on page load
renderArticles(await fetchArticles());
