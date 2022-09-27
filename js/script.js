$(document).ready(function () {
  $("#submit").click(function () {
    let id = $("#id").val();
    
    $.get(
      "http://jsonplaceholder.typicode.com/posts?userId=" + id,
      function (posts) {
        const postList = $("#user-posts");
        $(postList).empty();
        const title = document.createElement("h2");
        title.innerHTML = `Post by User id: ${id}`;
        postList.append(title);

        posts.forEach(function (post) {
          let listItem = document.createElement("li");

          const subTitle = document.createElement("h4");
          subTitle.innerHTML = `${post.title}`;

          const body = document.createElement(`p`);
          body.innerHTML = `${post.body}`;

          const button = document.createElement(`button`);
          button.setAttribute("id", post.id);
          button.addEventListener("click", function () {
            loadComments(post.id);
          });
          button.innerText = "Show Comments";

          const commentsDiv = document.createElement(`div`);
          commentsDiv.setAttribute("id", `post-${post.id}-comments`);

          listItem.append(subTitle);
          listItem.append(body);
          listItem.append(button);
          listItem.append(commentsDiv);

          $(postList).append(listItem);
        });
      }
    );
  });

  function loadComments(postId) {
    $.get("http://jsonplaceholder.typicode.com/comments?postId" + postId).done(
      function (comments) {
        let commentsElement = "<h5>Comments:</h4>";
        comments.forEach((comment) => {
            commentsElement += `<p style='font-size:0.5rem;'>${comment.body}</p>`;
        });
        $(`#post-${postId}-comments`).html(commentsElement);
      }
    );
  }
});
