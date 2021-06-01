export default class Experience {
  constructor() {
    this.loadProjects();
    this.filterFromUrl();
  }

  filterFromUrl() {
    let selectedIndustry = document.URL.match(/\(grid\|project-type\)=(.+?);/g);

    if (selectedIndustry != null) {
      selectedIndustry = selectedIndustry[0]
        .match(/\.(.+?);/g)[0]
        .replaceAll(";", "")
        .trim();
    }

    let selectedService = document.URL.match(
      /\(grid\|project-service\)=(.+?);/g
    );

    if (selectedService != null) {
      selectedService = selectedService[0]
        .match(/\.(.+?);/g)[0]
        .replaceAll(";", "")
        .trim();
    }

    const interval = setInterval(() => {
      if (jQuery(".media-box-loaded").length > 0) {
        if (selectedIndustry != null)
          jQuery(`a[data-filter="${selectedIndustry}"]`).click();
        if (selectedService != null)
          jQuery(`a[data-filter="${selectedService}"]`).click();
        jQuery(".media-boxes-load-more-button").click();
        clearInterval(interval);
      }
    }, 100);
  }

  loadProjects() {
    jQuery(document).ajaxStop(function () {
      //console.log("ajax complete");
      jQuery(".selectpicker").selectpicker(); // re-init the thing on ajax done (sort of like a page load)
    });
    jQuery(function ($) {
      $("#grid").mediaBoxes({
        search: "#search",
        filterContainer: ".filters",
        searchTarget: ".searchtitle",
        columns: 3,
        boxesToLoadStart: 24,
        boxesToLoad: 24,
        horizontalSpaceBetweenBoxes: 30,
        verticalSpaceBetweenBoxes: 30,
      });
    });
  }
}
