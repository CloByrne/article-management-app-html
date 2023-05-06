import { fetchArticles, renderArticles } from "./data.js";
document.addEventListener("DOMContentLoaded", () => {

const BASE_URL = "http://localhost:3000";

const articleList = document.querySelector("#article-list");
const addForm = document.querySelector("#add-form");
const editForm = document.querySelector("#edit-form");


// Clear forms when they are hidden
addForm.addEventListener("transitionend", () => {
  if (addForm.style.display === "none") {
    addForm.reset();
  }
});

editForm.addEventListener("transitionend", () => {
  if (editForm.style.display === "none") {
    editForm.reset();
  }
});

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

// Add event listener to "Submit" button in "Add Article" form
const addSubmitBtn = document.querySelector("#add-submit");
if (addSubmitBtn) {
  addSubmitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const title = document.querySelector("#add-title").value;
    

    const body = document.querySelector("#add-body").value;
    console.log("Body value: ", body);
    const published = document.querySelector("#add-published").checked;

    const response = await fetch(`${BASE_URL}/articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, published }),
    });

    if (!response.ok) {
        console.error("Error adding article");
      } else {
        renderArticles(await fetchArticles());
      
        // Clear the form after submission
        document.querySelector("#add-title").value = "";
        document.querySelector("#add-body").value = "";
        document.querySelector("#add-published").checked = false;
      
        // Show the main content again after the pop-up box is closed
        const mainContent = document.querySelector("#main-body");
        console.log(mainContent); // add this line
        mainContent.style.display = "block";
      }      
    });
  }

// Add event listener to "Edit" button for each article
articleList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const articleId = e.target.getAttribute("data-id");
      const article = await fetch(`${BASE_URL}/articles/${articleId}`, {
        headers: { Accept: "application/json" },
      }).then((res) => res.json());
  
      renderEditForm(article);
    }
  });
  
  // Render the edit form and populate it with data from the selected article
  function renderEditForm(article) {
    const editForm = document.createElement("form");
    const main = document.querySelector("#main-body");

    editForm.id = "edit-form";
    editForm.innerHTML = `
      <h2>Edit Article</h2>
      <label for="edit-title">Title</label>
      <input type="text" id="edit-title" name="title" value="${article.title}">
      <label for="edit-body">Body</label>
      <textarea id="edit-body" name="body">${article.body}</textarea>
      <label for="edit-published">Published</label>
      <input type="checkbox" id="edit-published" name="published" ${article.published ? "checked" : ""}>
      <div>
        <button type="submit" id="edit-submit">Save</button>
        <button type="button" id="edit-cancel">Cancel</button>
      </div>
    `;
    articleList.style.display = "none";
    if (main) {
        main.appendChild(editForm);
    }
  
    // Add event listener to "Submit" button in "Edit Article" form
    const editSubmitBtn = document.querySelector("#edit-submit");
    console.log(editSubmitBtn); // Debugging statement
    editSubmitBtn.addEventListener("click", async (e) => {
      e.preventDefault();
  
      const id = article.id;
      const title = document.querySelector("#edit-title").value;
      const body = document.querySelector("#edit-body").value;
      const published = document.querySelector("#edit-published").checked;
  
      const response = await fetch(`${BASE_URL}/articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, published }),
      });
  
      if (!response.ok) {
        console.error("Error editing article");
      } else {
        articleList.style.display = "block";
        main.removeChild(editForm);
        renderArticles(await fetchArticles());
      }
    });
  
    // Add event listener to "Cancel" button in "Edit Article" form
    const editCancelBtn = document.querySelector("#edit-cancel");
    editCancelBtn.addEventListener("click", () => {
      articleList.style.display = "block";
      main.removeChild(editForm);
    });
  }
  
  

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
});

// Render initial list of articles on page load
renderArticles(await fetchArticles());
