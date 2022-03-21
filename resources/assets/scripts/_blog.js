import ReactDOM from "react-dom";
import React from "react";
import Blog from "./library/_blog";

export default class TheBlog {
  constructor() {
    this.renderBlogComponenent();
    this.handleFilterFix();
  }

  renderBlogComponenent() {
    ReactDOM.render(<Blog />, document.querySelector("#blog-root"));
  }

  handleFilterFix() {
    setTimeout(() => {
      console.log("in handle filter fix");
      document
        .querySelectorAll(".media-boxes-drop-down:nth-child(2) .cat-item")
        .forEach((cat) => {
          cat.addEventListener("click", (e) => {
            console.log("clicked filter");
            document.querySelector(
              ".media-boxes-drop-down:nth-child(2) .media-boxes-drop-down-header"
            ).innerHTML = `${e.currentTarget.innerText}<i class="fas fa-sort-down"></i>`;
          });
        });
      document
        .querySelectorAll(".media-boxes-drop-down:nth-child(3) .cat-item")
        .forEach((cat) => {
          cat.addEventListener("click", (e) => {
            console.log("clicked filter");
            document.querySelector(
              ".media-boxes-drop-down:nth-child(3) .media-boxes-drop-down-header"
            ).innerHTML = `${e.currentTarget.innerText}<i class="fas fa-sort-down"></i>`;
          });
        });
    }, 2000);
  }
}
