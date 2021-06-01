export default class SingleProject {
  constructor() {
    this.addCss();
    this.initCarousel();
  }

  addCss() {
    jQuery("#firstSlide").css("display", "block");
  }

  initCarousel() {
    jQuery("div.project-gallery").customCarousel({
      slides: "div.slide",
      btnPrev: "a.btn-prev",
      btnNext: "a.btn-next",
      pagerLinks: ".thumbnails .thumb-slide",
      event: "click",
      circularRotation: false,
      useSwipe: true,
      autoRotation: false,
      autoHeight: true,
      switchTime: 3000,
      animSpeed: 500,
    });
  }
}
