const editPost = async (event) => {
  const post_id = document.location.pathname.split("/")[2];

  const response = await fetch("/edit", {
    method: "POST",
    body: JSON.stringify({ post_id }),
    headers: { "Content-Type": "application/json" },
  });
};

document.querySelector("#editPostButton").addEventListener("click", editPost);
