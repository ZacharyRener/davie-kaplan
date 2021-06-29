import React from "react";
import ReactDOM from "react-dom";
import WhitepaperFilters from "./_whitepaper-filters";

export default class Webinars {
  constructor() {
    this.loadFilters();
  }

  loadFilters() {
    ReactDOM.render(
      <WhitepaperFilters
        searchText="Search Webinars"
        pageSlug="/resources/webinars"
      />,
      document.querySelector("#wp-filter-root")
    );
  }
}
