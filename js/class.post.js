"use strict";

/*******************************************************
 *  Posts
 *
 *  See: https://jsonplaceholder.typicode.com/posts
 *
 *  Your posts should have:
 *      -id
 *      -title
 *      -body
 *
 *  You can skip the userId, your users know their posts (see class.user.js)
 *
 *  posts should also have comments[] (see main.js).
 *
 *  When printing a post, don't forget to make a button that
 *  loads the comments for the post. Once they are loaded, print them.
 *  *******************************************************/
export default class Post {

    constructor({ id, title, body }) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.comments = [];
        this.commentsLoaded = false;

    }

    async loadComments() {
        if (this.commentsLoaded) {
            return this.comments;
        }

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${this.id}/comments`
        );
        const comments = await response.json()
        this.comments = comments;
        this.commentsLoaded = true;
        return this.comments;
    }

    render() {
        const postElement = document.createElement("article");
        postElement.classList.add("post");
        postElement.innerHTML = `
      <h3>${this.title}</h3>
      <p>${this.body}</p>
      <button class="load-comments-btn">Load comments</button>
      <div class="comments"></div>
    `;

        const button = postElement.querySelector(".load-comments-btn");
        const commentsContainer = postElement.querySelector(".comments");
        button.addEventListener("click", async () => {
            commentsContainer.innerHTML = "Loading...";
            const comments = await this.loadComments();
            commentsContainer.innerHTML = "";
            comments.forEach((comment) => {
                const commentElement = document.createElement("div");
                commentElement.classList.add("comment");
                commentElement.innerHTML = `
          <h4>${comment.name}</h4>
          <p>${comment.body}</p>
          <small>${comment.email}</small>

        `;
                commentsContainer.append(commentElement);
            });
        });
        return postElement;

    }

}