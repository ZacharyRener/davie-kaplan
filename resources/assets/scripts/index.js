// import "./../styles/main.scss";

import load from "./load";
import "./library/_navbar";
import Home from "./_home";
import Global from "./_global";
import Experience from "./_experience";
import SingleProject from "./_single-project";
import TheBlog from "./_blog";
import StickySections from "./library/_sticky-sections";
import Whitepapers from "./_whitepapers";
import SingleLeadership from "./_single-leadership";

document.addEventListener("DOMContentLoaded", () => {
  load("home", () => new Home());
  if (document.querySelector("#sticky-sections .navigation") != null) {
    load("page", () => new StickySections());
  }
  load("page", () => new Global());
  load("single", () => new Global());
  load("page-template-template-projects", () => new Experience());
  load("single-project", () => new SingleProject());
  load("page-template-template-blog", () => new TheBlog());
  load("page-template-template-leadership", () => new Experience());
  load("page-template-template-whitepapers", () => new Whitepapers());
  load("single-leadership", () => new SingleLeadership());
});
