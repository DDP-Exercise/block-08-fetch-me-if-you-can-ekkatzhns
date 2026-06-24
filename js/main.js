"use strict";

/*******************************************************
 *    Asynchronotrigger - 100p
 *
 *    This is your last assignment. Finish this to proof that
 *    you are a grown up now, who doesn't need to be held by
 *    the hand.
 *
 *    Create a users-class. Fetch the users, create Instances.
 *    - https://jsonplaceholder.typicode.com/users
 *
 *    Create a posts-class. Fetch the posts. create Instances.
 *    Assign them to the users (see userId in the posts).
 *    - https://jsonplaceholder.typicode.com/posts
 *
 *    Print the shit. Beautifully:
 *    List the 10 users. On click, expand them with their posts.
 *    Each Post should also have a Button to "load comments".
 *    Yes, you are correct. This is the perfect usecase for
 *    event-delegation! You can get the comments to a post from either
 *    - https://jsonplaceholder.typicode.com/posts/1/comments
 *    or
 *    - https://jsonplaceholder.typicode.com/comments?postId=1
 *    where "1" stands for the posts ID of course.
 *
 *    I believe in...
 *    You - 2026-06-09
 *  *******************************************************/

import User from "./class.user.js";
import Post from "./class.post.js";

const app = document.querySelector("#app");

async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    return users.map((user) => new User(user));
}

async function fetchPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    return posts.map((post) => ({
        userId: post.userId,
        post: new Post(post),
    }));
}

function assignPostsToUsers(users, posts) {
    posts.forEach(({ userId, post }) => {
        const user = users.find((user) => user.id === userId);

        if (user) {
            user.addPost(post);
        }
    });
}

function renderUsers(users) {
    app.innerHTML = "";

    users.forEach((user) => {
        app.append(user.render());
    });
}

async function init() {
    const users = await fetchUsers();
    const posts = await fetchPosts();

    assignPostsToUsers(users, posts);
    renderUsers(users);
}

init();