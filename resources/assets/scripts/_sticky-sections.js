export default class StickySections {
  constructor() {
    if (document.querySelector("#sticky-sections .navigation") != null) {
      this.makeStickyOnScroll();
      this.scrollOnSectionClick();
    }
  }

  makeStickyOnScroll() {
    // when it hits the navbar, make position fixe
    window.addEventListener("scroll", (e) => {
      const stickyNav = document.querySelector("#sticky-sections .navigation");
      const mainNav = document.querySelector("#header");

      if (stickyNav.getBoundingClientRect().top <= 141) {
        stickyNav.classList.add("fixed");
      }
      if (window.scrollY < 426) {
        stickyNav.classList.remove("fixed");
      }

      let currentSection = '.section-title[section-id="1"]';
      document.querySelectorAll(".section-content").forEach((content) => {
        if (
          content.getBoundingClientRect().top - 150 <
          document.querySelector(currentSection).getBoundingClientRect().top
        ) {
          currentSection = `.section-title[section-id="${
            content.getAttribute("id").split("-")[1]
          }"]`;
        }
      });

      document.querySelectorAll(".section-title.active").forEach((active) => {
        active.classList.remove("active");
      });
      document.querySelector(currentSection).classList.add("active");
    });
  }

  scrollOnSectionClick() {
    document.querySelectorAll(".section-title a").forEach((title) => {
      title.addEventListener("click", (e) => {
        e.preventDefault();

        jQuery("html, body").animate(
          {
            scrollTop:
              jQuery(e.currentTarget.getAttribute("href")).offset().top - 250,
          },
          500
        );
      });
    });
  }
}
