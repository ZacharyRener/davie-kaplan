import React from "react";
import ReactDOM from "react-dom";
import SpireServices from "./library/_spire-services";
import LoadingBar from "./_loadingBar";

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export default class Home {
  constructor() {
    this.renderServicesComponent();
    this.handleHiddenHover(".project");
    this.handleHiddenHover(".solution");
    this.handleServiceHover();
    this.handleServiceClick();
    this.handleExperienceSection();
    this.matchOfferHeights();
  }

  renderServicesComponent() {
    ReactDOM.render(
      <SpireServices />,
      document.querySelector("#services-root")
    );
  }

  handleHiddenHover(selector) {
    document.querySelectorAll(selector).forEach((project) => {
      project.addEventListener("mouseenter", (e) => {
        if (e.currentTarget.classList.contains("hidden")) {
          e.currentTarget.classList.remove("hidden");
        }
      });
      project.addEventListener("mouseleave", (e) => {
        if (!e.currentTarget.classList.contains("hidden")) {
          e.currentTarget.classList.add("hidden");
        }
      });
    });
  }

  matchOfferHeights() {
    let largestHeight = -1;
    document.querySelectorAll("#home-offers .team-box").forEach((offer) => {
      if (offer.innerHeight > largestHeight) largestHeight = offer.innerHeight;
    });
    document.querySelectorAll("#home-offers .team-box").forEach((offer) => {
      offer.style.innerHeight = largestHeight;
    });
  }

  handleServiceHover() {
    const interval = setInterval(() => {
      console.log("services not yet loaded");

      if (document.querySelector("#reactive-services") != null) {
        const topSection = document.querySelector("#services .top-section");

        if (
          document.querySelector(".top-section .section-header.active") ==
          document.querySelector(".top-section .section-header:nth-child(1)")
        ) {
          topSection.classList.add("bg-start");
          console.log("bg-start");
        } else if (
          document.querySelector(".top-section .section-header.active") ==
          document.querySelector(".top-section .section-header:nth-child(2)")
        ) {
          topSection.classList.add("bg-two");
          console.log("bg-two");
        } else if (
          document.querySelector(".top-section .section-header.active") ==
          document.querySelector(".top-section .section-header:nth-child(3)")
        ) {
          topSection.classList.add("bg-three");
          console.log("bg-three");
        } else if (
          document.querySelector(".top-section .section-header.active") ==
          document.querySelector(".top-section .section-header:nth-child(4)")
        ) {
          topSection.classList.add("bg-end");
          console.log("bg-end");
        }

        document
          .querySelector("#services .top-section .section-header:nth-child(1)")
          .addEventListener("mouseenter", (e) => {
            if (topSection.classList.contains("bg-two"))
              topSection.classList.remove("bg-two");
            if (topSection.classList.contains("bg-three"))
              topSection.classList.remove("bg-three");
            if (topSection.classList.contains("bg-end"))
              topSection.classList.remove("bg-end");
            topSection.classList.add("bg-start");
          });

        document
          .querySelector("#services .top-section .section-header:nth-child(2)")
          .addEventListener("mouseenter", (e) => {
            if (topSection.classList.contains("bg-start"))
              topSection.classList.remove("bg-start");
            if (topSection.classList.contains("bg-end"))
              topSection.classList.remove("bg-end");
            if (topSection.classList.contains("bg-three"))
              topSection.classList.remove("bg-three");
            topSection.classList.add("bg-two");
          });

        document
          .querySelector("#services .top-section .section-header:nth-child(3)")
          .addEventListener("mouseenter", (e) => {
            if (topSection.classList.contains("bg-start"))
              topSection.classList.remove("bg-start");
            if (topSection.classList.contains("bg-end"))
              topSection.classList.remove("bg-end");
            if (topSection.classList.contains("bg-two"))
              topSection.classList.remove("bg-two");
            topSection.classList.add("bg-three");
          });

        document
          .querySelector("#services .top-section .section-header:nth-child(4)")
          .addEventListener("mouseenter", (e) => {
            if (topSection.classList.contains("bg-start"))
              topSection.classList.remove("bg-start");
            if (topSection.classList.contains("bg-middle"))
              topSection.classList.remove("bg-middle");
            if (topSection.classList.contains("bg-three"))
              topSection.classList.remove("bg-three");
            topSection.classList.add("bg-end");
          });
        console.log("services done loading");
        clearInterval(interval);
      }
    }, 500);
  }

  handleServiceClick() {
    setTimeout(() => {
      const topSection = document.querySelector("#services .top-section");
      //topSection.classList.add("bg-start");

      document
        .querySelector("#services .top-section .section-header:nth-child(1)")
        .addEventListener("click", (e) => {
          if (topSection.classList.contains("bg-two"))
            topSection.classList.remove("bg-two");
          if (topSection.classList.contains("bg-three"))
            topSection.classList.remove("bg-three");
          if (topSection.classList.contains("bg-end"))
            topSection.classList.remove("bg-end");
          topSection.classList.add("bg-start");
        });

      document
        .querySelector("#services .top-section .section-header:nth-child(2)")
        .addEventListener("click", (e) => {
          if (topSection.classList.contains("bg-start"))
            topSection.classList.remove("bg-start");
          if (topSection.classList.contains("bg-end"))
            topSection.classList.remove("bg-end");
          if (topSection.classList.contains("bg-three"))
            topSection.classList.remove("bg-three");
          topSection.classList.add("bg-two");
        });

      document
        .querySelector("#services .top-section .section-header:nth-child(3)")
        .addEventListener("click", (e) => {
          if (topSection.classList.contains("bg-start"))
            topSection.classList.remove("bg-start");
          if (topSection.classList.contains("bg-end"))
            topSection.classList.remove("bg-end");
          if (topSection.classList.contains("bg-two"))
            topSection.classList.remove("bg-two");
          topSection.classList.add("bg-three");
        });

      document
        .querySelector("#services .top-section .section-header:nth-child(4)")
        .addEventListener("click", (e) => {
          if (topSection.classList.contains("bg-start"))
            topSection.classList.remove("bg-start");
          if (topSection.classList.contains("bg-middle"))
            topSection.classList.remove("bg-middle");
          if (topSection.classList.contains("bg-three"))
            topSection.classList.remove("bg-three");
          topSection.classList.add("bg-end");
        });
    }, 2000);
  }

  handleExperienceSection() {
    const startSlider = () => {
      console.log("starting experience slider!");
      let count = 2;
      let sliderGoing = true;

      let featuredImage = document.querySelector(
        "#experience .left-side .image"
      );
      let featuredTitle = document.querySelector(
        "#experience .left-side p.title"
      );
      let featuredExcerpt = document.querySelector(
        "#experience .left-side p.excerpt"
      );
      let featuredButton = document.querySelector(
        "#experience .left-side a.button"
      );

      setInterval(() => {
        console.log(`.project.small:nth-child(${count}) p.title`);
        let image = document.querySelector(
          `.project.small:nth-child(${count}) img`
        );
        let imageUrl = image.getAttribute("src");
        let title = document.querySelector(
          `.project.small:nth-child(${count}) p.project-text`
        );
        let text = document.querySelector(
          `.project.small:nth-child(${count}) span.project-excerpt`
        ).innerText;
        let button = document.querySelector(
          `.project.small:nth-child(${count}) > a`
        );
        featuredImage.setAttribute("src", imageUrl);
        featuredTitle.innerText = title.innerText;
        featuredExcerpt.innerText = text;
        featuredButton.setAttribute("href", button.getAttribute("href"));

        const thisLoadingBar = document.querySelector(
          ".right-side .loading-bar-root"
        );
        ReactDOM.unmountComponentAtNode(thisLoadingBar);
        ReactDOM.render(
          <LoadingBar cap={thisLoadingBar.getAttribute("time-delay")} />,
          thisLoadingBar
        );

        count++;
        if (count == 5) count = 2;
      }, 10000);
    };

    setTimeout(() => {
      let experienceSection = document.querySelector(
        "#experience .project.small:nth-child(2)"
      );
      let hasGoneOnce = false;
      if (isInViewport(experienceSection)) {
        startSlider();
      } else {
        window.addEventListener("scroll", () => {
          //console.log("scrolling in experience section code");
          if (isInViewport(experienceSection) && !hasGoneOnce) {
            hasGoneOnce = true;
            startSlider();
          }
        });
      }
    }, 1000);
  }
}
