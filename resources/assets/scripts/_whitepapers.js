import React from "react";
import ReactDOM from "react-dom";
import WhitepaperFilters from "./_whitepaper-filters";

export default class Whitepapers {
  constructor() {
    this.loadFilters();
  }

  loadFilters() {
    ReactDOM.render(
      <WhitepaperFilters />,
      document.querySelector("#wp-filter-root")
    );
  }
}
