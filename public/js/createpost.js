const createPost = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#postTitle").value.trim();
  const text = document.querySelector("#postTitle").value.trim();

  if (title && text) {
    const response = await fetch("/api/posts/create", {
      method: "POST",
      body: JSON.stringify({ title, text }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".createPostForm")
  .addEventListener("submit", createPost);
