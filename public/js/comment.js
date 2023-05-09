const createComment = async (event) => {
    event.preventDefault();
    const text = document.querySelector("#commentText").value.trim();
    const post_id = document.location.pathname.split('/')[2]
  
    if (text) {
      const response = await fetch("/api/comments/create", {
        method: "POST",
        body: JSON.stringify({ text, post_id }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector(".createCommentForm")
    .addEventListener("submit", createComment);
  