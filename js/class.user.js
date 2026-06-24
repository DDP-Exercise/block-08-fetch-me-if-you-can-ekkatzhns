"use strict";

/*******************************************************
 *  Users
 *
 *  See: https://jsonplaceholder.typicode.com/users
 *
 *  Your users should have:
 *      -id
 *      -name
 *      -username
 *      -email
 *      -website
 *
 *  You can skip address, phone and company.
 *
 *  users should also have posts[] (see main.js).
 *
 *  When printing a user, don't forget to make
 *      - href="mailto:.." for the email and
 *      - href=".." target="_blank" for the website.
 *  *******************************************************/

export default class User {
    constructor({ id, name, username, email, website }) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.website = website;
        this.posts = [];
    }

    addPost(post) {
        this.posts.push(post);
    }

    render() {
        const userElement = document.createElement("article");
        userElement.classList.add("user");

        userElement.innerHTML = `
      <h2>${this.name}</h2>
      <p><strong>Username:</strong> ${this.username}</p>
      <p>
        <strong>Email:</strong>
        <a href="mailto:${this.email}">${this.email}</a>
      </p>
      <p>
        <strong>Website:</strong>
        <a href="https://${this.website}" target="_blank">${this.website}</a>
      </p>
      <button class="show-posts-btn">Show posts</button>
      <div class="posts"></div>
    `;

        const button = userElement.querySelector(".show-posts-btn");
        const postsContainer = userElement.querySelector(".posts");

        let postsVisible = false;

        button.addEventListener("click", () => {
            if (postsVisible) {
                postsContainer.innerHTML = "";
                button.textContent = "Show posts";
                postsVisible = false;
                return;
            }

            postsContainer.innerHTML = "";

            this.posts.forEach((post) => {
                postsContainer.append(post.render());
            });

            button.textContent = "Hide posts";
            postsVisible = true;
        });

        return userElement;
    }
}