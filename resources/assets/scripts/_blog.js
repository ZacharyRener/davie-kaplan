import ReactDOM from "react-dom";
import React from "react";
import Blog from "./library/_blog";

export default class TheBlog {
  constructor() {
    this.renderBlogComponenent();
  }

  renderBlogComponenent() {
    ReactDOM.render(<Blog />, document.querySelector("#blog-root"));
  }
}
