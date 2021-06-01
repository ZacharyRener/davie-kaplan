// page init
jQuery(function () {
  initCustomForms();
  initLoadMore();
  initTouchNav();
  initCarousel();
  initCycleCarousel();
  initCustomCarousel();
  initPopups();
  initMobileNav();
  initSameHeight();
  initFitVids();
  initAjaxFilter();
  initCustomMap();
});

// custom map init
function initCustomMap() {
  var isTouchDevice =
    /Windows Phone/.test(navigator.userAgent) ||
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch);

  jQuery(".map-container").each(function () {
    jQuery(this).data(
      "CustomMap",
      new CustomMap({
        holder: this,
        startCooords: [31.756721, -106.493427],
        mapOptions: {
          maxZoom: 16,
          zoom: 10,
          minZoom: 2,
          draggable: true,
          scrollwheel: false,
        },
      })
    );
  });
}

function initAjaxFilter() {
  jQuery(".ajax-filter-container").ajaxFilter();
}

// initialize custom form elements
function initCustomForms() {
  jcf.setOptions("Select", {
    wrapNative: false,
    flipDropToFit: false,
  });
  jcf.replaceAll();
}

// scroll gallery init
function initCarousel() {
  jQuery("div.news-carousel").scrollGallery({
    mask: "div.mask",
    slider: "div.slideset",
    slides: "div.slide",
    btnPrev: "a.btn-prev",
    btnNext: "a.btn-next",
    generatePagination: ".pagination",
    autoRotation: false,
    switchTime: 3000,
    animSpeed: 500,
    step: 1,
  });
  jQuery("div.client-carousel").scrollGallery({
    mask: "div.mask",
    slider: "div.slideset",
    slides: "div.item",
    btnPrev: "a.btn-prev",
    btnNext: "a.btn-next",
    pagerLinks: ".pagination li",
    autoRotation: false,
    switchTime: 3000,
    animSpeed: 500,
    step: 1,
  });
  jQuery("div.thumbnails").scrollGallery({
    mask: "div.mask",
    slider: "div.slideset",
    slides: "div.thumb-slide",
    btnPrev: "a.btn-thumb-prev",
    btnNext: "a.btn-thumb-next",
    pagerLinks: ".pagination li",
    activeClass: "thumb-active",
    autoRotation: false,
    circularRotation: false,
    switchTime: 3000,
    animSpeed: 500,
    step: 1,
  });
}

// cycle scroll gallery init
function initCycleCarousel() {
  jQuery("div.main-gallery").scrollAbsoluteGallery({
    mask: "div.mask",
    slider: "div.slideset",
    slides: "div.slide",
    btnPrev: "a.btn-prev",
    btnNext: "a.btn-next",
    generatePagination: ".pagination",
    stretchSlideToMask: true,
    pauseOnHover: true,
    maskAutoSize: true,
    autoRotation: true,
    switchTime: 10000,
    animSpeed: 500,
  });
  jQuery("div.twitter-feed").scrollAbsoluteGallery({
    mask: "div.xmt_Primary",
    slider: "ul.tweet_area",
    slides: "li.tweet_list",
    btnPrev: "a.btn-prev",
    btnNext: "a.btn-next",
    generatePagination: ".pagination",
    stretchSlideToMask: true,
    pauseOnHover: true,
    maskAutoSize: true,
    autoRotation: false,
    switchTime: 10000,
    animSpeed: 500,
  });
}

// fade gallery init
function initCustomCarousel() {
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

// popups init
function initPopups() {
  jQuery(".search-form-holder").contentPopup({
    mode: "click",
    popup: ".search-form",
    btnOpen: ".icon-search",
    openClass: "search-open",
    onInit: function (self) {
      self.form = self.holder.find(".search-form");
      self.input = self.form.find('input[type="search"]');
    },
    onClick: function (self) {
      if (self.input.val().length) {
        self.form.trigger("submit");
      }
    },
    onHide: function (self) {
      self.input.val("");
    },
  });
}

// mobile menu init
function initMobileNav() {
  jQuery("body").mobileNav({
    menuActiveClass: "nav-active",
    menuOpener: ".nav-opener",
  });
}

// load more init
function initLoadMore() {
  jQuery(".post-list").loadMore({
    linkSelector: ".load-btn",
    newContentTarget: ".post-holder",
    additionBottomOffset: 0,
  });
}

// align blocks height
function initSameHeight() {
  jQuery(".news-carousel .slideset").sameHeight({
    elements: ".slide > *",
    flexible: true,
  });
  jQuery(".twitter-feed").sameHeight({
    elements: ".photo, .widget",
    flexible: true,
  });
}

// handle dropdowns on mobile devices
function initTouchNav() {
  jQuery("#nav").each(function () {
    new TouchNav({
      navBlock: this,
    });
  });
}

// handle flexible video size
function initFitVids() {
  jQuery("#content").fitVids();
}

/*
 * jQuery Carousel plugin
 */
(function ($) {
  function ScrollGallery(options) {
    this.options = $.extend(
      {
        mask: "div.mask",
        slider: ">*",
        slides: ">*",
        activeClass: "active",
        disabledClass: "disabled",
        btnPrev: "a.btn-prev",
        btnNext: "a.btn-next",
        generatePagination: false,
        pagerList: "<ul>",
        pagerListItem: '<li><a href="#"></a></li>',
        pagerListItemText: "a",
        pagerLinks: ".pagination li",
        currentNumber: "span.current-num",
        totalNumber: "span.total-num",
        btnPlay: ".btn-play",
        btnPause: ".btn-pause",
        btnPlayPause: ".btn-play-pause",
        galleryReadyClass: "gallery-js-ready",
        autorotationActiveClass: "autorotation-active",
        autorotationDisabledClass: "autorotation-disabled",
        stretchSlideToMask: false,
        circularRotation: true,
        disableWhileAnimating: false,
        autoRotation: false,
        pauseOnHover: isTouchDevice ? false : true,
        maskAutoSize: false,
        switchTime: 4000,
        animSpeed: 600,
        event: "click",
        swipeThreshold: 15,
        handleTouch: true,
        vertical: false,
        useTranslate3D: false,
        step: false,
      },
      options
    );
    this.init();
  }
  ScrollGallery.prototype = {
    init: function () {
      if (this.options.holder) {
        this.findElements();
        this.attachEvents();
        this.refreshPosition();
        this.refreshState(true);
        this.resumeRotation();
        this.makeCallback("onInit", this);
      }
    },
    findElements: function () {
      // define dimensions proporties
      this.fullSizeFunction = this.options.vertical
        ? "outerHeight"
        : "outerWidth";
      this.innerSizeFunction = this.options.vertical ? "height" : "width";
      this.slideSizeFunction = "outerHeight";
      this.maskSizeProperty = "height";
      this.animProperty = this.options.vertical ? "marginTop" : "marginLeft";

      // control elements
      this.gallery = $(this.options.holder).addClass(
        this.options.galleryReadyClass
      );
      this.mask = this.gallery.find(this.options.mask);
      this.slider = this.mask.find(this.options.slider);
      this.slides = this.slider.find(this.options.slides);
      this.btnPrev = this.gallery.find(this.options.btnPrev);
      this.btnNext = this.gallery.find(this.options.btnNext);
      this.currentStep = 0;
      this.stepsCount = 0;

      // get start index
      if (this.options.step === false) {
        var activeSlide = this.slides.filter("." + this.options.activeClass);
        if (activeSlide.length) {
          this.currentStep = this.slides.index(activeSlide);
        }
      }

      // calculate offsets
      this.calculateOffsets();

      // create gallery pagination
      if (typeof this.options.generatePagination === "string") {
        this.pagerLinks = $();
        this.buildPagination();
      } else {
        this.pagerLinks = this.gallery.find(this.options.pagerLinks);
        this.attachPaginationEvents();
      }

      // autorotation control buttons
      this.btnPlay = this.gallery.find(this.options.btnPlay);
      this.btnPause = this.gallery.find(this.options.btnPause);
      this.btnPlayPause = this.gallery.find(this.options.btnPlayPause);

      // misc elements
      this.curNum = this.gallery.find(this.options.currentNumber);
      this.allNum = this.gallery.find(this.options.totalNumber);
    },
    attachEvents: function () {
      // bind handlers scope
      var self = this;
      this.bindHandlers(["onWindowResize"]);
      $(window).bind("load resize orientationchange", this.onWindowResize);

      // previous and next button handlers
      if (this.btnPrev.length) {
        this.prevSlideHandler = function (e) {
          e.preventDefault();
          self.prevSlide();
        };
        this.btnPrev.bind(this.options.event, this.prevSlideHandler);
      }
      if (this.btnNext.length) {
        this.nextSlideHandler = function (e) {
          e.preventDefault();
          self.nextSlide();
        };
        this.btnNext.bind(this.options.event, this.nextSlideHandler);
      }

      // pause on hover handling
      if (this.options.pauseOnHover && !isTouchDevice) {
        this.hoverHandler = function () {
          if (self.options.autoRotation) {
            self.galleryHover = true;
            self.pauseRotation();
          }
        };
        this.leaveHandler = function () {
          if (self.options.autoRotation) {
            self.galleryHover = false;
            self.resumeRotation();
          }
        };
        this.gallery.bind({
          mouseenter: this.hoverHandler,
          mouseleave: this.leaveHandler,
        });
      }

      // autorotation buttons handler
      if (this.btnPlay.length) {
        this.btnPlayHandler = function (e) {
          e.preventDefault();
          self.startRotation();
        };
        this.btnPlay.bind(this.options.event, this.btnPlayHandler);
      }
      if (this.btnPause.length) {
        this.btnPauseHandler = function (e) {
          e.preventDefault();
          self.stopRotation();
        };
        this.btnPause.bind(this.options.event, this.btnPauseHandler);
      }
      if (this.btnPlayPause.length) {
        this.btnPlayPauseHandler = function (e) {
          e.preventDefault();
          if (!self.gallery.hasClass(self.options.autorotationActiveClass)) {
            self.startRotation();
          } else {
            self.stopRotation();
          }
        };
        this.btnPlayPause.bind(this.options.event, this.btnPlayPauseHandler);
      }

      // enable hardware acceleration
      if (isTouchDevice && this.options.useTranslate3D) {
        this.slider.css({ "-webkit-transform": "translate3d(0px, 0px, 0px)" });
      }

      // swipe event handling
      if (
        isTouchDevice &&
        this.options.handleTouch &&
        window.Hammer &&
        this.mask.length
      ) {
        this.swipeHandler = new Hammer.Manager(this.mask[0]);
        this.swipeHandler.add(
          new Hammer.Pan({
            direction: self.options.vertical
              ? Hammer.DIRECTION_VERTICAL
              : Hammer.DIRECTION_HORIZONTAL,
            threshold: self.options.swipeThreshold,
          })
        );

        this.swipeHandler
          .on("panstart", function () {
            if (self.galleryAnimating) {
              self.swipeHandler.stop();
            } else {
              self.pauseRotation();
              self.originalOffset = parseFloat(
                self.slider.css(self.animProperty)
              );
            }
          })
          .on("panmove", function (e) {
            var tmpOffset =
              self.originalOffset +
              e[self.options.vertical ? "deltaY" : "deltaX"];
            tmpOffset = Math.max(Math.min(0, tmpOffset), self.maxOffset);
            self.slider.css(self.animProperty, tmpOffset);
          })
          .on("panend", function (e) {
            self.resumeRotation();
            if (e.distance > self.options.swipeThreshold) {
              if (
                e.offsetDirection === Hammer.DIRECTION_RIGHT ||
                e.offsetDirection === Hammer.DIRECTION_DOWN
              ) {
                self.nextSlide();
              } else {
                self.prevSlide();
              }
            } else {
              self.switchSlide();
            }
          });
      }
    },
    onWindowResize: function () {
      if (!this.galleryAnimating) {
        this.calculateOffsets();
        this.refreshPosition();
        this.buildPagination();
        this.refreshState();
        this.resizeQueue = false;
      } else {
        this.resizeQueue = true;
      }
    },
    refreshPosition: function () {
      this.currentStep = Math.min(this.currentStep, this.stepsCount - 1);
      this.tmpProps = {};
      this.tmpProps[this.animProperty] = this.getStepOffset();
      this.slider.stop().css(this.tmpProps);
    },
    calculateOffsets: function () {
      var self = this,
        tmpOffset,
        tmpStep;
      if (this.options.stretchSlideToMask) {
        var tmpObj = {};
        tmpObj[this.innerSizeFunction] = this.mask[this.innerSizeFunction]();
        this.slides.css(tmpObj);
      }

      this.maskSize = this.mask[this.innerSizeFunction]();
      this.sumSize = this.getSumSize();
      this.maxOffset = this.maskSize - this.sumSize;

      // vertical gallery with single size step custom behavior
      if (this.options.vertical && this.options.maskAutoSize) {
        this.options.step = 1;
        this.stepsCount = this.slides.length;
        this.stepOffsets = [0];
        tmpOffset = 0;
        for (var i = 0; i < this.slides.length; i++) {
          tmpOffset -= $(this.slides[i])[this.fullSizeFunction](true);
          this.stepOffsets.push(tmpOffset);
        }
        this.maxOffset = tmpOffset;
        return;
      }

      // scroll by slide size
      if (typeof this.options.step === "number" && this.options.step > 0) {
        this.slideDimensions = [];
        this.slides.each(
          $.proxy(function (ind, obj) {
            self.slideDimensions.push($(obj)[self.fullSizeFunction](true));
          }, this)
        );

        // calculate steps count
        this.stepOffsets = [0];
        this.stepsCount = 1;
        tmpOffset = tmpStep = 0;
        while (tmpOffset > this.maxOffset) {
          tmpOffset -= this.getSlideSize(tmpStep, tmpStep + this.options.step);
          tmpStep += this.options.step;
          this.stepOffsets.push(Math.max(tmpOffset, this.maxOffset));
          this.stepsCount++;
        }
      }
      // scroll by mask size
      else {
        // define step size
        this.stepSize = this.maskSize;

        // calculate steps count
        this.stepsCount = 1;
        tmpOffset = 0;
        while (tmpOffset > this.maxOffset) {
          tmpOffset -= this.stepSize;
          this.stepsCount++;
        }
      }
    },
    getSumSize: function () {
      var sum = 0;
      this.slides.each(
        $.proxy(function (ind, obj) {
          sum += $(obj)[this.fullSizeFunction](true);
        }, this)
      );
      this.slider.css(this.innerSizeFunction, sum);
      return sum;
    },
    getStepOffset: function (step) {
      step = step || this.currentStep;
      if (typeof this.options.step === "number") {
        return this.stepOffsets[this.currentStep];
      } else {
        return Math.min(
          0,
          Math.max(-this.currentStep * this.stepSize, this.maxOffset)
        );
      }
    },
    getSlideSize: function (i1, i2) {
      var sum = 0;
      for (var i = i1; i < Math.min(i2, this.slideDimensions.length); i++) {
        sum += this.slideDimensions[i];
      }
      return sum;
    },
    buildPagination: function () {
      if (typeof this.options.generatePagination === "string") {
        if (!this.pagerHolder) {
          this.pagerHolder = this.gallery.find(this.options.generatePagination);
        }
        if (this.pagerHolder.length && this.oldStepsCount != this.stepsCount) {
          this.oldStepsCount = this.stepsCount;
          this.pagerHolder.empty();
          this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
          for (var i = 0; i < this.stepsCount; i++) {
            $(this.options.pagerListItem)
              .appendTo(this.pagerList)
              .find(this.options.pagerListItemText)
              .text(i + 1);
          }
          this.pagerLinks = this.pagerList.children();
          this.attachPaginationEvents();
        }
      }
    },
    attachPaginationEvents: function () {
      var self = this;
      this.pagerLinksHandler = function (e) {
        e.preventDefault();
        self.numSlide(self.pagerLinks.index(e.currentTarget));
      };
      this.pagerLinks.bind(this.options.event, this.pagerLinksHandler);
    },
    prevSlide: function () {
      if (!(this.options.disableWhileAnimating && this.galleryAnimating)) {
        if (this.currentStep > 0) {
          this.currentStep--;
          this.switchSlide();
        } else if (this.options.circularRotation) {
          this.currentStep = this.stepsCount - 1;
          this.switchSlide();
        }
      }
    },
    nextSlide: function (fromAutoRotation) {
      if (!(this.options.disableWhileAnimating && this.galleryAnimating)) {
        if (this.currentStep < this.stepsCount - 1) {
          this.currentStep++;
          this.switchSlide();
        } else if (this.options.circularRotation || fromAutoRotation === true) {
          this.currentStep = 0;
          this.switchSlide();
        }
      }
    },
    numSlide: function (c) {
      if (this.currentStep != c) {
        this.currentStep = c;
        this.switchSlide();
      }
    },
    switchSlide: function () {
      var self = this;
      this.galleryAnimating = true;
      this.tmpProps = {};
      this.tmpProps[this.animProperty] = this.getStepOffset();
      this.slider.stop().animate(this.tmpProps, {
        duration: this.options.animSpeed,
        complete: function () {
          // animation complete
          self.galleryAnimating = false;
          if (self.resizeQueue) {
            self.onWindowResize();
          }

          // onchange callback
          self.makeCallback("onChange", self);
          self.autoRotate();
        },
      });
      this.refreshState();

      // onchange callback
      this.makeCallback("onBeforeChange", this);
    },
    refreshState: function (initial) {
      if (this.options.step === 1 || this.stepsCount === this.slides.length) {
        this.slides
          .removeClass(this.options.activeClass)
          .eq(this.currentStep)
          .addClass(this.options.activeClass);
      }
      this.pagerLinks
        .removeClass(this.options.activeClass)
        .eq(this.currentStep)
        .addClass(this.options.activeClass);
      this.curNum.html(this.currentStep + 1);
      this.allNum.html(this.stepsCount);

      // initial refresh
      if (this.options.maskAutoSize && typeof this.options.step === "number") {
        this.tmpProps = {};
        this.tmpProps[this.maskSizeProperty] = this.slides
          .eq(Math.min(this.currentStep, this.slides.length - 1))
          [this.slideSizeFunction](true);
        this.mask.stop()[initial ? "css" : "animate"](this.tmpProps);
      }

      // disabled state
      if (!this.options.circularRotation) {
        this.btnPrev.add(this.btnNext).removeClass(this.options.disabledClass);
        if (this.currentStep === 0)
          this.btnPrev.addClass(this.options.disabledClass);
        if (this.currentStep === this.stepsCount - 1)
          this.btnNext.addClass(this.options.disabledClass);
      }

      // add class if not enough slides
      this.gallery.toggleClass(
        "not-enough-slides",
        this.sumSize <= this.maskSize
      );
    },
    startRotation: function () {
      this.options.autoRotation = true;
      this.galleryHover = false;
      this.autoRotationStopped = false;
      this.resumeRotation();
    },
    stopRotation: function () {
      this.galleryHover = true;
      this.autoRotationStopped = true;
      this.pauseRotation();
    },
    pauseRotation: function () {
      this.gallery.addClass(this.options.autorotationDisabledClass);
      this.gallery.removeClass(this.options.autorotationActiveClass);
      clearTimeout(this.timer);
    },
    resumeRotation: function () {
      if (!this.autoRotationStopped) {
        this.gallery.addClass(this.options.autorotationActiveClass);
        this.gallery.removeClass(this.options.autorotationDisabledClass);
        this.autoRotate();
      }
    },
    autoRotate: function () {
      var self = this;
      clearTimeout(this.timer);
      if (
        this.options.autoRotation &&
        !this.galleryHover &&
        !this.autoRotationStopped
      ) {
        this.timer = setTimeout(function () {
          self.nextSlide(true);
        }, this.options.switchTime);
      } else {
        this.pauseRotation();
      }
    },
    bindHandlers: function (handlersList) {
      var self = this;
      $.each(handlersList, function (index, handler) {
        var origHandler = self[handler];
        self[handler] = function () {
          return origHandler.apply(self, arguments);
        };
      });
    },
    makeCallback: function (name) {
      if (typeof this.options[name] === "function") {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    },
    destroy: function () {
      // destroy handler
      $(window).unbind("load resize orientationchange", this.onWindowResize);
      this.btnPrev.unbind(this.options.event, this.prevSlideHandler);
      this.btnNext.unbind(this.options.event, this.nextSlideHandler);
      this.pagerLinks.unbind(this.options.event, this.pagerLinksHandler);
      this.gallery.unbind("mouseenter", this.hoverHandler);
      this.gallery.unbind("mouseleave", this.leaveHandler);

      // autorotation buttons handlers
      this.stopRotation();
      this.btnPlay.unbind(this.options.event, this.btnPlayHandler);
      this.btnPause.unbind(this.options.event, this.btnPauseHandler);
      this.btnPlayPause.unbind(this.options.event, this.btnPlayPauseHandler);

      // destroy swipe handler
      if (this.swipeHandler) {
        this.swipeHandler.destroy();
      }

      // remove inline styles, classes and pagination
      var unneededClasses = [
        this.options.galleryReadyClass,
        this.options.autorotationActiveClass,
        this.options.autorotationDisabledClass,
      ];
      this.gallery.removeClass(unneededClasses.join(" "));
      this.slider.add(this.slides).removeAttr("style");
      if (typeof this.options.generatePagination === "string") {
        this.pagerHolder.empty();
      }
    },
  };

  // detect device type
  var isTouchDevice =
    /Windows Phone/.test(navigator.userAgent) ||
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch);

  // jquery plugin
  $.fn.scrollGallery = function (opt) {
    return this.each(function () {
      $(this).data(
        "ScrollGallery",
        new ScrollGallery($.extend(opt, { holder: this }))
      );
    });
  };
})(jQuery);

/*
 * jQuery Cycle Carousel plugin
 */
(function ($) {
  function ScrollAbsoluteGallery(options) {
    this.options = $.extend(
      {
        activeClass: "active",
        mask: "div.slides-mask",
        slider: ">ul",
        slides: ">li",
        btnPrev: ".btn-prev",
        btnNext: ".btn-next",
        pagerLinks: "ul.pager > li",
        generatePagination: false,
        pagerList: "<ul>",
        pagerListItem: '<li><a href="#"></a></li>',
        pagerListItemText: "a",
        galleryReadyClass: "gallery-js-ready",
        currentNumber: "span.current-num",
        totalNumber: "span.total-num",
        maskAutoSize: false,
        autoRotation: false,
        pauseOnHover: false,
        stretchSlideToMask: false,
        switchTime: 3000,
        animSpeed: 500,
        handleTouch: true,
        swipeThreshold: 15,
        vertical: false,
      },
      options
    );
    this.init();
  }
  ScrollAbsoluteGallery.prototype = {
    init: function () {
      if (this.options.holder) {
        this.findElements();
        this.attachEvents();
        this.makeCallback("onInit", this);
      }
    },
    findElements: function () {
      // find structure elements
      this.holder = $(this.options.holder).addClass(
        this.options.galleryReadyClass
      );
      this.mask = this.holder.find(this.options.mask);
      this.slider = this.mask.find(this.options.slider);
      this.slides = this.slider.find(this.options.slides);
      this.btnPrev = this.holder.find(this.options.btnPrev);
      this.btnNext = this.holder.find(this.options.btnNext);

      // slide count display
      this.currentNumber = this.holder.find(this.options.currentNumber);
      this.totalNumber = this.holder.find(this.options.totalNumber);

      // create gallery pagination
      if (typeof this.options.generatePagination === "string") {
        this.pagerLinks = this.buildPagination();
      } else {
        this.pagerLinks = this.holder.find(this.options.pagerLinks);
      }

      // define index variables
      this.sizeProperty = this.options.vertical ? "height" : "width";
      this.positionProperty = this.options.vertical ? "top" : "left";
      this.animProperty = this.options.vertical ? "marginTop" : "marginLeft";

      this.slideSize = this.slides[this.sizeProperty]();
      this.currentIndex = 0;
      this.prevIndex = 0;

      // reposition elements
      this.options.maskAutoSize = this.options.vertical
        ? false
        : this.options.maskAutoSize;
      if (this.options.vertical) {
        this.mask.css({
          height: this.slides.innerHeight(),
        });
      }
      if (this.options.maskAutoSize) {
        this.mask.css({
          height: this.slider.height(),
        });
      }
      this.slider.css({
        position: "relative",
        height: this.options.vertical
          ? this.slideSize * this.slides.length
          : "100%",
      });
      this.slides
        .css({
          position: "absolute",
        })
        .css(this.positionProperty, -9999)
        .eq(this.currentIndex)
        .css(this.positionProperty, 0);
      this.refreshState();
    },
    buildPagination: function () {
      var pagerLinks = $();
      if (!this.pagerHolder) {
        this.pagerHolder = this.holder.find(this.options.generatePagination);
      }
      if (this.pagerHolder.length) {
        this.pagerHolder.empty();
        this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
        for (var i = 0; i < this.slides.length; i++) {
          $(this.options.pagerListItem)
            .appendTo(this.pagerList)
            .find(this.options.pagerListItemText)
            .text(i + 1);
        }
        pagerLinks = this.pagerList.children();
      }
      return pagerLinks;
    },
    attachEvents: function () {
      // attach handlers
      var self = this;
      if (this.btnPrev.length) {
        this.btnPrevHandler = function (e) {
          e.preventDefault();
          self.prevSlide();
        };
        this.btnPrev.click(this.btnPrevHandler);
      }
      if (this.btnNext.length) {
        this.btnNextHandler = function (e) {
          e.preventDefault();
          self.nextSlide();
        };
        this.btnNext.click(this.btnNextHandler);
      }
      if (this.pagerLinks.length) {
        this.pagerLinksHandler = function (e) {
          e.preventDefault();
          self.numSlide(self.pagerLinks.index(e.currentTarget));
        };
        this.pagerLinks.click(this.pagerLinksHandler);
      }

      // handle autorotation pause on hover
      if (this.options.pauseOnHover) {
        this.hoverHandler = function () {
          clearTimeout(self.timer);
        };
        this.leaveHandler = function () {
          self.autoRotate();
        };
        this.holder.bind({
          mouseenter: this.hoverHandler,
          mouseleave: this.leaveHandler,
        });
      }

      // handle holder and slides dimensions
      this.resizeHandler = function () {
        if (!self.animating) {
          if (self.options.stretchSlideToMask) {
            self.resizeSlides();
          }
          self.resizeHolder();
          self.setSlidesPosition(self.currentIndex);
        }
      };
      $(window).bind("load resize orientationchange", this.resizeHandler);
      if (self.options.stretchSlideToMask) {
        self.resizeSlides();
      }

      // handle swipe on mobile devices
      if (
        this.options.handleTouch &&
        window.Hammer &&
        this.mask.length &&
        this.slides.length > 1 &&
        isTouchDevice
      ) {
        this.swipeHandler = new Hammer.Manager(this.mask[0]);
        this.swipeHandler.add(
          new Hammer.Pan({
            direction: self.options.vertical
              ? Hammer.DIRECTION_VERTICAL
              : Hammer.DIRECTION_HORIZONTAL,
            threshold: self.options.swipeThreshold,
          })
        );

        this.swipeHandler
          .on("panstart", function () {
            if (self.animating) {
              self.swipeHandler.stop();
            } else {
              clearTimeout(self.timer);
            }
          })
          .on("panmove", function (e) {
            self.swipeOffset =
              -self.slideSize + e[self.options.vertical ? "deltaY" : "deltaX"];
            self.slider.css(self.animProperty, self.swipeOffset);
            clearTimeout(self.timer);
          })
          .on("panend", function (e) {
            if (e.distance > self.options.swipeThreshold) {
              if (
                e.offsetDirection === Hammer.DIRECTION_RIGHT ||
                e.offsetDirection === Hammer.DIRECTION_DOWN
              ) {
                self.nextSlide();
              } else {
                self.prevSlide();
              }
            } else {
              var tmpObj = {};
              tmpObj[self.animProperty] = -self.slideSize;
              self.slider.animate(tmpObj, { duration: self.options.animSpeed });
              self.autoRotate();
            }
            self.swipeOffset = 0;
          });
      }

      // start autorotation
      this.autoRotate();
      this.resizeHolder();
      this.setSlidesPosition(this.currentIndex);
    },
    resizeSlides: function () {
      this.slideSize = this.mask[this.options.vertical ? "height" : "width"]();
      this.slides.css(this.sizeProperty, this.slideSize);
    },
    resizeHolder: function () {
      if (this.options.maskAutoSize) {
        this.mask.css({
          height: this.slides.eq(this.currentIndex).outerHeight(true),
        });
      }
    },
    prevSlide: function () {
      if (!this.animating && this.slides.length > 1) {
        this.direction = -1;
        this.prevIndex = this.currentIndex;
        if (this.currentIndex > 0) this.currentIndex--;
        else this.currentIndex = this.slides.length - 1;
        this.switchSlide();
      }
    },
    nextSlide: function (fromAutoRotation) {
      if (!this.animating && this.slides.length > 1) {
        this.direction = 1;
        this.prevIndex = this.currentIndex;
        if (this.currentIndex < this.slides.length - 1) this.currentIndex++;
        else this.currentIndex = 0;
        this.switchSlide();
      }
    },
    numSlide: function (c) {
      if (
        !this.animating &&
        this.currentIndex !== c &&
        this.slides.length > 1
      ) {
        this.direction = c > this.currentIndex ? 1 : -1;
        this.prevIndex = this.currentIndex;
        this.currentIndex = c;
        this.switchSlide();
      }
    },
    preparePosition: function () {
      // prepare slides position before animation
      this.setSlidesPosition(
        this.prevIndex,
        this.direction < 0 ? this.currentIndex : null,
        this.direction > 0 ? this.currentIndex : null,
        this.direction
      );
    },
    setSlidesPosition: function (index, slideLeft, slideRight, direction) {
      // reposition holder and nearest slides
      if (this.slides.length > 1) {
        var prevIndex =
          typeof slideLeft === "number"
            ? slideLeft
            : index > 0
            ? index - 1
            : this.slides.length - 1;
        var nextIndex =
          typeof slideRight === "number"
            ? slideRight
            : index < this.slides.length - 1
            ? index + 1
            : 0;

        this.slider.css(
          this.animProperty,
          this.swipeOffset ? this.swipeOffset : -this.slideSize
        );
        this.slides
          .css(this.positionProperty, -9999)
          .eq(index)
          .css(this.positionProperty, this.slideSize);
        if (prevIndex === nextIndex && typeof direction === "number") {
          var calcOffset = direction > 0 ? this.slideSize * 2 : 0;
          this.slides.eq(nextIndex).css(this.positionProperty, calcOffset);
        } else {
          this.slides.eq(prevIndex).css(this.positionProperty, 0);
          this.slides
            .eq(nextIndex)
            .css(this.positionProperty, this.slideSize * 2);
        }
      }
    },
    switchSlide: function () {
      // prepare positions and calculate offset
      var self = this;
      var oldSlide = this.slides.eq(this.prevIndex);
      var newSlide = this.slides.eq(this.currentIndex);
      this.animating = true;

      // resize mask to fit slide
      if (this.options.maskAutoSize) {
        this.mask.animate(
          {
            height: newSlide.outerHeight(true),
          },
          {
            duration: this.options.animSpeed,
          }
        );
      }

      // start animation
      var animProps = {};
      animProps[this.animProperty] =
        this.direction > 0 ? -this.slideSize * 2 : 0;
      this.preparePosition();
      this.slider.animate(animProps, {
        duration: this.options.animSpeed,
        complete: function () {
          self.setSlidesPosition(self.currentIndex);

          // start autorotation
          self.animating = false;
          self.autoRotate();

          // onchange callback
          self.makeCallback("onChange", self);
        },
      });

      // refresh classes
      this.refreshState();

      // onchange callback
      this.makeCallback("onBeforeChange", this);
    },
    refreshState: function (initial) {
      // slide change function
      this.slides
        .removeClass(this.options.activeClass)
        .eq(this.currentIndex)
        .addClass(this.options.activeClass);
      this.pagerLinks
        .removeClass(this.options.activeClass)
        .eq(this.currentIndex)
        .addClass(this.options.activeClass);

      // display current slide number
      this.currentNumber.html(this.currentIndex + 1);
      this.totalNumber.html(this.slides.length);

      // add class if not enough slides
      this.holder.toggleClass("not-enough-slides", this.slides.length === 1);
    },
    autoRotate: function () {
      var self = this;
      clearTimeout(this.timer);
      if (this.options.autoRotation) {
        this.timer = setTimeout(function () {
          self.nextSlide();
        }, this.options.switchTime);
      }
    },
    makeCallback: function (name) {
      if (typeof this.options[name] === "function") {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    },
    destroy: function () {
      // destroy handler
      this.btnPrev.unbind("click", this.btnPrevHandler);
      this.btnNext.unbind("click", this.btnNextHandler);
      this.pagerLinks.unbind("click", this.pagerLinksHandler);
      this.holder.unbind("mouseenter", this.hoverHandler);
      this.holder.unbind("mouseleave", this.leaveHandler);
      $(window).unbind("load resize orientationchange", this.resizeHandler);
      clearTimeout(this.timer);

      // destroy swipe handler
      if (this.swipeHandler) {
        this.swipeHandler.destroy();
      }

      // remove inline styles, classes and pagination
      this.holder.removeClass(this.options.galleryReadyClass);
      this.slider.add(this.slides).removeAttr("style");
      if (typeof this.options.generatePagination === "string") {
        this.pagerHolder.empty();
      }
    },
  };

  // detect device type
  var isTouchDevice =
    /Windows Phone/.test(navigator.userAgent) ||
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch);

  // jquery plugin
  $.fn.scrollAbsoluteGallery = function (opt) {
    return this.each(function () {
      $(this).data(
        "ScrollAbsoluteGallery",
        new ScrollAbsoluteGallery($.extend(opt, { holder: this }))
      );
    });
  };
})(jQuery);

/*
 * jQuery SlideShow plugin
 */
(function ($) {
  function CustomCarousel(options) {
    this.options = $.extend(
      {
        slides: "ul.slideset > li",
        activeClass: "active",
        disabledClass: "disabled",
        btnPrev: "a.btn-prev",
        btnNext: "a.btn-next",
        generatePagination: false,
        pagerList: "<ul>",
        pagerListItem: '<li><a href="#"></a></li>',
        pagerListItemText: "a",
        pagerLinks: ".pagination li",
        currentNumber: "span.current-num",
        totalNumber: "span.total-num",
        btnPlay: ".btn-play",
        btnPause: ".btn-pause",
        btnPlayPause: ".btn-play-pause",
        galleryReadyClass: "gallery-js-ready",
        autorotationActiveClass: "autorotation-active",
        autorotationDisabledClass: "autorotation-disabled",
        autorotationStopAfterClick: false,
        circularRotation: true,
        switchSimultaneously: true,
        disableWhileAnimating: false,
        disableFadeIE: false,
        autoRotation: false,
        pauseOnHover: true,
        autoHeight: false,
        useSwipe: false,
        swipeThreshold: 15,
        switchTime: 4000,
        animSpeed: 600,
        event: "click",
      },
      options
    );
    this.init();
  }
  CustomCarousel.prototype = {
    init: function () {
      if (this.options.holder) {
        this.findElements();
        this.attachEvents();
        this.refreshState(true);
        this.autoRotate();
        this.makeCallback("onInit", this);
      }
    },
    findElements: function () {
      // control elements
      this.gallery = $(this.options.holder).addClass(
        this.options.galleryReadyClass
      );
      this.slides = this.gallery.find(this.options.slides);
      this.slidesHolder = this.slides.eq(0).parent();
      this.stepsCount = this.slides.length;
      this.btnPrev = this.gallery.find(this.options.btnPrev);
      this.btnNext = this.gallery.find(this.options.btnNext);
      this.currentIndex = 0;

      // disable fade effect in old IE
      if (this.options.disableFadeIE && !$.support.opacity) {
        this.options.animSpeed = 0;
      }

      // create gallery pagination
      if (typeof this.options.generatePagination === "string") {
        this.pagerHolder = this.gallery
          .find(this.options.generatePagination)
          .empty();
        this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
        for (var i = 0; i < this.stepsCount; i++) {
          $(this.options.pagerListItem)
            .appendTo(this.pagerList)
            .find(this.options.pagerListItemText)
            .text(i + 1);
        }
        this.pagerLinks = this.pagerList.children();
      } else {
        this.pagerLinks = this.gallery.find(this.options.pagerLinks);
      }

      // get start index
      var activeSlide = this.slides.filter("." + this.options.activeClass);
      if (activeSlide.length) {
        this.currentIndex = this.slides.index(activeSlide);
      }
      this.prevIndex = this.currentIndex;

      // autorotation control buttons
      this.btnPlay = this.gallery.find(this.options.btnPlay);
      this.btnPause = this.gallery.find(this.options.btnPause);
      this.btnPlayPause = this.gallery.find(this.options.btnPlayPause);

      // misc elements
      this.curNum = this.gallery.find(this.options.currentNumber);
      this.allNum = this.gallery.find(this.options.totalNumber);

      // handle flexible layout
      this.slides
        .css({
          opacity: "",
          left: -9999,
          top: -9999,
        })
        .eq(this.currentIndex)
        .css({
          opacity: "",
          left: "",
          top: "",
        });
    },
    attachEvents: function () {
      var self = this;

      // flexible layout handler
      this.resizeHandler = function () {
        self.onWindowResize();
      };
      $(window).bind("load resize orientationchange", this.resizeHandler);

      if (this.btnPrev.length) {
        this.btnPrevHandler = function (e) {
          e.preventDefault();
          self.prevSlide();
          if (self.options.autorotationStopAfterClick) {
            self.stopRotation();
          }
        };
        this.btnPrev.bind(this.options.event, this.btnPrevHandler);
      }
      if (this.btnNext.length) {
        this.btnNextHandler = function (e) {
          e.preventDefault();
          self.nextSlide();
          if (self.options.autorotationStopAfterClick) {
            self.stopRotation();
          }
        };
        this.btnNext.bind(this.options.event, this.btnNextHandler);
      }
      if (this.pagerLinks.length) {
        this.pagerLinksHandler = function (e) {
          e.preventDefault();
          self.numSlide(self.pagerLinks.index(e.currentTarget));
          if (self.options.autorotationStopAfterClick) {
            self.stopRotation();
          }
        };
        this.pagerLinks.bind(self.options.event, this.pagerLinksHandler);
      }

      // autorotation buttons handler
      if (this.btnPlay.length) {
        this.btnPlayHandler = function (e) {
          e.preventDefault();
          self.startRotation();
        };
        this.btnPlay.bind(this.options.event, this.btnPlayHandler);
      }
      if (this.btnPause.length) {
        this.btnPauseHandler = function (e) {
          e.preventDefault();
          self.stopRotation();
        };
        this.btnPause.bind(this.options.event, this.btnPauseHandler);
      }
      if (this.btnPlayPause.length) {
        this.btnPlayPauseHandler = function (e) {
          e.preventDefault();
          if (!self.gallery.hasClass(self.options.autorotationActiveClass)) {
            self.startRotation();
          } else {
            self.stopRotation();
          }
        };
        this.btnPlayPause.bind(this.options.event, this.btnPlayPauseHandler);
      }

      // swipe gestures handler
      if (this.options.useSwipe && window.Hammer && isTouchDevice) {
        this.swipeHandler = new Hammer.Manager(this.gallery[0]);
        this.swipeHandler.add(
          new Hammer.Swipe({
            direction: Hammer.DIRECTION_HORIZONTAL,
            threshold: self.options.swipeThreshold,
          })
        );
        this.swipeHandler
          .on("swipeleft", function () {
            self.nextSlide();
          })
          .on("swiperight", function () {
            self.prevSlide();
          });
      }

      // pause on hover handling
      if (this.options.pauseOnHover) {
        this.hoverHandler = function () {
          if (self.options.autoRotation) {
            self.galleryHover = true;
            self.pauseRotation();
          }
        };
        this.leaveHandler = function () {
          if (self.options.autoRotation) {
            self.galleryHover = false;
            self.resumeRotation();
          }
        };
        this.gallery.bind({
          mouseenter: this.hoverHandler,
          mouseleave: this.leaveHandler,
        });
      }
    },
    onWindowResize: function () {
      if (this.options.autoHeight) {
        this.slidesHolder.css({
          height: this.slides.eq(this.currentIndex).outerHeight(true),
        });
      }
    },
    prevSlide: function () {
      if (!(this.options.disableWhileAnimating && this.galleryAnimating)) {
        this.prevIndex = this.currentIndex;
        if (this.currentIndex > 0) {
          this.currentIndex--;
          this.switchSlide();
        } else if (this.options.circularRotation) {
          this.currentIndex = this.stepsCount - 1;
          this.switchSlide();
        }
      }
    },
    nextSlide: function (fromAutoRotation) {
      if (!(this.options.disableWhileAnimating && this.galleryAnimating)) {
        this.prevIndex = this.currentIndex;
        if (this.currentIndex < this.stepsCount - 1) {
          this.currentIndex++;
          this.switchSlide();
        } else if (this.options.circularRotation || fromAutoRotation === true) {
          this.currentIndex = 0;
          this.switchSlide();
        }
      }
    },
    numSlide: function (c) {
      if (this.currentIndex != c) {
        this.prevIndex = this.currentIndex;
        this.currentIndex = c;
        this.switchSlide();
      }
    },
    switchSlide: function () {
      var self = this;
      if (this.slides.length > 1) {
        this.galleryAnimating = true;
        MethodsObj[this.gallery.data("effect")].switchSlide(self);
        this.refreshState();
        // onchange callback
        this.makeCallback("onBeforeChange", this);
      }
    },
    refreshState: function (initial) {
      this.slides
        .removeClass(this.options.activeClass)
        .eq(this.currentIndex)
        .addClass(this.options.activeClass);
      this.pagerLinks
        .removeClass(this.options.activeClass)
        .eq(this.currentIndex)
        .addClass(this.options.activeClass);
      this.curNum.html(this.currentIndex + 1);
      this.allNum.html(this.stepsCount);

      // initial refresh
      if (this.options.autoHeight) {
        if (initial) {
          this.slidesHolder.css({
            height: this.slides.eq(this.currentIndex).outerHeight(true),
          });
        } else {
          this.slidesHolder
            .stop()
            .animate(
              { height: this.slides.eq(this.currentIndex).outerHeight(true) },
              { duration: this.options.animSpeed }
            );
        }
      }

      // disabled state
      if (!this.options.circularRotation) {
        this.btnPrev.add(this.btnNext).removeClass(this.options.disabledClass);
        if (this.currentIndex === 0)
          this.btnPrev.addClass(this.options.disabledClass);
        if (this.currentIndex === this.stepsCount - 1)
          this.btnNext.addClass(this.options.disabledClass);
      }

      // add class if not enough slides
      this.gallery.toggleClass("not-enough-slides", this.stepsCount === 1);
    },
    startRotation: function () {
      this.options.autoRotation = true;
      this.galleryHover = false;
      this.autoRotationStopped = false;
      this.resumeRotation();
    },
    stopRotation: function () {
      this.galleryHover = true;
      this.autoRotationStopped = true;
      this.pauseRotation();
    },
    pauseRotation: function () {
      this.gallery.addClass(this.options.autorotationDisabledClass);
      this.gallery.removeClass(this.options.autorotationActiveClass);
      clearTimeout(this.timer);
    },
    resumeRotation: function () {
      if (!this.autoRotationStopped) {
        this.gallery.addClass(this.options.autorotationActiveClass);
        this.gallery.removeClass(this.options.autorotationDisabledClass);
        this.autoRotate();
      }
    },
    autoRotate: function () {
      var self = this;
      clearTimeout(this.timer);
      if (
        this.options.autoRotation &&
        !this.galleryHover &&
        !this.autoRotationStopped
      ) {
        this.gallery.addClass(this.options.autorotationActiveClass);
        this.timer = setTimeout(function () {
          self.nextSlide(true);
        }, this.options.switchTime);
      } else {
        this.pauseRotation();
      }
    },
    makeCallback: function (name) {
      if (typeof this.options[name] === "function") {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    },
    destroy: function () {
      // navigation buttons handler
      this.btnPrev.unbind(this.options.event, this.btnPrevHandler);
      this.btnNext.unbind(this.options.event, this.btnNextHandler);
      this.pagerLinks.unbind(this.options.event, this.pagerLinksHandler);
      $(window).unbind("load resize orientationchange", this.resizeHandler);

      // remove autorotation handlers
      this.stopRotation();
      this.btnPlay.unbind(this.options.event, this.btnPlayHandler);
      this.btnPause.unbind(this.options.event, this.btnPauseHandler);
      this.btnPlayPause.unbind(this.options.event, this.btnPlayPauseHandler);
      this.gallery.unbind("mouseenter", this.hoverHandler);
      this.gallery.unbind("mouseleave", this.leaveHandler);

      // remove swipe handler if used
      if (this.swipeHandler) {
        this.swipeHandler.destroy();
      }
      if (typeof this.options.generatePagination === "string") {
        this.pagerHolder.empty();
      }

      // remove unneeded classes and styles
      var unneededClasses = [
        this.options.galleryReadyClass,
        this.options.autorotationActiveClass,
        this.options.autorotationDisabledClass,
      ];
      this.gallery.removeClass(unneededClasses.join(" "));
      this.slidesHolder.add(this.slides).removeAttr("style");
    },
  };

  var MethodsObj = {
    fade: {
      switchSlide: function (obj) {
        var prevSlide = obj.slides.eq(obj.prevIndex);
        var nextSlide = obj.slides.eq(obj.currentIndex);
        prevSlide.stop().animate(
          {
            opacity: 0,
          },
          {
            duration: obj.options.animSpeed,
            complete: function () {
              prevSlide.css({
                opacity: "",
                left: -9999,
                top: -9999,
              });
            },
          }
        );

        nextSlide
          .css({
            opacity: 0,
            left: "",
            top: "",
          })
          .stop()
          .animate(
            {
              opacity: 1,
            },
            {
              duration: obj.options.animSpeed,
              complete: function () {
                nextSlide.css({
                  opacity: "",
                });
                obj.galleryAnimating = false;
                obj.autoRotate();

                // onchange callback
                obj.makeCallback("onChange", obj);
              },
            }
          );
      },
    },
    slide: {
      switchSlide: function (obj) {
        var prevSlide = obj.slides.eq(obj.prevIndex);
        var nextSlide = obj.slides.eq(obj.currentIndex);
        var direction;

        if (obj.prevIndex < obj.currentIndex) {
          direction = 1;
        } else {
          direction = -1;
        }
        prevSlide.stop().animate(
          {
            left: -direction * obj.slidesHolder.width(),
          },
          {
            duration: obj.options.animSpeed,
            complete: function () {
              prevSlide.css({
                left: "",
                left: -9999,
                top: -9999,
              });
            },
          }
        );

        nextSlide
          .css({
            left: direction * obj.slidesHolder.width(),
            top: "",
          })
          .stop()
          .animate(
            {
              left: 0,
            },
            {
              duration: obj.options.animSpeed,
              complete: function () {
                nextSlide.css({
                  left: "",
                });
                obj.galleryAnimating = false;
                obj.autoRotate();

                // onchange callback
                obj.makeCallback("onChange", self);
              },
            }
          );
      },
    },
  };

  // detect device type
  var isTouchDevice =
    /Windows Phone/.test(navigator.userAgent) ||
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch);

  // jquery plugin
  $.fn.customCarousel = function (opt) {
    return this.each(function () {
      $(this).data(
        "CustomCarousel",
        new CustomCarousel($.extend(opt, { holder: this }))
      );
    });
  };
})(jQuery);

/*
 * Popups plugin
 */
(function ($) {
  function ContentPopup(opt) {
    this.options = $.extend(
      {
        holder: null,
        popup: ".popup",
        btnOpen: ".open",
        btnClose: ".close",
        openClass: "popup-active",
        clickEvent: "click",
        mode: "click",
        hideOnClickLink: true,
        hideOnClickOutside: true,
        delay: 50,
      },
      opt
    );
    if (this.options.holder) {
      this.holder = $(this.options.holder);
      this.init();
    }
  }
  ContentPopup.prototype = {
    init: function () {
      this.findElements();
      this.attachEvents();
      this.makeCallback("onInit", this);
    },
    findElements: function () {
      this.popup = this.holder.find(this.options.popup);
      this.btnOpen = this.holder.find(this.options.btnOpen);
      this.btnClose = this.holder.find(this.options.btnClose);
    },
    attachEvents: function () {
      // handle popup openers
      var self = this;
      this.clickMode =
        isTouchDevice || self.options.mode === self.options.clickEvent;

      if (this.clickMode) {
        // handle click mode
        this.btnOpen.bind(self.options.clickEvent, function (e) {
          self.makeCallback("onClick", self);
          if (self.holder.hasClass(self.options.openClass)) {
            if (self.options.hideOnClickLink) {
              self.hidePopup();
            }
          } else {
            self.showPopup();
          }
          e.preventDefault();
        });

        // prepare outside click handler
        this.outsideClickHandler = this.bind(this.outsideClickHandler, this);
      } else {
        // handle hover mode
        var timer,
          delayedFunc = function (func) {
            clearTimeout(timer);
            timer = setTimeout(function () {
              func.call(self);
            }, self.options.delay);
          };
        this.btnOpen
          .bind("mouseover", function () {
            delayedFunc(self.showPopup);
          })
          .bind("mouseout", function () {
            delayedFunc(self.hidePopup);
          });
        this.popup
          .bind("mouseover", function () {
            delayedFunc(self.showPopup);
          })
          .bind("mouseout", function () {
            delayedFunc(self.hidePopup);
          });
      }

      // handle close buttons
      this.btnClose.bind(self.options.clickEvent, function (e) {
        self.hidePopup();
        e.preventDefault();
      });
    },
    outsideClickHandler: function (e) {
      // hide popup if clicked outside
      var targetNode = $((e.changedTouches ? e.changedTouches[0] : e).target);
      if (
        !targetNode.closest(this.popup).length &&
        !targetNode.closest(this.btnOpen).length
      ) {
        this.hidePopup();
      }
    },
    showPopup: function () {
      // reveal popup
      this.holder.addClass(this.options.openClass);
      this.popup.css({ display: "block" });

      // outside click handler
      if (
        this.clickMode &&
        this.options.hideOnClickOutside &&
        !this.outsideHandlerActive
      ) {
        this.outsideHandlerActive = true;
        $(document).bind("click touchstart", this.outsideClickHandler);
      }

      this.makeCallback("onShow", this);
    },
    hidePopup: function () {
      // hide popup
      this.holder.removeClass(this.options.openClass);
      this.popup.css({ display: "none" });

      // outside click handler
      if (
        this.clickMode &&
        this.options.hideOnClickOutside &&
        this.outsideHandlerActive
      ) {
        this.outsideHandlerActive = false;
        $(document).unbind("click touchstart", this.outsideClickHandler);
      }
      this.makeCallback("onHide", this);
    },
    makeCallback: function (name) {
      if (typeof this.options[name] === "function") {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    },
    bind: function (f, scope, forceArgs) {
      return function () {
        return f.apply(scope, forceArgs ? [forceArgs] : arguments);
      };
    },
  };

  // detect touch devices
  var isTouchDevice =
    /Windows Phone/.test(navigator.userAgent) ||
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch);

  // jQuery plugin interface
  $.fn.contentPopup = function (opt) {
    return this.each(function () {
      new ContentPopup($.extend(opt, { holder: this }));
    });
  };
})(jQuery);

/*
 * Simple Mobile Navigation
 */
(function ($) {
  function MobileNav(options) {
    this.options = $.extend(
      {
        container: null,
        hideOnClickOutside: false,
        menuActiveClass: "nav-active",
        menuOpener: ".nav-opener",
        menuDrop: ".nav-drop",
        toggleEvent: "click",
        outsideClickEvent: "click touchstart pointerdown MSPointerDown",
      },
      options
    );
    this.initStructure();
    this.attachEvents();
  }
  MobileNav.prototype = {
    initStructure: function () {
      this.page = $("html");
      this.container = $(this.options.container);
      this.opener = this.container.find(this.options.menuOpener);
      this.drop = this.container.find(this.options.menuDrop);
    },
    attachEvents: function () {
      var self = this;

      if (activateResizeHandler) {
        activateResizeHandler();
        activateResizeHandler = null;
      }

      this.outsideClickHandler = function (e) {
        if (self.isOpened()) {
          var target = $(e.target);
          if (
            !target.closest(self.opener).length &&
            !target.closest(self.drop).length
          ) {
            self.hide();
          }
        }
      };

      this.openerClickHandler = function (e) {
        e.preventDefault();
        self.toggle();
      };

      this.opener.on(this.options.toggleEvent, this.openerClickHandler);
    },
    isOpened: function () {
      return this.container.hasClass(this.options.menuActiveClass);
    },
    show: function () {
      this.container.addClass(this.options.menuActiveClass);
      if (this.options.hideOnClickOutside) {
        this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    hide: function () {
      this.container.removeClass(this.options.menuActiveClass);
      if (this.options.hideOnClickOutside) {
        this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    toggle: function () {
      if (this.isOpened()) {
        this.hide();
      } else {
        this.show();
      }
    },
    destroy: function () {
      this.container.removeClass(this.options.menuActiveClass);
      this.opener.off(this.options.toggleEvent, this.clickHandler);
      this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
    },
  };

  var activateResizeHandler = function () {
    var win = $(window),
      doc = $("html"),
      resizeClass = "resize-active",
      flag,
      timer;
    var removeClassHandler = function () {
      flag = false;
      doc.removeClass(resizeClass);
    };
    var resizeHandler = function () {
      if (!flag) {
        flag = true;
        doc.addClass(resizeClass);
      }
      clearTimeout(timer);
      timer = setTimeout(removeClassHandler, 500);
    };
    win.on("resize orientationchange", resizeHandler);
  };

  $.fn.mobileNav = function (options) {
    return this.each(function () {
      var params = $.extend({}, options, { container: this }),
        instance = new MobileNav(params);
      $.data(this, "MobileNav", instance);
    });
  };
})(jQuery);

/*
 * jQuery Load More plugin
 */
(function ($, $win) {
  "use strict";

  var ScrollLoader = {
    attachEvents: function () {
      var self = this;

      $win.on(
        "load.ScrollLoader resize.ScrollLoader orientationchange.ScrollLoader",
        function () {
          self.onResizeHandler();
        }
      );
      $win.on("scroll.ScrollLoader", function () {
        self.onScrollHandler();
      });
      this.$holder.on("ContentLoader/loaded.ScrollLoader", function () {
        self.onResizeHandler();
      });

      this.winProps = {};
      this.holderProps = {};
      this.onResizeHandler();
    },

    onResizeHandler: function () {
      this.winProps.height = $win.height();
      this.holderProps.height = this.$holder.outerHeight();
      this.holderProps.offset = this.$holder.offset().top;

      this.onScrollHandler();
    },

    onScrollHandler: function () {
      this.winProps.scroll = $win.scrollTop();

      if (
        this.winProps.scroll +
          this.winProps.height +
          Math.min(1, this.options.additionBottomOffset) >
        this.holderProps.height + this.holderProps.offset
      ) {
        this.loadInclude();
      }
    },

    destroySubEvents: function () {
      $win.off(".ScrollLoader");
      this.$holder.off(".ScrollLoader");
    },
  };

  var ClickLoader = {
    attachEvents: function () {
      var self = this;

      this.$holder.on(
        "click.ClickLoader",
        this.options.linkSelector,
        function (e) {
          self.onClickHandler(e);
        }
      );
    },

    onClickHandler: function (e) {
      e.preventDefault();

      this.loadInclude();
    },

    destroySubEvents: function () {
      this.$holder.off(".ClickLoader");
    },
  };

  var ContentLoader = function ($holder, options) {
    this.$holder = $holder;
    this.options = options;

    this.init();
  };

  var ContentLoaderProto = {
    init: function () {
      this.$link = this.$holder.find(this.options.linkSelector);
      this.$newContentTarget = this.options.newContentTarget
        ? this.$holder.find(this.options.newContentTarget)
        : this.$holder;

      if (!this.$link.length) {
        this.removeInstance();
        return;
      }

      this.attachEvents();
    },

    loadInclude: function () {
      if (this.isBusy) {
        return;
      }

      var self = this;

      this.toggleBusyMode(true);

      $.get(self.$link.attr("href"), function (source) {
        self.successHandler(source);
      });
    },

    successHandler: function (include) {
      var $tmpDiv = jQuery("<div>").html(include);
      var $nextIncludeLink = $tmpDiv.find(this.options.linkSelector);

      if ($nextIncludeLink.length) {
        this.refreshLink($nextIncludeLink);
      } else {
        this.destroy();
      }

      this.appendItems($tmpDiv.children());
    },

    appendItems: function ($newItems) {
      var self = this;

      this.$newContentTarget.append(
        $newItems.addClass(this.options.preAppendClass)
      );

      setTimeout(function () {
        // need this timeout coz need some time for css preAppendClass applied to the new items
        $newItems.removeClass(self.options.preAppendClass);

        self.$holder.trigger("ContentLoader/loaded");
        self.toggleBusyMode(false);
      }, 100);

      if (window.picturefill) {
        window.picturefill();
      }
    },

    refreshLink: function ($nextIncludeLink) {
      this.$link.attr("href", $nextIncludeLink.attr("href"));
      $nextIncludeLink.remove();
    },

    toggleBusyMode: function (state) {
      this.$holder.toggleClass(this.options.busyClass, state);
      this.isBusy = state;
    },

    removeInstance: function () {
      this.$holder.removeData("ContentLoader");
    },

    destroy: function () {
      this.removeInstance();
      this.destroySubEvents();

      this.$link.remove();
    },
  };

  $.fn.loadMore = function (options) {
    options = $.extend(
      {
        scroll: false,
        linkSelector: ".load-more",
        newContentTarget: null,
        busyClass: "is-busy",
        additionBottomOffset: 50,
        preAppendClass: "new-item",
      },
      options
    );

    return this.each(function () {
      var $holder = $(this);

      ContentLoader.prototype = $.extend(
        options.scroll ? ScrollLoader : ClickLoader,
        ContentLoaderProto
      );

      $holder.data("ContentLoader", new ContentLoader($holder, options));
    });
  };
})(jQuery, jQuery(window));

/*
 * jQuery SameHeight plugin
 */
(function ($) {
  $.fn.sameHeight = function (opt) {
    var options = $.extend(
      {
        skipClass: "same-height-ignore",
        leftEdgeClass: "same-height-left",
        rightEdgeClass: "same-height-right",
        elements: ">*",
        flexible: false,
        multiLine: false,
        useMinHeight: false,
        biggestHeight: false,
      },
      opt
    );
    return this.each(function () {
      var holder = $(this),
        postResizeTimer,
        ignoreResize;
      var elements = holder.find(options.elements).not("." + options.skipClass);
      if (!elements.length) return;

      // resize handler
      function doResize() {
        elements.css(
          options.useMinHeight && supportMinHeight ? "minHeight" : "height",
          ""
        );
        if (options.multiLine) {
          // resize elements row by row
          resizeElementsByRows(elements, options);
        } else {
          // resize elements by holder
          resizeElements(elements, holder, options);
        }
      }
      doResize();

      // handle flexible layout / font resize
      var delayedResizeHandler = function () {
        if (!ignoreResize) {
          ignoreResize = true;
          doResize();
          clearTimeout(postResizeTimer);
          postResizeTimer = setTimeout(function () {
            doResize();
            setTimeout(function () {
              ignoreResize = false;
            }, 10);
          }, 100);
        }
      };

      // handle flexible/responsive layout
      if (options.flexible) {
        $(window).bind(
          "resize orientationchange fontresize",
          delayedResizeHandler
        );
      }

      // handle complete page load including images and fonts
      $(window).bind("load", delayedResizeHandler);
    });
  };

  // detect css min-height support
  var supportMinHeight =
    typeof document.documentElement.style.maxHeight !== "undefined";

  // get elements by rows
  function resizeElementsByRows(boxes, options) {
    var currentRow = $(),
      maxHeight,
      maxCalcHeight = 0,
      firstOffset = boxes.eq(0).offset().top;
    boxes.each(function (ind) {
      var curItem = $(this);
      if (curItem.offset().top === firstOffset) {
        currentRow = currentRow.add(this);
      } else {
        maxHeight = getMaxHeight(currentRow);
        maxCalcHeight = Math.max(
          maxCalcHeight,
          resizeElements(currentRow, maxHeight, options)
        );
        currentRow = curItem;
        firstOffset = curItem.offset().top;
      }
    });
    if (currentRow.length) {
      maxHeight = getMaxHeight(currentRow);
      maxCalcHeight = Math.max(
        maxCalcHeight,
        resizeElements(currentRow, maxHeight, options)
      );
    }
    if (options.biggestHeight) {
      boxes.css(
        options.useMinHeight && supportMinHeight ? "minHeight" : "height",
        maxCalcHeight
      );
    }
  }

  // calculate max element height
  function getMaxHeight(boxes) {
    var maxHeight = 0;
    boxes.each(function () {
      maxHeight = Math.max(maxHeight, $(this).outerHeight());
    });
    return maxHeight;
  }

  // resize helper function
  function resizeElements(boxes, parent, options) {
    var calcHeight;
    var parentHeight = typeof parent === "number" ? parent : parent.height();
    boxes
      .removeClass(options.leftEdgeClass)
      .removeClass(options.rightEdgeClass)
      .each(function (i) {
        var element = $(this);
        var depthDiffHeight = 0;
        var isBorderBox =
          element.css("boxSizing") === "border-box" ||
          element.css("-moz-box-sizing") === "border-box" ||
          element.css("-webkit-box-sizing") === "border-box";

        if (typeof parent !== "number") {
          element.parents().each(function () {
            var tmpParent = $(this);
            if (parent.is(this)) {
              return false;
            } else {
              depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
            }
          });
        }
        calcHeight = parentHeight - depthDiffHeight;
        calcHeight -= isBorderBox
          ? 0
          : element.outerHeight() - element.height();

        if (calcHeight > 0) {
          element.css(
            options.useMinHeight && supportMinHeight ? "minHeight" : "height",
            calcHeight
          );
        }
      });
    boxes.filter(":first").addClass(options.leftEdgeClass);
    boxes.filter(":last").addClass(options.rightEdgeClass);
    return calcHeight;
  }
})(jQuery);

/*
 * jQuery FontResize Event
 */
jQuery.onFontResize = (function ($) {
  $(function () {
    var randomID = "font-resize-frame-" + Math.floor(Math.random() * 1000);
    var resizeFrame = $("<iframe>")
      .attr("id", randomID)
      .addClass("font-resize-helper");

    // required styles
    resizeFrame
      .css({
        width: "100em",
        height: "10px",
        position: "absolute",
        borderWidth: 0,
        top: "-9999px",
        left: "-9999px",
      })
      .appendTo("body");

    // use native IE resize event if possible
    if (window.attachEvent && !window.addEventListener) {
      resizeFrame.bind("resize", function () {
        $.onFontResize.trigger(resizeFrame[0].offsetWidth / 100);
      });
    }
    // use script inside the iframe to detect resize for other browsers
    else {
      var doc = resizeFrame[0].contentWindow.document;
      doc.open();
      doc.write(
        "<scri" +
          'pt>window.onload = function(){var em = parent.jQuery("#' +
          randomID +
          '")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</scri' +
          "pt>"
      );
      doc.close();
    }
    jQuery.onFontResize.initialSize = resizeFrame[0].offsetWidth / 100;
  });
  return {
    // public method, so it can be called from within the iframe
    trigger: function (em) {
      $(window).trigger("fontresize", [em]);
    },
  };
})(jQuery);

/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
(function (root, factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("jquery"));
  } else {
    root.jcf = factory(jQuery);
  }
})(this, function ($) {
  "use strict";

  // define version
  var version = "1.1.3";

  // private variables
  var customInstances = [];

  // default global options
  var commonOptions = {
    optionsKey: "jcf",
    dataKey: "jcf-instance",
    rtlClass: "jcf-rtl",
    focusClass: "jcf-focus",
    pressedClass: "jcf-pressed",
    disabledClass: "jcf-disabled",
    hiddenClass: "jcf-hidden",
    resetAppearanceClass: "jcf-reset-appearance",
    unselectableClass: "jcf-unselectable",
  };

  // detect device type
  var isTouchDevice =
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch),
    isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
  commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);

  // create global stylesheet if custom forms are used
  var createStyleSheet = function () {
    var styleTag = $("<style>").appendTo("head"),
      styleSheet = styleTag.prop("sheet") || styleTag.prop("styleSheet");

    // crossbrowser style handling
    var addCSSRule = function (selector, rules, index) {
      if (styleSheet.insertRule) {
        styleSheet.insertRule(selector + "{" + rules + "}", index);
      } else {
        styleSheet.addRule(selector, rules, index);
      }
    };

    // add special rules
    addCSSRule(
      "." + commonOptions.hiddenClass,
      "position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none"
    );
    addCSSRule(
      "." + commonOptions.rtlClass + " ." + commonOptions.hiddenClass,
      "right:-9999px !important; left: auto !important"
    );
    addCSSRule(
      "." + commonOptions.unselectableClass,
      "-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);"
    );
    addCSSRule(
      "." + commonOptions.resetAppearanceClass,
      "background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);"
    );

    // detect rtl pages
    var html = $("html"),
      body = $("body");
    if (html.css("direction") === "rtl" || body.css("direction") === "rtl") {
      html.addClass(commonOptions.rtlClass);
    }

    // handle form reset event
    html.on("reset", function () {
      setTimeout(function () {
        api.refreshAll();
      }, 0);
    });

    // mark stylesheet as created
    commonOptions.styleSheetCreated = true;
  };

  // simplified pointer events handler
  (function () {
    var pointerEventsSupported =
        navigator.pointerEnabled || navigator.msPointerEnabled,
      touchEventsSupported =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch),
      eventList,
      eventMap = {},
      eventPrefix = "jcf-";

    // detect events to attach
    if (pointerEventsSupported) {
      eventList = {
        pointerover: navigator.pointerEnabled ? "pointerover" : "MSPointerOver",
        pointerdown: navigator.pointerEnabled ? "pointerdown" : "MSPointerDown",
        pointermove: navigator.pointerEnabled ? "pointermove" : "MSPointerMove",
        pointerup: navigator.pointerEnabled ? "pointerup" : "MSPointerUp",
      };
    } else {
      eventList = {
        pointerover: "mouseover",
        pointerdown: "mousedown" + (touchEventsSupported ? " touchstart" : ""),
        pointermove: "mousemove" + (touchEventsSupported ? " touchmove" : ""),
        pointerup: "mouseup" + (touchEventsSupported ? " touchend" : ""),
      };
    }

    // create event map
    $.each(eventList, function (targetEventName, fakeEventList) {
      $.each(fakeEventList.split(" "), function (index, fakeEventName) {
        eventMap[fakeEventName] = targetEventName;
      });
    });

    // jQuery event hooks
    $.each(eventList, function (eventName, eventHandlers) {
      eventHandlers = eventHandlers.split(" ");
      $.event.special[eventPrefix + eventName] = {
        setup: function () {
          var self = this;
          $.each(eventHandlers, function (index, fallbackEvent) {
            if (self.addEventListener)
              self.addEventListener(fallbackEvent, fixEvent, false);
            else self["on" + fallbackEvent] = fixEvent;
          });
        },
        teardown: function () {
          var self = this;
          $.each(eventHandlers, function (index, fallbackEvent) {
            if (self.addEventListener)
              self.removeEventListener(fallbackEvent, fixEvent, false);
            else self["on" + fallbackEvent] = null;
          });
        },
      };
    });

    // check that mouse event are not simulated by mobile browsers
    var lastTouch = null;
    var mouseEventSimulated = function (e) {
      var dx = Math.abs(e.pageX - lastTouch.x),
        dy = Math.abs(e.pageY - lastTouch.y),
        rangeDistance = 25;

      if (dx <= rangeDistance && dy <= rangeDistance) {
        return true;
      }
    };

    // normalize event
    var fixEvent = function (e) {
      var origEvent = e || window.event,
        touchEventData = null,
        targetEventName = eventMap[origEvent.type];

      e = $.event.fix(origEvent);
      e.type = eventPrefix + targetEventName;

      if (origEvent.pointerType) {
        switch (origEvent.pointerType) {
          case 2:
            e.pointerType = "touch";
            break;
          case 3:
            e.pointerType = "pen";
            break;
          case 4:
            e.pointerType = "mouse";
            break;
          default:
            e.pointerType = origEvent.pointerType;
        }
      } else {
        e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
      }

      if (!e.pageX && !e.pageY) {
        touchEventData = origEvent.changedTouches
          ? origEvent.changedTouches[0]
          : origEvent;
        e.pageX = touchEventData.pageX;
        e.pageY = touchEventData.pageY;
      }

      if (origEvent.type === "touchend") {
        lastTouch = { x: e.pageX, y: e.pageY };
      }
      if (e.pointerType === "mouse" && lastTouch && mouseEventSimulated(e)) {
        return;
      } else {
        return ($.event.dispatch || $.event.handle).call(this, e);
      }
    };
  })();

  // custom mousewheel/trackpad handler
  (function () {
    var wheelEvents = ("onwheel" in document || document.documentMode >= 9
        ? "wheel"
        : "mousewheel DOMMouseScroll"
      ).split(" "),
      shimEventName = "jcf-mousewheel";

    $.event.special[shimEventName] = {
      setup: function () {
        var self = this;
        $.each(wheelEvents, function (index, fallbackEvent) {
          if (self.addEventListener)
            self.addEventListener(fallbackEvent, fixEvent, false);
          else self["on" + fallbackEvent] = fixEvent;
        });
      },
      teardown: function () {
        var self = this;
        $.each(wheelEvents, function (index, fallbackEvent) {
          if (self.addEventListener)
            self.removeEventListener(fallbackEvent, fixEvent, false);
          else self["on" + fallbackEvent] = null;
        });
      },
    };

    var fixEvent = function (e) {
      var origEvent = e || window.event;
      e = $.event.fix(origEvent);
      e.type = shimEventName;

      // old wheel events handler
      if ("detail" in origEvent) {
        e.deltaY = -origEvent.detail;
      }
      if ("wheelDelta" in origEvent) {
        e.deltaY = -origEvent.wheelDelta;
      }
      if ("wheelDeltaY" in origEvent) {
        e.deltaY = -origEvent.wheelDeltaY;
      }
      if ("wheelDeltaX" in origEvent) {
        e.deltaX = -origEvent.wheelDeltaX;
      }

      // modern wheel event handler
      if ("deltaY" in origEvent) {
        e.deltaY = origEvent.deltaY;
      }
      if ("deltaX" in origEvent) {
        e.deltaX = origEvent.deltaX;
      }

      // handle deltaMode for mouse wheel
      e.delta = e.deltaY || e.deltaX;
      if (origEvent.deltaMode === 1) {
        var lineHeight = 16;
        e.delta *= lineHeight;
        e.deltaY *= lineHeight;
        e.deltaX *= lineHeight;
      }

      return ($.event.dispatch || $.event.handle).call(this, e);
    };
  })();

  // extra module methods
  var moduleMixin = {
    // provide function for firing native events
    fireNativeEvent: function (elements, eventName) {
      $(elements).each(function () {
        var element = this,
          eventObject;
        if (element.dispatchEvent) {
          eventObject = document.createEvent("HTMLEvents");
          eventObject.initEvent(eventName, true, true);
          element.dispatchEvent(eventObject);
        } else if (document.createEventObject) {
          eventObject = document.createEventObject();
          eventObject.target = element;
          element.fireEvent("on" + eventName, eventObject);
        }
      });
    },
    // bind event handlers for module instance (functions beggining with "on")
    bindHandlers: function () {
      var self = this;
      $.each(self, function (propName, propValue) {
        if (propName.indexOf("on") === 0 && $.isFunction(propValue)) {
          // dont use $.proxy here because it doesn't create unique handler
          self[propName] = function () {
            return propValue.apply(self, arguments);
          };
        }
      });
    },
  };

  // public API
  var api = {
    version: version,
    modules: {},
    getOptions: function () {
      return $.extend({}, commonOptions);
    },
    setOptions: function (moduleName, moduleOptions) {
      if (arguments.length > 1) {
        // set module options
        if (this.modules[moduleName]) {
          $.extend(this.modules[moduleName].prototype.options, moduleOptions);
        }
      } else {
        // set common options
        $.extend(commonOptions, moduleName);
      }
    },
    addModule: function (proto) {
      // add module to list
      var Module = function (options) {
        // save instance to collection
        if (!options.element.data(commonOptions.dataKey)) {
          options.element.data(commonOptions.dataKey, this);
        }
        customInstances.push(this);

        // save options
        this.options = $.extend(
          {},
          commonOptions,
          this.options,
          getInlineOptions(options.element),
          options
        );

        // bind event handlers to instance
        this.bindHandlers();

        // call constructor
        this.init.apply(this, arguments);
      };

      // parse options from HTML attribute
      var getInlineOptions = function (element) {
        var dataOptions = element.data(commonOptions.optionsKey),
          attrOptions = element.attr(commonOptions.optionsKey);

        if (dataOptions) {
          return dataOptions;
        } else if (attrOptions) {
          try {
            return $.parseJSON(attrOptions);
          } catch (e) {
            // ignore invalid attributes
          }
        }
      };

      // set proto as prototype for new module
      Module.prototype = proto;

      // add mixin methods to module proto
      $.extend(proto, moduleMixin);
      if (proto.plugins) {
        $.each(proto.plugins, function (pluginName, plugin) {
          $.extend(plugin.prototype, moduleMixin);
        });
      }

      // override destroy method
      var originalDestroy = Module.prototype.destroy;
      Module.prototype.destroy = function () {
        this.options.element.removeData(this.options.dataKey);

        for (var i = customInstances.length - 1; i >= 0; i--) {
          if (customInstances[i] === this) {
            customInstances.splice(i, 1);
            break;
          }
        }

        if (originalDestroy) {
          originalDestroy.apply(this, arguments);
        }
      };

      // save module to list
      this.modules[proto.name] = Module;
    },
    getInstance: function (element) {
      return $(element).data(commonOptions.dataKey);
    },
    replace: function (elements, moduleName, customOptions) {
      var self = this,
        instance;

      if (!commonOptions.styleSheetCreated) {
        createStyleSheet();
      }

      $(elements).each(function () {
        var moduleOptions,
          element = $(this);

        instance = element.data(commonOptions.dataKey);
        if (instance) {
          instance.refresh();
        } else {
          if (!moduleName) {
            $.each(self.modules, function (currentModuleName, module) {
              if (
                module.prototype.matchElement.call(module.prototype, element)
              ) {
                moduleName = currentModuleName;
                return false;
              }
            });
          }
          if (moduleName) {
            moduleOptions = $.extend({ element: element }, customOptions);
            instance = new self.modules[moduleName](moduleOptions);
          }
        }
      });
      return instance;
    },
    refresh: function (elements) {
      $(elements).each(function () {
        var instance = $(this).data(commonOptions.dataKey);
        if (instance) {
          instance.refresh();
        }
      });
    },
    destroy: function (elements) {
      $(elements).each(function () {
        var instance = $(this).data(commonOptions.dataKey);
        if (instance) {
          instance.destroy();
        }
      });
    },
    replaceAll: function (context) {
      var self = this;
      $.each(this.modules, function (moduleName, module) {
        $(module.prototype.selector, context).each(function () {
          if (this.className.indexOf("jcf-ignore") < 0) {
            self.replace(this, moduleName);
          }
        });
      });
    },
    refreshAll: function (context) {
      if (context) {
        $.each(this.modules, function (moduleName, module) {
          $(module.prototype.selector, context).each(function () {
            var instance = $(this).data(commonOptions.dataKey);
            if (instance) {
              instance.refresh();
            }
          });
        });
      } else {
        for (var i = customInstances.length - 1; i >= 0; i--) {
          customInstances[i].refresh();
        }
      }
    },
    destroyAll: function (context) {
      if (context) {
        $.each(this.modules, function (moduleName, module) {
          $(module.prototype.selector, context).each(function (index, element) {
            var instance = $(element).data(commonOptions.dataKey);
            if (instance) {
              instance.destroy();
            }
          });
        });
      } else {
        while (customInstances.length) {
          customInstances[0].destroy();
        }
      }
    },
  };

  // always export API to the global window object
  window.jcf = api;

  return api;
});

/*!
 * JavaScript Custom Forms : Select Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
(function ($, window) {
  "use strict";

  jcf.addModule({
    name: "Select",
    selector: "select",
    options: {
      element: null,
      multipleCompactStyle: false,
    },
    plugins: {
      ListBox: ListBox,
      ComboBox: ComboBox,
      SelectList: SelectList,
    },
    matchElement: function (element) {
      return element.is("select");
    },
    init: function () {
      this.element = $(this.options.element);
      this.createInstance();
    },
    isListBox: function () {
      return this.element.is("[size]:not([jcf-size]), [multiple]");
    },
    createInstance: function () {
      if (this.instance) {
        this.instance.destroy();
      }
      if (this.isListBox() && !this.options.multipleCompactStyle) {
        this.instance = new ListBox(this.options);
      } else {
        this.instance = new ComboBox(this.options);
      }
    },
    refresh: function () {
      var typeMismatch =
        (this.isListBox() && this.instance instanceof ComboBox) ||
        (!this.isListBox() && this.instance instanceof ListBox);

      if (typeMismatch) {
        this.createInstance();
      } else {
        this.instance.refresh();
      }
    },
    destroy: function () {
      this.instance.destroy();
    },
  });

  // combobox module
  function ComboBox(options) {
    this.options = $.extend(
      {
        wrapNative: true,
        wrapNativeOnMobile: true,
        fakeDropInBody: true,
        useCustomScroll: true,
        flipDropToFit: true,
        maxVisibleItems: 10,
        fakeAreaStructure:
          '<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',
        fakeDropStructure:
          '<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',
        optionClassPrefix: "jcf-option-",
        selectClassPrefix: "jcf-select-",
        dropContentSelector: ".jcf-select-drop-content",
        selectTextSelector: ".jcf-select-text",
        dropActiveClass: "jcf-drop-active",
        flipDropClass: "jcf-drop-flipped",
      },
      options
    );
    this.init();
  }
  $.extend(ComboBox.prototype, {
    init: function () {
      this.initStructure();
      this.bindHandlers();
      this.attachEvents();
      this.refresh();
    },
    initStructure: function () {
      // prepare structure
      this.win = $(window);
      this.doc = $(document);
      this.realElement = $(this.options.element);
      this.fakeElement = $(this.options.fakeAreaStructure).insertAfter(
        this.realElement
      );
      this.selectTextContainer = this.fakeElement.find(
        this.options.selectTextSelector
      );
      this.selectText = $("<span></span>").appendTo(this.selectTextContainer);
      makeUnselectable(this.fakeElement);

      // copy classes from original select
      this.fakeElement.addClass(
        getPrefixedClasses(
          this.realElement.prop("className"),
          this.options.selectClassPrefix
        )
      );

      // handle compact multiple style
      if (this.realElement.prop("multiple")) {
        this.fakeElement.addClass("jcf-compact-multiple");
      }

      // detect device type and dropdown behavior
      if (
        this.options.isMobileDevice &&
        this.options.wrapNativeOnMobile &&
        !this.options.wrapNative
      ) {
        this.options.wrapNative = true;
      }

      if (this.options.wrapNative) {
        // wrap native select inside fake block
        this.realElement
          .prependTo(this.fakeElement)
          .css({
            position: "absolute",
            height: "100%",
            width: "100%",
          })
          .addClass(this.options.resetAppearanceClass);
      } else {
        // just hide native select
        this.realElement.addClass(this.options.hiddenClass);
        this.fakeElement.attr("title", this.realElement.attr("title"));
        this.fakeDropTarget = this.options.fakeDropInBody
          ? $("body")
          : this.fakeElement;
      }
    },
    attachEvents: function () {
      // delayed refresh handler
      var self = this;
      this.delayedRefresh = function () {
        setTimeout(function () {
          self.refresh();
          if (self.list) {
            self.list.refresh();
            self.list.scrollToActiveOption();
          }
        }, 1);
      };

      // native dropdown event handlers
      if (this.options.wrapNative) {
        this.realElement.on({
          focus: this.onFocus,
          change: this.onChange,
          click: this.onChange,
          keydown: this.onChange,
        });
      } else {
        // custom dropdown event handlers
        this.realElement.on({
          focus: this.onFocus,
          change: this.onChange,
          keydown: this.onKeyDown,
        });
        this.fakeElement.on({
          "jcf-pointerdown": this.onSelectAreaPress,
        });
      }
    },
    onKeyDown: function (e) {
      if (e.which === 13) {
        this.toggleDropdown();
      } else if (this.dropActive) {
        this.delayedRefresh();
      }
    },
    onChange: function () {
      this.refresh();
    },
    onFocus: function () {
      if (!this.pressedFlag || !this.focusedFlag) {
        this.fakeElement.addClass(this.options.focusClass);
        this.realElement.on("blur", this.onBlur);
        this.toggleListMode(true);
        this.focusedFlag = true;
      }
    },
    onBlur: function () {
      if (!this.pressedFlag) {
        this.fakeElement.removeClass(this.options.focusClass);
        this.realElement.off("blur", this.onBlur);
        this.toggleListMode(false);
        this.focusedFlag = false;
      }
    },
    onResize: function () {
      if (this.dropActive) {
        this.hideDropdown();
      }
    },
    onSelectDropPress: function () {
      this.pressedFlag = true;
    },
    onSelectDropRelease: function (e, pointerEvent) {
      this.pressedFlag = false;
      if (pointerEvent.pointerType === "mouse") {
        this.realElement.focus();
      }
    },
    onSelectAreaPress: function (e) {
      // skip click if drop inside fake element or real select is disabled
      var dropClickedInsideFakeElement =
        !this.options.fakeDropInBody &&
        $(e.target).closest(this.dropdown).length;
      if (
        dropClickedInsideFakeElement ||
        e.button > 1 ||
        this.realElement.is(":disabled")
      ) {
        return;
      }

      // toggle dropdown visibility
      this.selectOpenedByEvent = e.pointerType;
      this.toggleDropdown();

      // misc handlers
      if (!this.focusedFlag) {
        if (e.pointerType === "mouse") {
          this.realElement.focus();
        } else {
          this.onFocus(e);
        }
      }
      this.pressedFlag = true;
      this.fakeElement.addClass(this.options.pressedClass);
      this.doc.on("jcf-pointerup", this.onSelectAreaRelease);
    },
    onSelectAreaRelease: function (e) {
      if (this.focusedFlag && e.pointerType === "mouse") {
        this.realElement.focus();
      }
      this.pressedFlag = false;
      this.fakeElement.removeClass(this.options.pressedClass);
      this.doc.off("jcf-pointerup", this.onSelectAreaRelease);
    },
    onOutsideClick: function (e) {
      var target = $(e.target),
        clickedInsideSelect =
          target.closest(this.fakeElement).length ||
          target.closest(this.dropdown).length;

      if (!clickedInsideSelect) {
        this.hideDropdown();
      }
    },
    onSelect: function () {
      this.refresh();

      if (this.realElement.prop("multiple")) {
        this.repositionDropdown();
      } else {
        this.hideDropdown();
      }

      this.fireNativeEvent(this.realElement, "change");
    },
    toggleListMode: function (state) {
      if (!this.options.wrapNative) {
        if (state) {
          // temporary change select to list to avoid appearing of native dropdown
          this.realElement.attr({
            size: 4,
            "jcf-size": "",
          });
        } else {
          // restore select from list mode to dropdown select
          if (!this.options.wrapNative) {
            this.realElement.removeAttr("size jcf-size");
          }
        }
      }
    },
    createDropdown: function () {
      // destroy previous dropdown if needed
      if (this.dropdown) {
        this.list.destroy();
        this.dropdown.remove();
      }

      // create new drop container
      this.dropdown = $(this.options.fakeDropStructure).appendTo(
        this.fakeDropTarget
      );
      this.dropdown.addClass(
        getPrefixedClasses(
          this.realElement.prop("className"),
          this.options.selectClassPrefix
        )
      );
      makeUnselectable(this.dropdown);

      // handle compact multiple style
      if (this.realElement.prop("multiple")) {
        this.dropdown.addClass("jcf-compact-multiple");
      }

      // set initial styles for dropdown in body
      if (this.options.fakeDropInBody) {
        this.dropdown.css({
          position: "absolute",
          top: -9999,
        });
      }

      // create new select list instance
      this.list = new SelectList({
        useHoverClass: true,
        handleResize: false,
        alwaysPreventMouseWheel: true,
        maxVisibleItems: this.options.maxVisibleItems,
        useCustomScroll: this.options.useCustomScroll,
        holder: this.dropdown.find(this.options.dropContentSelector),
        multipleSelectWithoutKey: this.realElement.prop("multiple"),
        element: this.realElement,
      });
      $(this.list).on({
        select: this.onSelect,
        press: this.onSelectDropPress,
        release: this.onSelectDropRelease,
      });
    },
    repositionDropdown: function () {
      var selectOffset = this.fakeElement.offset(),
        selectWidth = this.fakeElement.outerWidth(),
        selectHeight = this.fakeElement.outerHeight(),
        dropHeight = this.dropdown.css("width", selectWidth).outerHeight(),
        winScrollTop = this.win.scrollTop(),
        winHeight = this.win.height(),
        calcTop,
        calcLeft,
        bodyOffset,
        needFlipDrop = false;

      // check flip drop position
      if (
        selectOffset.top + selectHeight + dropHeight >
          winScrollTop + winHeight &&
        selectOffset.top - dropHeight > winScrollTop
      ) {
        needFlipDrop = true;
      }

      if (this.options.fakeDropInBody) {
        bodyOffset =
          this.fakeDropTarget.css("position") !== "static"
            ? this.fakeDropTarget.offset().top
            : 0;
        if (this.options.flipDropToFit && needFlipDrop) {
          // calculate flipped dropdown position
          calcLeft = selectOffset.left;
          calcTop = selectOffset.top - dropHeight - bodyOffset;
        } else {
          // calculate default drop position
          calcLeft = selectOffset.left;
          calcTop = selectOffset.top + selectHeight - bodyOffset;
        }

        // update drop styles
        this.dropdown.css({
          width: selectWidth,
          left: calcLeft,
          top: calcTop,
        });
      }

      // refresh flipped class
      this.dropdown
        .add(this.fakeElement)
        .toggleClass(
          this.options.flipDropClass,
          this.options.flipDropToFit && needFlipDrop
        );
    },
    showDropdown: function () {
      // do not show empty custom dropdown
      if (!this.realElement.prop("options").length) {
        return;
      }

      // create options list if not created
      if (!this.dropdown) {
        this.createDropdown();
      }

      // show dropdown
      this.dropActive = true;
      this.dropdown.appendTo(this.fakeDropTarget);
      this.fakeElement.addClass(this.options.dropActiveClass);
      this.refreshSelectedText();
      this.repositionDropdown();
      this.list.setScrollTop(this.savedScrollTop);
      this.list.refresh();

      // add temporary event handlers
      this.win.on("resize", this.onResize);
      this.doc.on("jcf-pointerdown", this.onOutsideClick);
    },
    hideDropdown: function () {
      if (this.dropdown) {
        this.savedScrollTop = this.list.getScrollTop();
        this.fakeElement.removeClass(
          this.options.dropActiveClass + " " + this.options.flipDropClass
        );
        this.dropdown.removeClass(this.options.flipDropClass).detach();
        this.doc.off("jcf-pointerdown", this.onOutsideClick);
        this.win.off("resize", this.onResize);
        this.dropActive = false;
        if (this.selectOpenedByEvent === "touch") {
          this.onBlur();
        }
      }
    },
    toggleDropdown: function () {
      if (this.dropActive) {
        this.hideDropdown();
      } else {
        this.showDropdown();
      }
    },
    refreshSelectedText: function () {
      // redraw selected area
      var selectedIndex = this.realElement.prop("selectedIndex"),
        selectedOption = this.realElement.prop("options")[selectedIndex],
        selectedOptionImage = selectedOption
          ? selectedOption.getAttribute("data-image")
          : null,
        selectedOptionText = "",
        selectedOptionClasses,
        self = this;

      if (this.realElement.prop("multiple")) {
        $.each(this.realElement.prop("options"), function (index, option) {
          if (option.selected) {
            selectedOptionText +=
              (selectedOptionText ? ", " : "") + option.innerHTML;
          }
        });
        if (!selectedOptionText) {
          selectedOptionText = self.realElement.attr("placeholder") || "";
        }
        this.selectText.removeAttr("class").html(selectedOptionText);
      } else if (!selectedOption) {
        if (this.selectImage) {
          this.selectImage.hide();
        }
        this.selectText.removeAttr("class").empty();
      } else if (
        this.currentSelectedText !== selectedOption.innerHTML ||
        this.currentSelectedImage !== selectedOptionImage
      ) {
        selectedOptionClasses = getPrefixedClasses(
          selectedOption.className,
          this.options.optionClassPrefix
        );
        this.selectText
          .attr("class", selectedOptionClasses)
          .html(selectedOption.innerHTML);

        if (selectedOptionImage) {
          if (!this.selectImage) {
            this.selectImage = $("<img>")
              .prependTo(this.selectTextContainer)
              .hide();
          }
          this.selectImage.attr("src", selectedOptionImage).show();
        } else if (this.selectImage) {
          this.selectImage.hide();
        }

        this.currentSelectedText = selectedOption.innerHTML;
        this.currentSelectedImage = selectedOptionImage;
      }
    },
    refresh: function () {
      // refresh fake select visibility
      if (this.realElement.prop("style").display === "none") {
        this.fakeElement.hide();
      } else {
        this.fakeElement.show();
      }

      // refresh selected text
      this.refreshSelectedText();

      // handle disabled state
      this.fakeElement.toggleClass(
        this.options.disabledClass,
        this.realElement.is(":disabled")
      );
    },
    destroy: function () {
      // restore structure
      if (this.options.wrapNative) {
        this.realElement
          .insertBefore(this.fakeElement)
          .css({
            position: "",
            height: "",
            width: "",
          })
          .removeClass(this.options.resetAppearanceClass);
      } else {
        this.realElement.removeClass(this.options.hiddenClass);
        if (this.realElement.is("[jcf-size]")) {
          this.realElement.removeAttr("size jcf-size");
        }
      }

      // removing element will also remove its event handlers
      this.fakeElement.remove();

      // remove other event handlers
      this.doc.off("jcf-pointerup", this.onSelectAreaRelease);
      this.realElement.off({
        focus: this.onFocus,
      });
    },
  });

  // listbox module
  function ListBox(options) {
    this.options = $.extend(
      {
        wrapNative: true,
        useCustomScroll: true,
        fakeStructure:
          '<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',
        selectClassPrefix: "jcf-select-",
        listHolder: ".jcf-list-wrapper",
      },
      options
    );
    this.init();
  }
  $.extend(ListBox.prototype, {
    init: function () {
      this.bindHandlers();
      this.initStructure();
      this.attachEvents();
    },
    initStructure: function () {
      this.realElement = $(this.options.element);
      this.fakeElement = $(this.options.fakeStructure).insertAfter(
        this.realElement
      );
      this.listHolder = this.fakeElement.find(this.options.listHolder);
      makeUnselectable(this.fakeElement);

      // copy classes from original select
      this.fakeElement.addClass(
        getPrefixedClasses(
          this.realElement.prop("className"),
          this.options.selectClassPrefix
        )
      );
      this.realElement.addClass(this.options.hiddenClass);

      this.list = new SelectList({
        useCustomScroll: this.options.useCustomScroll,
        holder: this.listHolder,
        selectOnClick: false,
        element: this.realElement,
      });
    },
    attachEvents: function () {
      // delayed refresh handler
      var self = this;
      this.delayedRefresh = function (e) {
        if (e && e.which === 16) {
          // ignore SHIFT key
          return;
        } else {
          clearTimeout(self.refreshTimer);
          self.refreshTimer = setTimeout(function () {
            self.refresh();
            self.list.scrollToActiveOption();
          }, 1);
        }
      };

      // other event handlers
      this.realElement.on({
        focus: this.onFocus,
        click: this.delayedRefresh,
        keydown: this.delayedRefresh,
      });

      // select list event handlers
      $(this.list).on({
        select: this.onSelect,
        press: this.onFakeOptionsPress,
        release: this.onFakeOptionsRelease,
      });
    },
    onFakeOptionsPress: function (e, pointerEvent) {
      this.pressedFlag = true;
      if (pointerEvent.pointerType === "mouse") {
        this.realElement.focus();
      }
    },
    onFakeOptionsRelease: function (e, pointerEvent) {
      this.pressedFlag = false;
      if (pointerEvent.pointerType === "mouse") {
        this.realElement.focus();
      }
    },
    onSelect: function () {
      this.fireNativeEvent(this.realElement, "change");
      this.fireNativeEvent(this.realElement, "click");
    },
    onFocus: function () {
      if (!this.pressedFlag || !this.focusedFlag) {
        this.fakeElement.addClass(this.options.focusClass);
        this.realElement.on("blur", this.onBlur);
        this.focusedFlag = true;
      }
    },
    onBlur: function () {
      if (!this.pressedFlag) {
        this.fakeElement.removeClass(this.options.focusClass);
        this.realElement.off("blur", this.onBlur);
        this.focusedFlag = false;
      }
    },
    refresh: function () {
      this.fakeElement.toggleClass(
        this.options.disabledClass,
        this.realElement.is(":disabled")
      );
      this.list.refresh();
    },
    destroy: function () {
      this.list.destroy();
      this.realElement
        .insertBefore(this.fakeElement)
        .removeClass(this.options.hiddenClass);
      this.fakeElement.remove();
    },
  });

  // options list module
  function SelectList(options) {
    this.options = $.extend(
      {
        holder: null,
        maxVisibleItems: 10,
        selectOnClick: true,
        useHoverClass: false,
        useCustomScroll: false,
        handleResize: true,
        multipleSelectWithoutKey: false,
        alwaysPreventMouseWheel: false,
        indexAttribute: "data-index",
        cloneClassPrefix: "jcf-option-",
        containerStructure:
          '<span class="jcf-list"><span class="jcf-list-content"></span></span>',
        containerSelector: ".jcf-list-content",
        captionClass: "jcf-optgroup-caption",
        disabledClass: "jcf-disabled",
        optionClass: "jcf-option",
        groupClass: "jcf-optgroup",
        hoverClass: "jcf-hover",
        selectedClass: "jcf-selected",
        scrollClass: "jcf-scroll-active",
      },
      options
    );
    this.init();
  }
  $.extend(SelectList.prototype, {
    init: function () {
      this.initStructure();
      this.refreshSelectedClass();
      this.attachEvents();
    },
    initStructure: function () {
      this.element = $(this.options.element);
      this.indexSelector = "[" + this.options.indexAttribute + "]";
      this.container = $(this.options.containerStructure).appendTo(
        this.options.holder
      );
      this.listHolder = this.container.find(this.options.containerSelector);
      this.lastClickedIndex = this.element.prop("selectedIndex");
      this.rebuildList();
    },
    attachEvents: function () {
      this.bindHandlers();
      this.listHolder.on(
        "jcf-pointerdown",
        this.indexSelector,
        this.onItemPress
      );
      this.listHolder.on("jcf-pointerdown", this.onPress);

      if (this.options.useHoverClass) {
        this.listHolder.on(
          "jcf-pointerover",
          this.indexSelector,
          this.onHoverItem
        );
      }
    },
    onPress: function (e) {
      $(this).trigger("press", e);
      this.listHolder.on("jcf-pointerup", this.onRelease);
    },
    onRelease: function (e) {
      $(this).trigger("release", e);
      this.listHolder.off("jcf-pointerup", this.onRelease);
    },
    onHoverItem: function (e) {
      var hoverIndex = parseFloat(
        e.currentTarget.getAttribute(this.options.indexAttribute)
      );
      this.fakeOptions
        .removeClass(this.options.hoverClass)
        .eq(hoverIndex)
        .addClass(this.options.hoverClass);
    },
    onItemPress: function (e) {
      if (e.pointerType === "touch" || this.options.selectOnClick) {
        // select option after "click"
        this.tmpListOffsetTop = this.list.offset().top;
        this.listHolder.on(
          "jcf-pointerup",
          this.indexSelector,
          this.onItemRelease
        );
      } else {
        // select option immediately
        this.onSelectItem(e);
      }
    },
    onItemRelease: function (e) {
      // remove event handlers and temporary data
      this.listHolder.off(
        "jcf-pointerup",
        this.indexSelector,
        this.onItemRelease
      );

      // simulate item selection
      if (this.tmpListOffsetTop === this.list.offset().top) {
        this.listHolder.on(
          "click",
          this.indexSelector,
          { savedPointerType: e.pointerType },
          this.onSelectItem
        );
      }
      delete this.tmpListOffsetTop;
    },
    onSelectItem: function (e) {
      var clickedIndex = parseFloat(
          e.currentTarget.getAttribute(this.options.indexAttribute)
        ),
        pointerType =
          (e.data && e.data.savedPointerType) || e.pointerType || "mouse",
        range;

      // remove click event handler
      this.listHolder.off("click", this.indexSelector, this.onSelectItem);

      // ignore clicks on disabled options
      if (e.button > 1 || this.realOptions[clickedIndex].disabled) {
        return;
      }

      if (this.element.prop("multiple")) {
        if (
          e.metaKey ||
          e.ctrlKey ||
          pointerType === "touch" ||
          this.options.multipleSelectWithoutKey
        ) {
          // if CTRL/CMD pressed or touch devices - toggle selected option
          this.realOptions[clickedIndex].selected = !this.realOptions[
            clickedIndex
          ].selected;
        } else if (e.shiftKey) {
          // if SHIFT pressed - update selection
          range = [this.lastClickedIndex, clickedIndex].sort(function (a, b) {
            return a - b;
          });
          this.realOptions.each(function (index, option) {
            option.selected = index >= range[0] && index <= range[1];
          });
        } else {
          // set single selected index
          this.element.prop("selectedIndex", clickedIndex);
        }
      } else {
        this.element.prop("selectedIndex", clickedIndex);
      }

      // save last clicked option
      if (!e.shiftKey) {
        this.lastClickedIndex = clickedIndex;
      }

      // refresh classes
      this.refreshSelectedClass();

      // scroll to active item in desktop browsers
      if (pointerType === "mouse") {
        this.scrollToActiveOption();
      }

      // make callback when item selected
      $(this).trigger("select");
    },
    rebuildList: function () {
      // rebuild options
      var self = this,
        rootElement = this.element[0];

      // recursively create fake options
      this.storedSelectHTML = rootElement.innerHTML;
      this.optionIndex = 0;
      this.list = $(this.createOptionsList(rootElement));
      this.listHolder.empty().append(this.list);
      this.realOptions = this.element.find("option");
      this.fakeOptions = this.list.find(this.indexSelector);
      this.fakeListItems = this.list.find(
        "." + this.options.captionClass + "," + this.indexSelector
      );
      delete this.optionIndex;

      // detect max visible items
      var maxCount = this.options.maxVisibleItems,
        sizeValue = this.element.prop("size");
      if (sizeValue > 1 && !this.element.is("[jcf-size]")) {
        maxCount = sizeValue;
      }

      // handle scrollbar
      var needScrollBar = this.fakeOptions.length > maxCount;
      this.container.toggleClass(this.options.scrollClass, needScrollBar);
      if (needScrollBar) {
        // change max-height
        this.listHolder.css({
          maxHeight: this.getOverflowHeight(maxCount),
          overflow: "auto",
        });

        if (this.options.useCustomScroll && jcf.modules.Scrollable) {
          // add custom scrollbar if specified in options
          jcf.replace(this.listHolder, "Scrollable", {
            handleResize: this.options.handleResize,
            alwaysPreventMouseWheel: this.options.alwaysPreventMouseWheel,
          });
          return;
        }
      }

      // disable edge wheel scrolling
      if (this.options.alwaysPreventMouseWheel) {
        this.preventWheelHandler = function (e) {
          var currentScrollTop = self.listHolder.scrollTop(),
            maxScrollTop =
              self.listHolder.prop("scrollHeight") -
              self.listHolder.innerHeight();

          // check edge cases
          if (
            (currentScrollTop <= 0 && e.deltaY < 0) ||
            (currentScrollTop >= maxScrollTop && e.deltaY > 0)
          ) {
            e.preventDefault();
          }
        };
        this.listHolder.on("jcf-mousewheel", this.preventWheelHandler);
      }
    },
    refreshSelectedClass: function () {
      var self = this,
        selectedItem,
        isMultiple = this.element.prop("multiple"),
        selectedIndex = this.element.prop("selectedIndex");

      if (isMultiple) {
        this.realOptions.each(function (index, option) {
          self.fakeOptions
            .eq(index)
            .toggleClass(self.options.selectedClass, !!option.selected);
        });
      } else {
        this.fakeOptions.removeClass(
          this.options.selectedClass + " " + this.options.hoverClass
        );
        selectedItem = this.fakeOptions
          .eq(selectedIndex)
          .addClass(this.options.selectedClass);
        if (this.options.useHoverClass) {
          selectedItem.addClass(this.options.hoverClass);
        }
      }
    },
    scrollToActiveOption: function () {
      // scroll to target option
      var targetOffset = this.getActiveOptionOffset();
      if (typeof targetOffset === "number") {
        this.listHolder.prop("scrollTop", targetOffset);
      }
    },
    getSelectedIndexRange: function () {
      var firstSelected = -1,
        lastSelected = -1;
      this.realOptions.each(function (index, option) {
        if (option.selected) {
          if (firstSelected < 0) {
            firstSelected = index;
          }
          lastSelected = index;
        }
      });
      return [firstSelected, lastSelected];
    },
    getChangedSelectedIndex: function () {
      var selectedIndex = this.element.prop("selectedIndex"),
        targetIndex;

      if (this.element.prop("multiple")) {
        // multiple selects handling
        if (!this.previousRange) {
          this.previousRange = [selectedIndex, selectedIndex];
        }
        this.currentRange = this.getSelectedIndexRange();
        targetIndex = this.currentRange[
          this.currentRange[0] !== this.previousRange[0] ? 0 : 1
        ];
        this.previousRange = this.currentRange;
        return targetIndex;
      } else {
        // single choice selects handling
        return selectedIndex;
      }
    },
    getActiveOptionOffset: function () {
      // calc values
      var dropHeight = this.listHolder.height(),
        dropScrollTop = this.listHolder.prop("scrollTop"),
        currentIndex = this.getChangedSelectedIndex(),
        fakeOption = this.fakeOptions.eq(currentIndex),
        fakeOptionOffset = fakeOption.offset().top - this.list.offset().top,
        fakeOptionHeight = fakeOption.innerHeight();

      // scroll list
      if (fakeOptionOffset + fakeOptionHeight >= dropScrollTop + dropHeight) {
        // scroll down (always scroll to option)
        return fakeOptionOffset - dropHeight + fakeOptionHeight;
      } else if (fakeOptionOffset < dropScrollTop) {
        // scroll up to option
        return fakeOptionOffset;
      }
    },
    getOverflowHeight: function (sizeValue) {
      var item = this.fakeListItems.eq(sizeValue - 1),
        listOffset = this.list.offset().top,
        itemOffset = item.offset().top,
        itemHeight = item.innerHeight();

      return itemOffset + itemHeight - listOffset;
    },
    getScrollTop: function () {
      return this.listHolder.scrollTop();
    },
    setScrollTop: function (value) {
      this.listHolder.scrollTop(value);
    },
    createOption: function (option) {
      var newOption = document.createElement("span");
      newOption.className = this.options.optionClass;
      newOption.innerHTML = option.innerHTML;
      newOption.setAttribute(this.options.indexAttribute, this.optionIndex++);

      var optionImage,
        optionImageSrc = option.getAttribute("data-image");
      if (optionImageSrc) {
        optionImage = document.createElement("img");
        optionImage.src = optionImageSrc;
        newOption.insertBefore(optionImage, newOption.childNodes[0]);
      }
      if (option.disabled) {
        newOption.className += " " + this.options.disabledClass;
      }
      if (option.className) {
        newOption.className +=
          " " +
          getPrefixedClasses(option.className, this.options.cloneClassPrefix);
      }
      return newOption;
    },
    createOptGroup: function (optgroup) {
      var optGroupContainer = document.createElement("span"),
        optGroupName = optgroup.getAttribute("label"),
        optGroupCaption,
        optGroupList;

      // create caption
      optGroupCaption = document.createElement("span");
      optGroupCaption.className = this.options.captionClass;
      optGroupCaption.innerHTML = optGroupName;
      optGroupContainer.appendChild(optGroupCaption);

      // create list of options
      if (optgroup.children.length) {
        optGroupList = this.createOptionsList(optgroup);
        optGroupContainer.appendChild(optGroupList);
      }

      optGroupContainer.className = this.options.groupClass;
      return optGroupContainer;
    },
    createOptionContainer: function () {
      var optionContainer = document.createElement("li");
      return optionContainer;
    },
    createOptionsList: function (container) {
      var self = this,
        list = document.createElement("ul");

      $.each(container.children, function (index, currentNode) {
        var item = self.createOptionContainer(currentNode),
          newNode;

        switch (currentNode.tagName.toLowerCase()) {
          case "option":
            newNode = self.createOption(currentNode);
            break;
          case "optgroup":
            newNode = self.createOptGroup(currentNode);
            break;
        }
        list.appendChild(item).appendChild(newNode);
      });
      return list;
    },
    refresh: function () {
      // check for select innerHTML changes
      if (this.storedSelectHTML !== this.element.prop("innerHTML")) {
        this.rebuildList();
      }

      // refresh custom scrollbar
      var scrollInstance = jcf.getInstance(this.listHolder);
      if (scrollInstance) {
        scrollInstance.refresh();
      }

      // refresh selectes classes
      this.refreshSelectedClass();
    },
    destroy: function () {
      this.listHolder.off("jcf-mousewheel", this.preventWheelHandler);
      this.listHolder.off(
        "jcf-pointerdown",
        this.indexSelector,
        this.onSelectItem
      );
      this.listHolder.off(
        "jcf-pointerover",
        this.indexSelector,
        this.onHoverItem
      );
      this.listHolder.off("jcf-pointerdown", this.onPress);
    },
  });

  // helper functions
  var getPrefixedClasses = function (className, prefixToAdd) {
    return className
      ? className.replace(/[\s]*([\S]+)+[\s]*/gi, prefixToAdd + "$1 ")
      : "";
  };
  var makeUnselectable = (function () {
    var unselectableClass = jcf.getOptions().unselectableClass;
    function preventHandler(e) {
      e.preventDefault();
    }
    return function (node) {
      node.addClass(unselectableClass).on("selectstart", preventHandler);
    };
  })();
})(jQuery, this);

// navigation accesibility module
function TouchNav(opt) {
  this.options = {
    hoverClass: "hover",
    menuItems: "li",
    menuOpener: "a",
    menuDrop: "ul",
    navBlock: null,
  };
  for (var p in opt) {
    if (opt.hasOwnProperty(p)) {
      this.options[p] = opt[p];
    }
  }
  this.init();
}
TouchNav.isActiveOn = function (elem) {
  return elem && elem.touchNavActive;
};
TouchNav.prototype = {
  init: function () {
    if (typeof this.options.navBlock === "string") {
      this.menu = document.getElementById(this.options.navBlock);
    } else if (typeof this.options.navBlock === "object") {
      this.menu = this.options.navBlock;
    }
    if (this.menu) {
      this.addEvents();
    }
  },
  addEvents: function () {
    // attach event handlers
    var self = this;
    var touchEvent =
      (navigator.pointerEnabled && "pointerdown") ||
      (navigator.msPointerEnabled && "MSPointerDown") ||
      (this.isTouchDevice && "touchstart");
    this.menuItems = lib.queryElementsBySelector(
      this.options.menuItems,
      this.menu
    );

    var initMenuItem = function (item) {
      var currentDrop = lib.queryElementsBySelector(
          self.options.menuDrop,
          item
        )[0],
        currentOpener = lib.queryElementsBySelector(
          self.options.menuOpener,
          item
        )[0];

      // only for touch input devices
      if (
        currentDrop &&
        currentOpener &&
        (self.isTouchDevice || self.isPointerDevice)
      ) {
        lib.event.add(
          currentOpener,
          "click",
          lib.bind(self.clickHandler, self)
        );
        lib.event.add(
          currentOpener,
          "mousedown",
          lib.bind(self.mousedownHandler, self)
        );
        lib.event.add(currentOpener, touchEvent, function (e) {
          if (!self.isTouchPointerEvent(e)) {
            self.preventCurrentClick = false;
            return;
          }
          self.touchFlag = true;
          self.currentItem = item;
          self.currentLink = currentOpener;
          self.pressHandler.apply(self, arguments);
        });
      }
      // for desktop computers and touch devices
      jQuery(item).bind("mouseenter", function () {
        if (!self.touchFlag) {
          self.currentItem = item;
          self.mouseoverHandler();
        }
      });
      jQuery(item).bind("mouseleave", function () {
        if (!self.touchFlag) {
          self.currentItem = item;
          self.mouseoutHandler();
        }
      });
      item.touchNavActive = true;
    };

    // addd handlers for all menu items
    for (var i = 0; i < this.menuItems.length; i++) {
      initMenuItem(self.menuItems[i]);
    }

    // hide dropdowns when clicking outside navigation
    if (this.isTouchDevice || this.isPointerDevice) {
      lib.event.add(
        document.documentElement,
        "mousedown",
        lib.bind(this.clickOutsideHandler, this)
      );
      lib.event.add(
        document.documentElement,
        touchEvent,
        lib.bind(this.clickOutsideHandler, this)
      );
    }
  },
  mousedownHandler: function (e) {
    if (this.touchFlag) {
      e.preventDefault();
      this.touchFlag = false;
      this.preventCurrentClick = false;
    }
  },
  mouseoverHandler: function () {
    lib.addClass(this.currentItem, this.options.hoverClass);
    jQuery(this.currentItem).trigger("itemhover");
  },
  mouseoutHandler: function () {
    lib.removeClass(this.currentItem, this.options.hoverClass);
    jQuery(this.currentItem).trigger("itemleave");
  },
  hideActiveDropdown: function () {
    for (var i = 0; i < this.menuItems.length; i++) {
      if (lib.hasClass(this.menuItems[i], this.options.hoverClass)) {
        lib.removeClass(this.menuItems[i], this.options.hoverClass);
        jQuery(this.menuItems[i]).trigger("itemleave");
      }
    }
    this.activeParent = null;
  },
  pressHandler: function (e) {
    // hide previous drop (if active)
    if (this.currentItem !== this.activeParent) {
      if (
        this.activeParent &&
        this.currentItem.parentNode === this.activeParent.parentNode
      ) {
        lib.removeClass(this.activeParent, this.options.hoverClass);
      } else if (!this.isParent(this.activeParent, this.currentLink)) {
        this.hideActiveDropdown();
      }
    }
    // handle current drop
    this.activeParent = this.currentItem;
    if (lib.hasClass(this.currentItem, this.options.hoverClass)) {
      this.preventCurrentClick = false;
    } else {
      e.preventDefault();
      this.preventCurrentClick = true;
      lib.addClass(this.currentItem, this.options.hoverClass);
      jQuery(this.currentItem).trigger("itemhover");
    }
  },
  clickHandler: function (e) {
    // prevent first click on link
    if (this.preventCurrentClick) {
      e.preventDefault();
    }
  },
  clickOutsideHandler: function (event) {
    var e = event.changedTouches ? event.changedTouches[0] : event;
    if (this.activeParent && !this.isParent(this.menu, e.target)) {
      this.hideActiveDropdown();
      this.touchFlag = false;
    }
  },
  isParent: function (parent, child) {
    while (child.parentNode) {
      if (child.parentNode == parent) {
        return true;
      }
      child = child.parentNode;
    }
    return false;
  },
  isTouchPointerEvent: function (e) {
    return (
      e.type.indexOf("touch") > -1 ||
      (navigator.pointerEnabled && e.pointerType === "touch") ||
      (navigator.msPointerEnabled && e.pointerType == e.MSPOINTER_TYPE_TOUCH)
    );
  },
  isPointerDevice: (function () {
    return !!(navigator.pointerEnabled || navigator.msPointerEnabled);
  })(),
  isTouchDevice: (function () {
    return !!(
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof DocumentTouch)
    );
  })(),
};

/*
 * Utility module
 */
lib = {
  hasClass: function (el, cls) {
    return el && el.className
      ? el.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))
      : false;
  },
  addClass: function (el, cls) {
    if (el && !this.hasClass(el, cls)) el.className += " " + cls;
  },
  removeClass: function (el, cls) {
    if (el && this.hasClass(el, cls)) {
      el.className = el.className.replace(
        new RegExp("(\\s|^)" + cls + "(\\s|$)"),
        " "
      );
    }
  },
  extend: function (obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var p in arguments[i]) {
        if (arguments[i].hasOwnProperty(p)) {
          obj[p] = arguments[i][p];
        }
      }
    }
    return obj;
  },
  each: function (obj, callback) {
    var property, len;
    if (typeof obj.length === "number") {
      for (property = 0, len = obj.length; property < len; property++) {
        if (callback.call(obj[property], property, obj[property]) === false) {
          break;
        }
      }
    } else {
      for (property in obj) {
        if (obj.hasOwnProperty(property)) {
          if (callback.call(obj[property], property, obj[property]) === false) {
            break;
          }
        }
      }
    }
  },
  event: (function () {
    var fixEvent = function (e) {
      e = e || window.event;
      if (e.isFixed) return e;
      else e.isFixed = true;
      if (!e.target) e.target = e.srcElement;
      e.preventDefault =
        e.preventDefault ||
        function () {
          this.returnValue = false;
        };
      e.stopPropagation =
        e.stopPropagation ||
        function () {
          this.cancelBubble = true;
        };
      return e;
    };
    return {
      add: function (elem, event, handler) {
        if (!elem.events) {
          elem.events = {};
          elem.handle = function (e) {
            var ret,
              handlers = elem.events[e.type];
            e = fixEvent(e);
            for (var i = 0, len = handlers.length; i < len; i++) {
              if (handlers[i]) {
                ret = handlers[i].call(elem, e);
                if (ret === false) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }
            }
          };
        }
        if (!elem.events[event]) {
          elem.events[event] = [];
          if (elem.addEventListener)
            elem.addEventListener(event, elem.handle, false);
          else if (elem.attachEvent)
            elem.attachEvent("on" + event, elem.handle);
        }
        elem.events[event].push(handler);
      },
      remove: function (elem, event, handler) {
        var handlers = elem.events[event];
        for (var i = handlers.length - 1; i >= 0; i--) {
          if (handlers[i] === handler) {
            handlers.splice(i, 1);
          }
        }
        if (!handlers.length) {
          delete elem.events[event];
          if (elem.removeEventListener)
            elem.removeEventListener(event, elem.handle, false);
          else if (elem.detachEvent)
            elem.detachEvent("on" + event, elem.handle);
        }
      },
    };
  })(),
  queryElementsBySelector: function (selector, scope) {
    scope = scope || document;
    if (!selector) return [];
    if (selector === ">*") return scope.children;
    if (typeof document.querySelectorAll === "function") {
      return scope.querySelectorAll(selector);
    }
    var selectors = selector.split(",");
    var resultList = [];
    for (var s = 0; s < selectors.length; s++) {
      var currentContext = [scope || document];
      var tokens = selectors[s]
        .replace(/^\s+/, "")
        .replace(/\s+$/, "")
        .split(" ");
      for (var i = 0; i < tokens.length; i++) {
        token = tokens[i].replace(/^\s+/, "").replace(/\s+$/, "");
        if (token.indexOf("#") > -1) {
          var bits = token.split("#"),
            tagName = bits[0],
            id = bits[1];
          var element = document.getElementById(id);
          if (element && tagName && element.nodeName.toLowerCase() != tagName) {
            return [];
          }
          currentContext = element ? [element] : [];
          continue;
        }
        if (token.indexOf(".") > -1) {
          var bits = token.split("."),
            tagName = bits[0] || "*",
            className = bits[1],
            found = [],
            foundCount = 0;
          for (var h = 0; h < currentContext.length; h++) {
            var elements;
            if (tagName == "*") {
              elements = currentContext[h].getElementsByTagName("*");
            } else {
              elements = currentContext[h].getElementsByTagName(tagName);
            }
            for (var j = 0; j < elements.length; j++) {
              found[foundCount++] = elements[j];
            }
          }
          currentContext = [];
          var currentContextIndex = 0;
          for (var k = 0; k < found.length; k++) {
            if (
              found[k].className &&
              found[k].className.match(
                new RegExp("(\\s|^)" + className + "(\\s|$)")
              )
            ) {
              currentContext[currentContextIndex++] = found[k];
            }
          }
          continue;
        }
        if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
          var tagName = RegExp.$1 || "*",
            attrName = RegExp.$2,
            attrOperator = RegExp.$3,
            attrValue = RegExp.$4;
          if (
            attrName.toLowerCase() == "for" &&
            this.browser.msie &&
            this.browser.version < 8
          ) {
            attrName = "htmlFor";
          }
          var found = [],
            foundCount = 0;
          for (var h = 0; h < currentContext.length; h++) {
            var elements;
            if (tagName == "*") {
              elements = currentContext[h].getElementsByTagName("*");
            } else {
              elements = currentContext[h].getElementsByTagName(tagName);
            }
            for (var j = 0; elements[j]; j++) {
              found[foundCount++] = elements[j];
            }
          }
          currentContext = [];
          var currentContextIndex = 0,
            checkFunction;
          switch (attrOperator) {
            case "=":
              checkFunction = function (e) {
                return e.getAttribute(attrName) == attrValue;
              };
              break;
            case "~":
              checkFunction = function (e) {
                return e
                  .getAttribute(attrName)
                  .match(new RegExp("(\\s|^)" + attrValue + "(\\s|$)"));
              };
              break;
            case "|":
              checkFunction = function (e) {
                return e
                  .getAttribute(attrName)
                  .match(new RegExp("^" + attrValue + "-?"));
              };
              break;
            case "^":
              checkFunction = function (e) {
                return e.getAttribute(attrName).indexOf(attrValue) == 0;
              };
              break;
            case "$":
              checkFunction = function (e) {
                return (
                  e.getAttribute(attrName).lastIndexOf(attrValue) ==
                  e.getAttribute(attrName).length - attrValue.length
                );
              };
              break;
            case "*":
              checkFunction = function (e) {
                return e.getAttribute(attrName).indexOf(attrValue) > -1;
              };
              break;
            default:
              checkFunction = function (e) {
                return e.getAttribute(attrName);
              };
          }
          currentContext = [];
          var currentContextIndex = 0;
          for (var k = 0; k < found.length; k++) {
            if (checkFunction(found[k])) {
              currentContext[currentContextIndex++] = found[k];
            }
          }
          continue;
        }
        tagName = token;
        var found = [],
          foundCount = 0;
        for (var h = 0; h < currentContext.length; h++) {
          var elements = currentContext[h].getElementsByTagName(tagName);
          for (var j = 0; j < elements.length; j++) {
            found[foundCount++] = elements[j];
          }
        }
        currentContext = found;
      }
      resultList = [].concat(resultList, currentContext);
    }
    return resultList;
  },
  trim: function (str) {
    return str.replace(/^\s+/, "").replace(/\s+$/, "");
  },
  bind: function (f, scope, forceArgs) {
    return function () {
      return f.apply(
        scope,
        typeof forceArgs !== "undefined" ? [forceArgs] : arguments
      );
    };
  },
};

/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
if (Object.create) {
  !(function (a, b, c, d) {
    "use strict";
    function e(a, b, c) {
      return setTimeout(k(a, c), b);
    }
    function f(a, b, c) {
      return Array.isArray(a) ? (g(a, c[b], c), !0) : !1;
    }
    function g(a, b, c) {
      var e;
      if (a)
        if (a.forEach) a.forEach(b, c);
        else if (a.length !== d)
          for (e = 0; e < a.length; ) b.call(c, a[e], e, a), e++;
        else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a);
    }
    function h(a, b, c) {
      for (var e = Object.keys(b), f = 0; f < e.length; )
        (!c || (c && a[e[f]] === d)) && (a[e[f]] = b[e[f]]), f++;
      return a;
    }
    function i(a, b) {
      return h(a, b, !0);
    }
    function j(a, b, c) {
      var d,
        e = b.prototype;
      (d = a.prototype = Object.create(e)),
        (d.constructor = a),
        (d._super = e),
        c && h(d, c);
    }
    function k(a, b) {
      return function () {
        return a.apply(b, arguments);
      };
    }
    function l(a, b) {
      return typeof a == kb ? a.apply(b ? b[0] || d : d, b) : a;
    }
    function m(a, b) {
      return a === d ? b : a;
    }
    function n(a, b, c) {
      g(r(b), function (b) {
        a.addEventListener(b, c, !1);
      });
    }
    function o(a, b, c) {
      g(r(b), function (b) {
        a.removeEventListener(b, c, !1);
      });
    }
    function p(a, b) {
      for (; a; ) {
        if (a == b) return !0;
        a = a.parentNode;
      }
      return !1;
    }
    function q(a, b) {
      return a.indexOf(b) > -1;
    }
    function r(a) {
      return a.trim().split(/\s+/g);
    }
    function s(a, b, c) {
      if (a.indexOf && !c) return a.indexOf(b);
      for (var d = 0; d < a.length; ) {
        if ((c && a[d][c] == b) || (!c && a[d] === b)) return d;
        d++;
      }
      return -1;
    }
    function t(a) {
      return Array.prototype.slice.call(a, 0);
    }
    function u(a, b, c) {
      for (var d = [], e = [], f = 0; f < a.length; ) {
        var g = b ? a[f][b] : a[f];
        s(e, g) < 0 && d.push(a[f]), (e[f] = g), f++;
      }
      return (
        c &&
          (d = b
            ? d.sort(function (a, c) {
                return a[b] > c[b];
              })
            : d.sort()),
        d
      );
    }
    function v(a, b) {
      for (
        var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0;
        g < ib.length;

      ) {
        if (((c = ib[g]), (e = c ? c + f : b), e in a)) return e;
        g++;
      }
      return d;
    }
    function w() {
      return ob++;
    }
    function x(a) {
      var b = a.ownerDocument;
      return b.defaultView || b.parentWindow;
    }
    function y(a, b) {
      var c = this;
      (this.manager = a),
        (this.callback = b),
        (this.element = a.element),
        (this.target = a.options.inputTarget),
        (this.domHandler = function (b) {
          l(a.options.enable, [a]) && c.handler(b);
        }),
        this.init();
    }
    function z(a) {
      var b,
        c = a.options.inputClass;
      return new (b = c ? c : rb ? N : sb ? Q : qb ? S : M)(a, A);
    }
    function A(a, b, c) {
      var d = c.pointers.length,
        e = c.changedPointers.length,
        f = b & yb && d - e === 0,
        g = b & (Ab | Bb) && d - e === 0;
      (c.isFirst = !!f),
        (c.isFinal = !!g),
        f && (a.session = {}),
        (c.eventType = b),
        B(a, c),
        a.emit("hammer.input", c),
        a.recognize(c),
        (a.session.prevInput = c);
    }
    function B(a, b) {
      var c = a.session,
        d = b.pointers,
        e = d.length;
      c.firstInput || (c.firstInput = E(b)),
        e > 1 && !c.firstMultiple
          ? (c.firstMultiple = E(b))
          : 1 === e && (c.firstMultiple = !1);
      var f = c.firstInput,
        g = c.firstMultiple,
        h = g ? g.center : f.center,
        i = (b.center = F(d));
      (b.timeStamp = nb()),
        (b.deltaTime = b.timeStamp - f.timeStamp),
        (b.angle = J(h, i)),
        (b.distance = I(h, i)),
        C(c, b),
        (b.offsetDirection = H(b.deltaX, b.deltaY)),
        (b.scale = g ? L(g.pointers, d) : 1),
        (b.rotation = g ? K(g.pointers, d) : 0),
        D(c, b);
      var j = a.element;
      p(b.srcEvent.target, j) && (j = b.srcEvent.target), (b.target = j);
    }
    function C(a, b) {
      var c = b.center,
        d = a.offsetDelta || {},
        e = a.prevDelta || {},
        f = a.prevInput || {};
      (b.eventType === yb || f.eventType === Ab) &&
        ((e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }),
        (d = a.offsetDelta = { x: c.x, y: c.y })),
        (b.deltaX = e.x + (c.x - d.x)),
        (b.deltaY = e.y + (c.y - d.y));
    }
    function D(a, b) {
      var c,
        e,
        f,
        g,
        h = a.lastInterval || b,
        i = b.timeStamp - h.timeStamp;
      if (b.eventType != Bb && (i > xb || h.velocity === d)) {
        var j = h.deltaX - b.deltaX,
          k = h.deltaY - b.deltaY,
          l = G(i, j, k);
        (e = l.x),
          (f = l.y),
          (c = mb(l.x) > mb(l.y) ? l.x : l.y),
          (g = H(j, k)),
          (a.lastInterval = b);
      } else
        (c = h.velocity),
          (e = h.velocityX),
          (f = h.velocityY),
          (g = h.direction);
      (b.velocity = c), (b.velocityX = e), (b.velocityY = f), (b.direction = g);
    }
    function E(a) {
      for (var b = [], c = 0; c < a.pointers.length; )
        (b[c] = {
          clientX: lb(a.pointers[c].clientX),
          clientY: lb(a.pointers[c].clientY),
        }),
          c++;
      return {
        timeStamp: nb(),
        pointers: b,
        center: F(b),
        deltaX: a.deltaX,
        deltaY: a.deltaY,
      };
    }
    function F(a) {
      var b = a.length;
      if (1 === b) return { x: lb(a[0].clientX), y: lb(a[0].clientY) };
      for (var c = 0, d = 0, e = 0; b > e; )
        (c += a[e].clientX), (d += a[e].clientY), e++;
      return { x: lb(c / b), y: lb(d / b) };
    }
    function G(a, b, c) {
      return { x: b / a || 0, y: c / a || 0 };
    }
    function H(a, b) {
      return a === b
        ? Cb
        : mb(a) >= mb(b)
        ? a > 0
          ? Db
          : Eb
        : b > 0
        ? Fb
        : Gb;
    }
    function I(a, b, c) {
      c || (c = Kb);
      var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];
      return Math.sqrt(d * d + e * e);
    }
    function J(a, b, c) {
      c || (c = Kb);
      var d = b[c[0]] - a[c[0]],
        e = b[c[1]] - a[c[1]];
      return (180 * Math.atan2(e, d)) / Math.PI;
    }
    function K(a, b) {
      return J(b[1], b[0], Lb) - J(a[1], a[0], Lb);
    }
    function L(a, b) {
      return I(b[0], b[1], Lb) / I(a[0], a[1], Lb);
    }
    function M() {
      (this.evEl = Nb),
        (this.evWin = Ob),
        (this.allow = !0),
        (this.pressed = !1),
        y.apply(this, arguments);
    }
    function N() {
      (this.evEl = Rb),
        (this.evWin = Sb),
        y.apply(this, arguments),
        (this.store = this.manager.session.pointerEvents = []);
    }
    function O() {
      (this.evTarget = Ub),
        (this.evWin = Vb),
        (this.started = !1),
        y.apply(this, arguments);
    }
    function P(a, b) {
      var c = t(a.touches),
        d = t(a.changedTouches);
      return b & (Ab | Bb) && (c = u(c.concat(d), "identifier", !0)), [c, d];
    }
    function Q() {
      (this.evTarget = Xb), (this.targetIds = {}), y.apply(this, arguments);
    }
    function R(a, b) {
      var c = t(a.touches),
        d = this.targetIds;
      if (b & (yb | zb) && 1 === c.length)
        return (d[c[0].identifier] = !0), [c, c];
      var e,
        f,
        g = t(a.changedTouches),
        h = [],
        i = this.target;
      if (
        ((f = c.filter(function (a) {
          return p(a.target, i);
        })),
        b === yb)
      )
        for (e = 0; e < f.length; ) (d[f[e].identifier] = !0), e++;
      for (e = 0; e < g.length; )
        d[g[e].identifier] && h.push(g[e]),
          b & (Ab | Bb) && delete d[g[e].identifier],
          e++;
      return h.length ? [u(f.concat(h), "identifier", !0), h] : void 0;
    }
    function S() {
      y.apply(this, arguments);
      var a = k(this.handler, this);
      (this.touch = new Q(this.manager, a)),
        (this.mouse = new M(this.manager, a));
    }
    function T(a, b) {
      (this.manager = a), this.set(b);
    }
    function U(a) {
      if (q(a, bc)) return bc;
      var b = q(a, cc),
        c = q(a, dc);
      return b && c
        ? cc + " " + dc
        : b || c
        ? b
          ? cc
          : dc
        : q(a, ac)
        ? ac
        : _b;
    }
    function V(a) {
      (this.id = w()),
        (this.manager = null),
        (this.options = i(a || {}, this.defaults)),
        (this.options.enable = m(this.options.enable, !0)),
        (this.state = ec),
        (this.simultaneous = {}),
        (this.requireFail = []);
    }
    function W(a) {
      return a & jc
        ? "cancel"
        : a & hc
        ? "end"
        : a & gc
        ? "move"
        : a & fc
        ? "start"
        : "";
    }
    function X(a) {
      return a == Gb
        ? "down"
        : a == Fb
        ? "up"
        : a == Db
        ? "left"
        : a == Eb
        ? "right"
        : "";
    }
    function Y(a, b) {
      var c = b.manager;
      return c ? c.get(a) : a;
    }
    function Z() {
      V.apply(this, arguments);
    }
    function $() {
      Z.apply(this, arguments), (this.pX = null), (this.pY = null);
    }
    function _() {
      Z.apply(this, arguments);
    }
    function ab() {
      V.apply(this, arguments), (this._timer = null), (this._input = null);
    }
    function bb() {
      Z.apply(this, arguments);
    }
    function cb() {
      Z.apply(this, arguments);
    }
    function db() {
      V.apply(this, arguments),
        (this.pTime = !1),
        (this.pCenter = !1),
        (this._timer = null),
        (this._input = null),
        (this.count = 0);
    }
    function eb(a, b) {
      return (
        (b = b || {}),
        (b.recognizers = m(b.recognizers, eb.defaults.preset)),
        new fb(a, b)
      );
    }
    function fb(a, b) {
      (b = b || {}),
        (this.options = i(b, eb.defaults)),
        (this.options.inputTarget = this.options.inputTarget || a),
        (this.handlers = {}),
        (this.session = {}),
        (this.recognizers = []),
        (this.element = a),
        (this.input = z(this)),
        (this.touchAction = new T(this, this.options.touchAction)),
        gb(this, !0),
        g(
          b.recognizers,
          function (a) {
            var b = this.add(new a[0](a[1]));
            a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]);
          },
          this
        );
    }
    function gb(a, b) {
      var c = a.element;
      g(a.options.cssProps, function (a, d) {
        c.style[v(c.style, d)] = b ? a : "";
      });
    }
    function hb(a, c) {
      var d = b.createEvent("Event");
      d.initEvent(a, !0, !0), (d.gesture = c), c.target.dispatchEvent(d);
    }
    var ib = ["", "webkit", "moz", "MS", "ms", "o"],
      jb = b.createElement("div"),
      kb = "function",
      lb = Math.round,
      mb = Math.abs,
      nb = Date.now,
      ob = 1,
      pb = /mobile|tablet|ip(ad|hone|od)|android/i,
      qb = "ontouchstart" in a,
      rb = v(a, "PointerEvent") !== d,
      sb = qb && pb.test(navigator.userAgent),
      tb = "touch",
      ub = "pen",
      vb = "mouse",
      wb = "kinect",
      xb = 25,
      yb = 1,
      zb = 2,
      Ab = 4,
      Bb = 8,
      Cb = 1,
      Db = 2,
      Eb = 4,
      Fb = 8,
      Gb = 16,
      Hb = Db | Eb,
      Ib = Fb | Gb,
      Jb = Hb | Ib,
      Kb = ["x", "y"],
      Lb = ["clientX", "clientY"];
    y.prototype = {
      handler: function () {},
      init: function () {
        this.evEl && n(this.element, this.evEl, this.domHandler),
          this.evTarget && n(this.target, this.evTarget, this.domHandler),
          this.evWin && n(x(this.element), this.evWin, this.domHandler);
      },
      destroy: function () {
        this.evEl && o(this.element, this.evEl, this.domHandler),
          this.evTarget && o(this.target, this.evTarget, this.domHandler),
          this.evWin && o(x(this.element), this.evWin, this.domHandler);
      },
    };
    var Mb = { mousedown: yb, mousemove: zb, mouseup: Ab },
      Nb = "mousedown",
      Ob = "mousemove mouseup";
    j(M, y, {
      handler: function (a) {
        var b = Mb[a.type];
        b & yb && 0 === a.button && (this.pressed = !0),
          b & zb && 1 !== a.which && (b = Ab),
          this.pressed &&
            this.allow &&
            (b & Ab && (this.pressed = !1),
            this.callback(this.manager, b, {
              pointers: [a],
              changedPointers: [a],
              pointerType: vb,
              srcEvent: a,
            }));
      },
    });
    var Pb = {
        pointerdown: yb,
        pointermove: zb,
        pointerup: Ab,
        pointercancel: Bb,
        pointerout: Bb,
      },
      Qb = { 2: tb, 3: ub, 4: vb, 5: wb },
      Rb = "pointerdown",
      Sb = "pointermove pointerup pointercancel";
    a.MSPointerEvent &&
      ((Rb = "MSPointerDown"),
      (Sb = "MSPointerMove MSPointerUp MSPointerCancel")),
      j(N, y, {
        handler: function (a) {
          var b = this.store,
            c = !1,
            d = a.type.toLowerCase().replace("ms", ""),
            e = Pb[d],
            f = Qb[a.pointerType] || a.pointerType,
            g = f == tb,
            h = s(b, a.pointerId, "pointerId");
          e & yb && (0 === a.button || g)
            ? 0 > h && (b.push(a), (h = b.length - 1))
            : e & (Ab | Bb) && (c = !0),
            0 > h ||
              ((b[h] = a),
              this.callback(this.manager, e, {
                pointers: b,
                changedPointers: [a],
                pointerType: f,
                srcEvent: a,
              }),
              c && b.splice(h, 1));
        },
      });
    var Tb = { touchstart: yb, touchmove: zb, touchend: Ab, touchcancel: Bb },
      Ub = "touchstart",
      Vb = "touchstart touchmove touchend touchcancel";
    j(O, y, {
      handler: function (a) {
        var b = Tb[a.type];
        if ((b === yb && (this.started = !0), this.started)) {
          var c = P.call(this, a, b);
          b & (Ab | Bb) &&
            c[0].length - c[1].length === 0 &&
            (this.started = !1),
            this.callback(this.manager, b, {
              pointers: c[0],
              changedPointers: c[1],
              pointerType: tb,
              srcEvent: a,
            });
        }
      },
    });
    var Wb = { touchstart: yb, touchmove: zb, touchend: Ab, touchcancel: Bb },
      Xb = "touchstart touchmove touchend touchcancel";
    j(Q, y, {
      handler: function (a) {
        var b = Wb[a.type],
          c = R.call(this, a, b);
        c &&
          this.callback(this.manager, b, {
            pointers: c[0],
            changedPointers: c[1],
            pointerType: tb,
            srcEvent: a,
          });
      },
    }),
      j(S, y, {
        handler: function (a, b, c) {
          var d = c.pointerType == tb,
            e = c.pointerType == vb;
          if (d) this.mouse.allow = !1;
          else if (e && !this.mouse.allow) return;
          b & (Ab | Bb) && (this.mouse.allow = !0), this.callback(a, b, c);
        },
        destroy: function () {
          this.touch.destroy(), this.mouse.destroy();
        },
      });
    var Yb = v(jb.style, "touchAction"),
      Zb = Yb !== d,
      $b = "compute",
      _b = "auto",
      ac = "manipulation",
      bc = "none",
      cc = "pan-x",
      dc = "pan-y";
    T.prototype = {
      set: function (a) {
        a == $b && (a = this.compute()),
          Zb && (this.manager.element.style[Yb] = a),
          (this.actions = a.toLowerCase().trim());
      },
      update: function () {
        this.set(this.manager.options.touchAction);
      },
      compute: function () {
        var a = [];
        return (
          g(this.manager.recognizers, function (b) {
            l(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()));
          }),
          U(a.join(" "))
        );
      },
      preventDefaults: function (a) {
        if (!Zb) {
          var b = a.srcEvent,
            c = a.offsetDirection;
          if (this.manager.session.prevented) return void b.preventDefault();
          var d = this.actions,
            e = q(d, bc),
            f = q(d, dc),
            g = q(d, cc);
          return e || (f && c & Hb) || (g && c & Ib)
            ? this.preventSrc(b)
            : void 0;
        }
      },
      preventSrc: function (a) {
        (this.manager.session.prevented = !0), a.preventDefault();
      },
    };
    var ec = 1,
      fc = 2,
      gc = 4,
      hc = 8,
      ic = hc,
      jc = 16,
      kc = 32;
    (V.prototype = {
      defaults: {},
      set: function (a) {
        return (
          h(this.options, a),
          this.manager && this.manager.touchAction.update(),
          this
        );
      },
      recognizeWith: function (a) {
        if (f(a, "recognizeWith", this)) return this;
        var b = this.simultaneous;
        return (
          (a = Y(a, this)),
          b[a.id] || ((b[a.id] = a), a.recognizeWith(this)),
          this
        );
      },
      dropRecognizeWith: function (a) {
        return f(a, "dropRecognizeWith", this)
          ? this
          : ((a = Y(a, this)), delete this.simultaneous[a.id], this);
      },
      requireFailure: function (a) {
        if (f(a, "requireFailure", this)) return this;
        var b = this.requireFail;
        return (
          (a = Y(a, this)),
          -1 === s(b, a) && (b.push(a), a.requireFailure(this)),
          this
        );
      },
      dropRequireFailure: function (a) {
        if (f(a, "dropRequireFailure", this)) return this;
        a = Y(a, this);
        var b = s(this.requireFail, a);
        return b > -1 && this.requireFail.splice(b, 1), this;
      },
      hasRequireFailures: function () {
        return this.requireFail.length > 0;
      },
      canRecognizeWith: function (a) {
        return !!this.simultaneous[a.id];
      },
      emit: function (a) {
        function b(b) {
          c.manager.emit(c.options.event + (b ? W(d) : ""), a);
        }
        var c = this,
          d = this.state;
        hc > d && b(!0), b(), d >= hc && b(!0);
      },
      tryEmit: function (a) {
        return this.canEmit() ? this.emit(a) : void (this.state = kc);
      },
      canEmit: function () {
        for (var a = 0; a < this.requireFail.length; ) {
          if (!(this.requireFail[a].state & (kc | ec))) return !1;
          a++;
        }
        return !0;
      },
      recognize: function (a) {
        var b = h({}, a);
        return l(this.options.enable, [this, b])
          ? (this.state & (ic | jc | kc) && (this.state = ec),
            (this.state = this.process(b)),
            void (this.state & (fc | gc | hc | jc) && this.tryEmit(b)))
          : (this.reset(), void (this.state = kc));
      },
      process: function () {},
      getTouchAction: function () {},
      reset: function () {},
    }),
      j(Z, V, {
        defaults: { pointers: 1 },
        attrTest: function (a) {
          var b = this.options.pointers;
          return 0 === b || a.pointers.length === b;
        },
        process: function (a) {
          var b = this.state,
            c = a.eventType,
            d = b & (fc | gc),
            e = this.attrTest(a);
          return d && (c & Bb || !e)
            ? b | jc
            : d || e
            ? c & Ab
              ? b | hc
              : b & fc
              ? b | gc
              : fc
            : kc;
        },
      }),
      j($, Z, {
        defaults: { event: "pan", threshold: 10, pointers: 1, direction: Jb },
        getTouchAction: function () {
          var a = this.options.direction,
            b = [];
          return a & Hb && b.push(dc), a & Ib && b.push(cc), b;
        },
        directionTest: function (a) {
          var b = this.options,
            c = !0,
            d = a.distance,
            e = a.direction,
            f = a.deltaX,
            g = a.deltaY;
          return (
            e & b.direction ||
              (b.direction & Hb
                ? ((e = 0 === f ? Cb : 0 > f ? Db : Eb),
                  (c = f != this.pX),
                  (d = Math.abs(a.deltaX)))
                : ((e = 0 === g ? Cb : 0 > g ? Fb : Gb),
                  (c = g != this.pY),
                  (d = Math.abs(a.deltaY)))),
            (a.direction = e),
            c && d > b.threshold && e & b.direction
          );
        },
        attrTest: function (a) {
          return (
            Z.prototype.attrTest.call(this, a) &&
            (this.state & fc || (!(this.state & fc) && this.directionTest(a)))
          );
        },
        emit: function (a) {
          (this.pX = a.deltaX), (this.pY = a.deltaY);
          var b = X(a.direction);
          b && this.manager.emit(this.options.event + b, a),
            this._super.emit.call(this, a);
        },
      }),
      j(_, Z, {
        defaults: { event: "pinch", threshold: 0, pointers: 2 },
        getTouchAction: function () {
          return [bc];
        },
        attrTest: function (a) {
          return (
            this._super.attrTest.call(this, a) &&
            (Math.abs(a.scale - 1) > this.options.threshold || this.state & fc)
          );
        },
        emit: function (a) {
          if ((this._super.emit.call(this, a), 1 !== a.scale)) {
            var b = a.scale < 1 ? "in" : "out";
            this.manager.emit(this.options.event + b, a);
          }
        },
      }),
      j(ab, V, {
        defaults: { event: "press", pointers: 1, time: 500, threshold: 5 },
        getTouchAction: function () {
          return [_b];
        },
        process: function (a) {
          var b = this.options,
            c = a.pointers.length === b.pointers,
            d = a.distance < b.threshold,
            f = a.deltaTime > b.time;
          if (((this._input = a), !d || !c || (a.eventType & (Ab | Bb) && !f)))
            this.reset();
          else if (a.eventType & yb)
            this.reset(),
              (this._timer = e(
                function () {
                  (this.state = ic), this.tryEmit();
                },
                b.time,
                this
              ));
          else if (a.eventType & Ab) return ic;
          return kc;
        },
        reset: function () {
          clearTimeout(this._timer);
        },
        emit: function (a) {
          this.state === ic &&
            (a && a.eventType & Ab
              ? this.manager.emit(this.options.event + "up", a)
              : ((this._input.timeStamp = nb()),
                this.manager.emit(this.options.event, this._input)));
        },
      }),
      j(bb, Z, {
        defaults: { event: "rotate", threshold: 0, pointers: 2 },
        getTouchAction: function () {
          return [bc];
        },
        attrTest: function (a) {
          return (
            this._super.attrTest.call(this, a) &&
            (Math.abs(a.rotation) > this.options.threshold || this.state & fc)
          );
        },
      }),
      j(cb, Z, {
        defaults: {
          event: "swipe",
          threshold: 10,
          velocity: 0.65,
          direction: Hb | Ib,
          pointers: 1,
        },
        getTouchAction: function () {
          return $.prototype.getTouchAction.call(this);
        },
        attrTest: function (a) {
          var b,
            c = this.options.direction;
          return (
            c & (Hb | Ib)
              ? (b = a.velocity)
              : c & Hb
              ? (b = a.velocityX)
              : c & Ib && (b = a.velocityY),
            this._super.attrTest.call(this, a) &&
              c & a.direction &&
              a.distance > this.options.threshold &&
              mb(b) > this.options.velocity &&
              a.eventType & Ab
          );
        },
        emit: function (a) {
          var b = X(a.direction);
          b && this.manager.emit(this.options.event + b, a),
            this.manager.emit(this.options.event, a);
        },
      }),
      j(db, V, {
        defaults: {
          event: "tap",
          pointers: 1,
          taps: 1,
          interval: 300,
          time: 250,
          threshold: 2,
          posThreshold: 10,
        },
        getTouchAction: function () {
          return [ac];
        },
        process: function (a) {
          var b = this.options,
            c = a.pointers.length === b.pointers,
            d = a.distance < b.threshold,
            f = a.deltaTime < b.time;
          if ((this.reset(), a.eventType & yb && 0 === this.count))
            return this.failTimeout();
          if (d && f && c) {
            if (a.eventType != Ab) return this.failTimeout();
            var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0,
              h = !this.pCenter || I(this.pCenter, a.center) < b.posThreshold;
            (this.pTime = a.timeStamp),
              (this.pCenter = a.center),
              h && g ? (this.count += 1) : (this.count = 1),
              (this._input = a);
            var i = this.count % b.taps;
            if (0 === i)
              return this.hasRequireFailures()
                ? ((this._timer = e(
                    function () {
                      (this.state = ic), this.tryEmit();
                    },
                    b.interval,
                    this
                  )),
                  fc)
                : ic;
          }
          return kc;
        },
        failTimeout: function () {
          return (
            (this._timer = e(
              function () {
                this.state = kc;
              },
              this.options.interval,
              this
            )),
            kc
          );
        },
        reset: function () {
          clearTimeout(this._timer);
        },
        emit: function () {
          this.state == ic &&
            ((this._input.tapCount = this.count),
            this.manager.emit(this.options.event, this._input));
        },
      }),
      (eb.VERSION = "2.0.4"),
      (eb.defaults = {
        domEvents: !1,
        touchAction: $b,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [
          [bb, { enable: !1 }],
          [_, { enable: !1 }, ["rotate"]],
          [cb, { direction: Hb }],
          [$, { direction: Hb }, ["swipe"]],
          [db],
          [db, { event: "doubletap", taps: 2 }, ["tap"]],
          [ab],
        ],
        cssProps: {
          userSelect: "none",
          touchSelect: "none",
          touchCallout: "none",
          contentZooming: "none",
          userDrag: "none",
          tapHighlightColor: "rgba(0,0,0,0)",
        },
      });
    var lc = 1,
      mc = 2;
    (fb.prototype = {
      set: function (a) {
        return (
          h(this.options, a),
          a.touchAction && this.touchAction.update(),
          a.inputTarget &&
            (this.input.destroy(),
            (this.input.target = a.inputTarget),
            this.input.init()),
          this
        );
      },
      stop: function (a) {
        this.session.stopped = a ? mc : lc;
      },
      recognize: function (a) {
        var b = this.session;
        if (!b.stopped) {
          this.touchAction.preventDefaults(a);
          var c,
            d = this.recognizers,
            e = b.curRecognizer;
          (!e || (e && e.state & ic)) && (e = b.curRecognizer = null);
          for (var f = 0; f < d.length; )
            (c = d[f]),
              b.stopped === mc || (e && c != e && !c.canRecognizeWith(e))
                ? c.reset()
                : c.recognize(a),
              !e && c.state & (fc | gc | hc) && (e = b.curRecognizer = c),
              f++;
        }
      },
      get: function (a) {
        if (a instanceof V) return a;
        for (var b = this.recognizers, c = 0; c < b.length; c++)
          if (b[c].options.event == a) return b[c];
        return null;
      },
      add: function (a) {
        if (f(a, "add", this)) return this;
        var b = this.get(a.options.event);
        return (
          b && this.remove(b),
          this.recognizers.push(a),
          (a.manager = this),
          this.touchAction.update(),
          a
        );
      },
      remove: function (a) {
        if (f(a, "remove", this)) return this;
        var b = this.recognizers;
        return (
          (a = this.get(a)),
          b.splice(s(b, a), 1),
          this.touchAction.update(),
          this
        );
      },
      on: function (a, b) {
        var c = this.handlers;
        return (
          g(r(a), function (a) {
            (c[a] = c[a] || []), c[a].push(b);
          }),
          this
        );
      },
      off: function (a, b) {
        var c = this.handlers;
        return (
          g(r(a), function (a) {
            b ? c[a].splice(s(c[a], b), 1) : delete c[a];
          }),
          this
        );
      },
      emit: function (a, b) {
        this.options.domEvents && hb(a, b);
        var c = this.handlers[a] && this.handlers[a].slice();
        if (c && c.length) {
          (b.type = a),
            (b.preventDefault = function () {
              b.srcEvent.preventDefault();
            });
          for (var d = 0; d < c.length; ) c[d](b), d++;
        }
      },
      destroy: function () {
        this.element && gb(this, !1),
          (this.handlers = {}),
          (this.session = {}),
          this.input.destroy(),
          (this.element = null);
      },
    }),
      h(eb, {
        INPUT_START: yb,
        INPUT_MOVE: zb,
        INPUT_END: Ab,
        INPUT_CANCEL: Bb,
        STATE_POSSIBLE: ec,
        STATE_BEGAN: fc,
        STATE_CHANGED: gc,
        STATE_ENDED: hc,
        STATE_RECOGNIZED: ic,
        STATE_CANCELLED: jc,
        STATE_FAILED: kc,
        DIRECTION_NONE: Cb,
        DIRECTION_LEFT: Db,
        DIRECTION_RIGHT: Eb,
        DIRECTION_UP: Fb,
        DIRECTION_DOWN: Gb,
        DIRECTION_HORIZONTAL: Hb,
        DIRECTION_VERTICAL: Ib,
        DIRECTION_ALL: Jb,
        Manager: fb,
        Input: y,
        TouchAction: T,
        TouchInput: Q,
        MouseInput: M,
        PointerEventInput: N,
        TouchMouseInput: S,
        SingleTouchInput: O,
        Recognizer: V,
        AttrRecognizer: Z,
        Tap: db,
        Pan: $,
        Swipe: cb,
        Pinch: _,
        Rotate: bb,
        Press: ab,
        on: n,
        off: o,
        each: g,
        merge: i,
        extend: h,
        inherit: j,
        bindFn: k,
        prefixed: v,
      }),
      typeof define == kb && define.amd
        ? define(function () {
            return eb;
          })
        : "undefined" != typeof module && module.exports
        ? (module.exports = eb)
        : (a[c] = eb);
  })(window, document, "Hammer");
}

/*! Picturefill - v3.0.1 - 2015-09-30
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!(function (a) {
  var b = navigator.userAgent;
  a.HTMLPictureElement &&
    /ecko/.test(b) &&
    b.match(/rv\:(\d+)/) &&
    RegExp.$1 < 41 &&
    addEventListener(
      "resize",
      (function () {
        var b,
          c = document.createElement("source"),
          d = function (a) {
            var b,
              d,
              e = a.parentNode;
            "PICTURE" === e.nodeName.toUpperCase()
              ? ((b = c.cloneNode()),
                e.insertBefore(b, e.firstElementChild),
                setTimeout(function () {
                  e.removeChild(b);
                }))
              : (!a._pfLastSize || a.offsetWidth > a._pfLastSize) &&
                ((a._pfLastSize = a.offsetWidth),
                (d = a.sizes),
                (a.sizes += ",100vw"),
                setTimeout(function () {
                  a.sizes = d;
                }));
          },
          e = function () {
            var a,
              b = document.querySelectorAll(
                "picture > img, img[srcset][sizes]"
              );
            for (a = 0; a < b.length; a++) d(b[a]);
          },
          f = function () {
            clearTimeout(b), (b = setTimeout(e, 99));
          },
          g = a.matchMedia && matchMedia("(orientation: landscape)"),
          h = function () {
            f(), g && g.addListener && g.addListener(f);
          };
        return (
          (c.srcset =
            "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
          /^[c|i]|d$/.test(document.readyState || "")
            ? h()
            : document.addEventListener("DOMContentLoaded", h),
          f
        );
      })()
    );
})(window),
  (function (a, b, c) {
    "use strict";
    function d(a) {
      return " " === a || "	" === a || "\n" === a || "\f" === a || "\r" === a;
    }
    function e(b, c) {
      var d = new a.Image();
      return (
        (d.onerror = function () {
          (z[b] = !1), aa();
        }),
        (d.onload = function () {
          (z[b] = 1 === d.width), aa();
        }),
        (d.src = c),
        "pending"
      );
    }
    function f() {
      (L = !1),
        (O = a.devicePixelRatio),
        (M = {}),
        (N = {}),
        (s.DPR = O || 1),
        (P.width = Math.max(a.innerWidth || 0, y.clientWidth)),
        (P.height = Math.max(a.innerHeight || 0, y.clientHeight)),
        (P.vw = P.width / 100),
        (P.vh = P.height / 100),
        (r = [P.height, P.width, O].join("-")),
        (P.em = s.getEmValue()),
        (P.rem = P.em);
    }
    function g(a, b, c, d) {
      var e, f, g, h;
      return (
        "saveData" === A.algorithm
          ? a > 2.7
            ? (h = c + 1)
            : ((f = b - c),
              (e = Math.pow(a - 0.6, 1.5)),
              (g = f * e),
              d && (g += 0.1 * e),
              (h = a + g))
          : (h = c > 1 ? Math.sqrt(a * b) : a),
        h > c
      );
    }
    function h(a) {
      var b,
        c = s.getSet(a),
        d = !1;
      "pending" !== c &&
        ((d = r), c && ((b = s.setRes(c)), s.applySetCandidate(b, a))),
        (a[s.ns].evaled = d);
    }
    function i(a, b) {
      return a.res - b.res;
    }
    function j(a, b, c) {
      var d;
      return (
        !c && b && ((c = a[s.ns].sets), (c = c && c[c.length - 1])),
        (d = k(b, c)),
        d &&
          ((b = s.makeUrl(b)),
          (a[s.ns].curSrc = b),
          (a[s.ns].curCan = d),
          d.res || _(d, d.set.sizes)),
        d
      );
    }
    function k(a, b) {
      var c, d, e;
      if (a && b)
        for (e = s.parseSet(b), a = s.makeUrl(a), c = 0; c < e.length; c++)
          if (a === s.makeUrl(e[c].url)) {
            d = e[c];
            break;
          }
      return d;
    }
    function l(a, b) {
      var c,
        d,
        e,
        f,
        g = a.getElementsByTagName("source");
      for (c = 0, d = g.length; d > c; c++)
        (e = g[c]),
          (e[s.ns] = !0),
          (f = e.getAttribute("srcset")),
          f &&
            b.push({
              srcset: f,
              media: e.getAttribute("media"),
              type: e.getAttribute("type"),
              sizes: e.getAttribute("sizes"),
            });
    }
    function m(a, b) {
      function c(b) {
        var c,
          d = b.exec(a.substring(m));
        return d ? ((c = d[0]), (m += c.length), c) : void 0;
      }
      function e() {
        var a,
          c,
          d,
          e,
          f,
          i,
          j,
          k,
          l,
          m = !1,
          o = {};
        for (e = 0; e < h.length; e++)
          (f = h[e]),
            (i = f[f.length - 1]),
            (j = f.substring(0, f.length - 1)),
            (k = parseInt(j, 10)),
            (l = parseFloat(j)),
            W.test(j) && "w" === i
              ? ((a || c) && (m = !0), 0 === k ? (m = !0) : (a = k))
              : X.test(j) && "x" === i
              ? ((a || c || d) && (m = !0), 0 > l ? (m = !0) : (c = l))
              : W.test(j) && "h" === i
              ? ((d || c) && (m = !0), 0 === k ? (m = !0) : (d = k))
              : (m = !0);
        m ||
          ((o.url = g),
          a && (o.w = a),
          c && (o.d = c),
          d && (o.h = d),
          d || c || a || (o.d = 1),
          1 === o.d && (b.has1x = !0),
          (o.set = b),
          n.push(o));
      }
      function f() {
        for (c(S), i = "", j = "in descriptor"; ; ) {
          if (((k = a.charAt(m)), "in descriptor" === j))
            if (d(k)) i && (h.push(i), (i = ""), (j = "after descriptor"));
            else {
              if ("," === k) return (m += 1), i && h.push(i), void e();
              if ("(" === k) (i += k), (j = "in parens");
              else {
                if ("" === k) return i && h.push(i), void e();
                i += k;
              }
            }
          else if ("in parens" === j)
            if (")" === k) (i += k), (j = "in descriptor");
            else {
              if ("" === k) return h.push(i), void e();
              i += k;
            }
          else if ("after descriptor" === j)
            if (d(k));
            else {
              if ("" === k) return void e();
              (j = "in descriptor"), (m -= 1);
            }
          m += 1;
        }
      }
      for (var g, h, i, j, k, l = a.length, m = 0, n = []; ; ) {
        if ((c(T), m >= l)) return n;
        (g = c(U)),
          (h = []),
          "," === g.slice(-1) ? ((g = g.replace(V, "")), e()) : f();
      }
    }
    function n(a) {
      function b(a) {
        function b() {
          f && (g.push(f), (f = ""));
        }
        function c() {
          g[0] && (h.push(g), (g = []));
        }
        for (var e, f = "", g = [], h = [], i = 0, j = 0, k = !1; ; ) {
          if (((e = a.charAt(j)), "" === e)) return b(), c(), h;
          if (k) {
            if ("*" === e && "/" === a[j + 1]) {
              (k = !1), (j += 2), b();
              continue;
            }
            j += 1;
          } else {
            if (d(e)) {
              if ((a.charAt(j - 1) && d(a.charAt(j - 1))) || !f) {
                j += 1;
                continue;
              }
              if (0 === i) {
                b(), (j += 1);
                continue;
              }
              e = " ";
            } else if ("(" === e) i += 1;
            else if (")" === e) i -= 1;
            else {
              if ("," === e) {
                b(), c(), (j += 1);
                continue;
              }
              if ("/" === e && "*" === a.charAt(j + 1)) {
                (k = !0), (j += 2);
                continue;
              }
            }
            (f += e), (j += 1);
          }
        }
      }
      function c(a) {
        return k.test(a) && parseFloat(a) >= 0
          ? !0
          : l.test(a)
          ? !0
          : "0" === a || "-0" === a || "+0" === a
          ? !0
          : !1;
      }
      var e,
        f,
        g,
        h,
        i,
        j,
        k = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,
        l = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
      for (f = b(a), g = f.length, e = 0; g > e; e++)
        if (((h = f[e]), (i = h[h.length - 1]), c(i))) {
          if (((j = i), h.pop(), 0 === h.length)) return j;
          if (((h = h.join(" ")), s.matchesMedia(h))) return j;
        }
      return "100vw";
    }
    b.createElement("picture");
    var o,
      p,
      q,
      r,
      s = {},
      t = function () {},
      u = b.createElement("img"),
      v = u.getAttribute,
      w = u.setAttribute,
      x = u.removeAttribute,
      y = b.documentElement,
      z = {},
      A = { algorithm: "" },
      B = "data-pfsrc",
      C = B + "set",
      D = navigator.userAgent,
      E =
        /rident/.test(D) ||
        (/ecko/.test(D) && D.match(/rv\:(\d+)/) && RegExp.$1 > 35),
      F = "currentSrc",
      G = /\s+\+?\d+(e\d+)?w/,
      H = /(\([^)]+\))?\s*(.+)/,
      I = a.picturefillCFG,
      J =
        "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",
      K = "font-size:100%!important;",
      L = !0,
      M = {},
      N = {},
      O = a.devicePixelRatio,
      P = { px: 1, in: 96 },
      Q = b.createElement("a"),
      R = !1,
      S = /^[ \t\n\r\u000c]+/,
      T = /^[, \t\n\r\u000c]+/,
      U = /^[^ \t\n\r\u000c]+/,
      V = /[,]+$/,
      W = /^\d+$/,
      X = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,
      Y = function (a, b, c, d) {
        a.addEventListener
          ? a.addEventListener(b, c, d || !1)
          : a.attachEvent && a.attachEvent("on" + b, c);
      },
      Z = function (a) {
        var b = {};
        return function (c) {
          return c in b || (b[c] = a(c)), b[c];
        };
      },
      $ = (function () {
        var a = /^([\d\.]+)(em|vw|px)$/,
          b = function () {
            for (var a = arguments, b = 0, c = a[0]; ++b in a; )
              c = c.replace(a[b], a[++b]);
            return c;
          },
          c = Z(function (a) {
            return (
              "return " +
              b(
                (a || "").toLowerCase(),
                /\band\b/g,
                "&&",
                /,/g,
                "||",
                /min-([a-z-\s]+):/g,
                "e.$1>=",
                /max-([a-z-\s]+):/g,
                "e.$1<=",
                /calc([^)]+)/g,
                "($1)",
                /(\d+[\.]*[\d]*)([a-z]+)/g,
                "($1 * e.$2)",
                /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,
                ""
              ) +
              ";"
            );
          });
        return function (b, d) {
          var e;
          if (!(b in M))
            if (((M[b] = !1), d && (e = b.match(a)))) M[b] = e[1] * P[e[2]];
            else
              try {
                M[b] = new Function("e", c(b))(P);
              } catch (f) {}
          return M[b];
        };
      })(),
      _ = function (a, b) {
        return (
          a.w
            ? ((a.cWidth = s.calcListLength(b || "100vw")),
              (a.res = a.w / a.cWidth))
            : (a.res = a.d),
          a
        );
      },
      aa = function (a) {
        var c,
          d,
          e,
          f = a || {};
        if (
          (f.elements &&
            1 === f.elements.nodeType &&
            ("IMG" === f.elements.nodeName.toUpperCase()
              ? (f.elements = [f.elements])
              : ((f.context = f.elements), (f.elements = null))),
          (c =
            f.elements ||
            s.qsa(
              f.context || b,
              f.reevaluate || f.reselect ? s.sel : s.selShort
            )),
          (e = c.length))
        ) {
          for (s.setupRun(f), R = !0, d = 0; e > d; d++) s.fillImg(c[d], f);
          s.teardownRun(f);
        }
      };
    (o =
      a.console && console.warn
        ? function (a) {
            console.warn(a);
          }
        : t),
      F in u || (F = "src"),
      (z["image/jpeg"] = !0),
      (z["image/gif"] = !0),
      (z["image/png"] = !0),
      (z["image/svg+xml"] = b.implementation.hasFeature(
        "http://wwwindow.w3.org/TR/SVG11/feature#Image",
        "1.1"
      )),
      (s.ns = ("pf" + new Date().getTime()).substr(0, 9)),
      (s.supSrcset = "srcset" in u),
      (s.supSizes = "sizes" in u),
      (s.supPicture = !!a.HTMLPictureElement),
      s.supSrcset &&
        s.supPicture &&
        !s.supSizes &&
        !(function (a) {
          (u.srcset = "data:,a"),
            (a.src = "data:,a"),
            (s.supSrcset = u.complete === a.complete),
            (s.supPicture = s.supSrcset && s.supPicture);
        })(b.createElement("img")),
      (s.selShort = "picture>img,img[srcset]"),
      (s.sel = s.selShort),
      (s.cfg = A),
      s.supSrcset && (s.sel += ",img[" + C + "]"),
      (s.DPR = O || 1),
      (s.u = P),
      (s.types = z),
      (q = s.supSrcset && !s.supSizes),
      (s.setSize = t),
      (s.makeUrl = Z(function (a) {
        return (Q.href = a), Q.href;
      })),
      (s.qsa = function (a, b) {
        return a.querySelectorAll(b);
      }),
      (s.matchesMedia = function () {
        return (
          a.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches
            ? (s.matchesMedia = function (a) {
                return !a || matchMedia(a).matches;
              })
            : (s.matchesMedia = s.mMQ),
          s.matchesMedia.apply(this, arguments)
        );
      }),
      (s.mMQ = function (a) {
        return a ? $(a) : !0;
      }),
      (s.calcLength = function (a) {
        var b = $(a, !0) || !1;
        return 0 > b && (b = !1), b;
      }),
      (s.supportsType = function (a) {
        return a ? z[a] : !0;
      }),
      (s.parseSize = Z(function (a) {
        var b = (a || "").match(H);
        return { media: b && b[1], length: b && b[2] };
      })),
      (s.parseSet = function (a) {
        return a.cands || (a.cands = m(a.srcset, a)), a.cands;
      }),
      (s.getEmValue = function () {
        var a;
        if (!p && (a = b.body)) {
          var c = b.createElement("div"),
            d = y.style.cssText,
            e = a.style.cssText;
          (c.style.cssText = J),
            (y.style.cssText = K),
            (a.style.cssText = K),
            a.appendChild(c),
            (p = c.offsetWidth),
            a.removeChild(c),
            (p = parseFloat(p, 10)),
            (y.style.cssText = d),
            (a.style.cssText = e);
        }
        return p || 16;
      }),
      (s.calcListLength = function (a) {
        if (!(a in N) || A.uT) {
          var b = s.calcLength(n(a));
          N[a] = b ? b : P.width;
        }
        return N[a];
      }),
      (s.setRes = function (a) {
        var b;
        if (a) {
          b = s.parseSet(a);
          for (var c = 0, d = b.length; d > c; c++) _(b[c], a.sizes);
        }
        return b;
      }),
      (s.setRes.res = _),
      (s.applySetCandidate = function (a, b) {
        if (a.length) {
          var c,
            d,
            e,
            f,
            h,
            k,
            l,
            m,
            n,
            o = b[s.ns],
            p = s.DPR;
          if (
            ((k = o.curSrc || b[F]),
            (l = o.curCan || j(b, k, a[0].set)),
            l &&
              l.set === a[0].set &&
              ((n = E && !b.complete && l.res - 0.1 > p),
              n || ((l.cached = !0), l.res >= p && (h = l))),
            !h)
          )
            for (a.sort(i), f = a.length, h = a[f - 1], d = 0; f > d; d++)
              if (((c = a[d]), c.res >= p)) {
                (e = d - 1),
                  (h =
                    a[e] &&
                    (n || k !== s.makeUrl(c.url)) &&
                    g(a[e].res, c.res, p, a[e].cached)
                      ? a[e]
                      : c);
                break;
              }
          h &&
            ((m = s.makeUrl(h.url)),
            (o.curSrc = m),
            (o.curCan = h),
            m !== k && s.setSrc(b, h),
            s.setSize(b));
        }
      }),
      (s.setSrc = function (a, b) {
        var c;
        (a.src = b.url),
          "image/svg+xml" === b.set.type &&
            ((c = a.style.width),
            (a.style.width = a.offsetWidth + 1 + "px"),
            a.offsetWidth + 1 && (a.style.width = c));
      }),
      (s.getSet = function (a) {
        var b,
          c,
          d,
          e = !1,
          f = a[s.ns].sets;
        for (b = 0; b < f.length && !e; b++)
          if (
            ((c = f[b]),
            c.srcset && s.matchesMedia(c.media) && (d = s.supportsType(c.type)))
          ) {
            "pending" === d && (c = d), (e = c);
            break;
          }
        return e;
      }),
      (s.parseSets = function (a, b, d) {
        var e,
          f,
          g,
          h,
          i = b && "PICTURE" === b.nodeName.toUpperCase(),
          j = a[s.ns];
        (j.src === c || d.src) &&
          ((j.src = v.call(a, "src")),
          j.src ? w.call(a, B, j.src) : x.call(a, B)),
          (j.srcset === c || d.srcset || !s.supSrcset || a.srcset) &&
            ((e = v.call(a, "srcset")), (j.srcset = e), (h = !0)),
          (j.sets = []),
          i && ((j.pic = !0), l(b, j.sets)),
          j.srcset
            ? ((f = { srcset: j.srcset, sizes: v.call(a, "sizes") }),
              j.sets.push(f),
              (g = (q || j.src) && G.test(j.srcset || "")),
              g ||
                !j.src ||
                k(j.src, f) ||
                f.has1x ||
                ((f.srcset += ", " + j.src),
                f.cands.push({ url: j.src, d: 1, set: f })))
            : j.src && j.sets.push({ srcset: j.src, sizes: null }),
          (j.curCan = null),
          (j.curSrc = c),
          (j.supported = !(i || (f && !s.supSrcset) || g)),
          h &&
            s.supSrcset &&
            !j.supported &&
            (e ? (w.call(a, C, e), (a.srcset = "")) : x.call(a, C)),
          j.supported &&
            !j.srcset &&
            ((!j.src && a.src) || a.src !== s.makeUrl(j.src)) &&
            (null === j.src ? a.removeAttribute("src") : (a.src = j.src)),
          (j.parsed = !0);
      }),
      (s.fillImg = function (a, b) {
        var c,
          d = b.reselect || b.reevaluate;
        a[s.ns] || (a[s.ns] = {}),
          (c = a[s.ns]),
          (d || c.evaled !== r) &&
            ((!c.parsed || b.reevaluate) && s.parseSets(a, a.parentNode, b),
            c.supported ? (c.evaled = r) : h(a));
      }),
      (s.setupRun = function () {
        (!R || L || O !== a.devicePixelRatio) && f();
      }),
      s.supPicture
        ? ((aa = t), (s.fillImg = t))
        : !(function () {
            var c,
              d = a.attachEvent ? /d$|^c/ : /d$|^c|^i/,
              e = function () {
                var a = b.readyState || "";
                (f = setTimeout(e, "loading" === a ? 200 : 999)),
                  b.body &&
                    (s.fillImgs(), (c = c || d.test(a)), c && clearTimeout(f));
              },
              f = setTimeout(e, b.body ? 9 : 99),
              g = function (a, b) {
                var c,
                  d,
                  e = function () {
                    var f = new Date() - d;
                    b > f ? (c = setTimeout(e, b - f)) : ((c = null), a());
                  };
                return function () {
                  (d = new Date()), c || (c = setTimeout(e, b));
                };
              },
              h = y.clientHeight,
              i = function () {
                (L =
                  Math.max(a.innerWidth || 0, y.clientWidth) !== P.width ||
                  y.clientHeight !== h),
                  (h = y.clientHeight),
                  L && s.fillImgs();
              };
            Y(a, "resize", g(i, 99)), Y(b, "readystatechange", e);
          })(),
      (s.picturefill = aa),
      (s.fillImgs = aa),
      (s.teardownRun = t),
      (aa._ = s),
      (a.picturefillCFG = {
        pf: s,
        push: function (a) {
          var b = a.shift();
          "function" == typeof s[b]
            ? s[b].apply(s, a)
            : ((A[b] = a[0]), R && s.fillImgs({ reselect: !0 }));
        },
      });
    for (; I && I.length; ) a.picturefillCFG.push(I.shift());
    (a.picturefill = aa),
      "object" == typeof module && "object" == typeof module.exports
        ? (module.exports = aa)
        : "function" == typeof define &&
          define.amd &&
          define("picturefill", function () {
            return aa;
          }),
      s.supPicture ||
        (z["image/webp"] = e(
          "image/webp",
          "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="
        ));
  })(window, document);

/*!
 * FitVids 1.0.3
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 * Date: Thu Sept 01 18:00:00 2011 -0500
 */
(function (a) {
  a.fn.fitVids = function (b) {
    var c = { customSelector: null };
    if (!document.getElementById("fit-vids-style")) {
      var f = document.createElement("div"),
        d =
          document.getElementsByTagName("base")[0] ||
          document.getElementsByTagName("script")[0],
        e =
          "&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>";
      f.className = "fit-vids-style";
      f.id = "fit-vids-style";
      f.style.display = "none";
      f.innerHTML = e;
      d.parentNode.insertBefore(f, d);
    }
    if (b) {
      a.extend(c, b);
    }
    return this.each(function () {
      var g = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed",
      ];
      if (c.customSelector) {
        g.push(c.customSelector);
      }
      var h = a(this).find(g.join(","));
      h = h.not("object object");
      h.each(function () {
        var m = a(this);
        if (
          (this.tagName.toLowerCase() === "embed" &&
            m.parent("object").length) ||
          m.parent(".fluid-width-video-wrapper").length
        ) {
          return;
        }
        var i =
            this.tagName.toLowerCase() === "object" ||
            (m.attr("height") && !isNaN(parseInt(m.attr("height"), 10)))
              ? parseInt(m.attr("height"), 10)
              : m.height(),
          j = !isNaN(parseInt(m.attr("width"), 10))
            ? parseInt(m.attr("width"), 10)
            : m.width(),
          k = i / j;
        if (!m.attr("id")) {
          var l = "fitvid" + Math.floor(Math.random() * 999999);
          m.attr("id", l);
        }
        m.wrap('<div class="fluid-width-video-wrapper"></div>')
          .parent(".fluid-width-video-wrapper")
          .css("padding-top", k * 100 + "%");
        m.removeAttr("height").removeAttr("width");
      });
    });
  };
})(window.jQuery || window.Zepto);

/*!
 * @copyright Copyright (c) 2016 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.1.16
 */
/*jslint browser: true */
/*global XDomainRequest, MutationObserver, window */
(function () {
  "use strict";
  if (window && window.addEventListener) {
    var cache = Object.create(null); // holds xhr objects to prevent multiple requests
    var checkUseElems, tid; // timeout id
    var debouncedCheck = function () {
      clearTimeout(tid);
      tid = setTimeout(checkUseElems, 100);
    };
    var unobserveChanges = function () {
      return;
    };
    var observeChanges = function () {
      var observer;
      window.addEventListener("resize", debouncedCheck, false);
      window.addEventListener("orientationchange", debouncedCheck, false);
      if (window.MutationObserver) {
        observer = new MutationObserver(debouncedCheck);
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
          attributes: true,
        });
        unobserveChanges = function () {
          try {
            observer.disconnect();
            window.removeEventListener("resize", debouncedCheck, false);
            window.removeEventListener(
              "orientationchange",
              debouncedCheck,
              false
            );
          } catch (ignore) {}
        };
      } else {
        document.documentElement.addEventListener(
          "DOMSubtreeModified",
          debouncedCheck,
          false
        );
        unobserveChanges = function () {
          document.documentElement.removeEventListener(
            "DOMSubtreeModified",
            debouncedCheck,
            false
          );
          window.removeEventListener("resize", debouncedCheck, false);
          window.removeEventListener(
            "orientationchange",
            debouncedCheck,
            false
          );
        };
      }
    };
    var xlinkNS = "http://www.w3.org/1999/xlink";
    checkUseElems = function () {
      var base,
        bcr,
        fallback = "", // optional fallback URL in case no base path to SVG file was given and no symbol definition was found.
        hash,
        i,
        Request,
        inProgressCount = 0,
        isHidden,
        url,
        uses,
        xhr;
      if (window.XMLHttpRequest) {
        Request = new XMLHttpRequest();
        if (Request.withCredentials !== undefined) {
          Request = XMLHttpRequest;
        } else {
          Request = XDomainRequest || undefined;
        }
      }
      if (Request === undefined) {
        return;
      }
      function observeIfDone() {
        // If done with making changes, start watching for chagnes in DOM again
        inProgressCount -= 1;
        if (inProgressCount === 0) {
          // if all xhrs were resolved
          observeChanges(); // watch for changes to DOM
        }
      }
      function attrUpdateFunc(spec) {
        return function () {
          if (cache[spec.base] !== true) {
            spec.useEl.setAttributeNS(xlinkNS, "xlink:href", "#" + spec.hash);
          }
        };
      }
      function onloadFunc(xhr) {
        return function () {
          var body = document.body;
          var x = document.createElement("x");
          var svg;
          xhr.onload = null;
          x.innerHTML = xhr.responseText;
          svg = x.getElementsByTagName("svg")[0];
          if (svg) {
            svg.setAttribute("aria-hidden", "true");
            svg.style.position = "absolute";
            svg.style.width = 0;
            svg.style.height = 0;
            svg.style.overflow = "hidden";
            body.insertBefore(svg, body.firstChild);
          }
          observeIfDone();
        };
      }
      function onErrorTimeout(xhr) {
        return function () {
          xhr.onerror = null;
          xhr.ontimeout = null;
          observeIfDone();
        };
      }
      unobserveChanges(); // stop watching for changes to DOM
      // find all use elements
      uses = document.getElementsByTagName("use");
      for (i = 0; i < uses.length; i += 1) {
        try {
          bcr = uses[i].getBoundingClientRect();
        } catch (ignore) {
          // failed to get bounding rectangle of the use element
          bcr = false;
        }
        url = uses[i].getAttributeNS(xlinkNS, "href").split("#");
        base = url[0];
        hash = url[1];
        isHidden =
          bcr &&
          bcr.left === 0 &&
          bcr.right === 0 &&
          bcr.top === 0 &&
          bcr.bottom === 0;
        if (bcr && bcr.width === 0 && bcr.height === 0 && !isHidden) {
          // the use element is empty
          // if there is a reference to an external SVG, try to fetch it
          // use the optional fallback URL if there is no reference to an external SVG
          if (
            fallback &&
            !base.length &&
            hash &&
            !document.getElementById(hash)
          ) {
            base = fallback;
          }
          if (base.length) {
            // schedule updating xlink:href
            xhr = cache[base];
            if (xhr !== true) {
              // true signifies that prepending the SVG was not required
              setTimeout(
                attrUpdateFunc({
                  useEl: uses[i],
                  base: base,
                  hash: hash,
                }),
                0
              );
            }
            if (xhr === undefined) {
              xhr = new Request();
              cache[base] = xhr;
              xhr.onload = onloadFunc(xhr);
              xhr.onerror = onErrorTimeout(xhr);
              xhr.ontimeout = onErrorTimeout(xhr);
              xhr.open("GET", base);
              xhr.send();
              inProgressCount += 1;
            }
          }
        } else {
          if (!isHidden) {
            if (cache[base] === undefined) {
              // remember this URL if the use element was not empty and no request was sent
              cache[base] = true;
            } else if (cache[base].onload) {
              // if it turns out that prepending the SVG is not necessary,
              // abort the in-progress xhr.
              cache[base].abort();
              cache[base].onload = undefined;
              cache[base] = true;
            }
          }
        }
      }
      uses = "";
      inProgressCount += 1;
      observeIfDone();
    };
    // The load event fires when all resources have finished loading, which allows detecting whether SVG use elements are empty.
    window.addEventListener(
      "load",
      function winLoad() {
        window.removeEventListener("load", winLoad, false); // to prevent memory leaks
        tid = setTimeout(checkUseElems, 0);
      },
      false
    );
  }
})();

(function ($) {
  function AjaxFilter(options) {
    this.options = $.extend(
      {
        loadingClass: "ajax-content-loading",
        targetBlock: ".ajax-load-container",
        filtersTargetBlock: ".filters-target-container",
        mainFilter: ".js-main-filter",
        subFilter: ".js-sub-filter",
        form: ".ajax-filter-form",
        loadItemsContainer: ".load-items-container",
        loadFiltersContainer: ".load-filters-container",
        filtersMarksContainer: ".js-filters-marks-container",
        searchInput: ".filter-search-text",
        btnsFiltering: ".btn-filtering",
        ajaxData: "ajax=1",
        markText: ".filter-mark-text",
        elemFilterMark: ".js-filter-mark",
        filterMarkTmp:
          '<li class="js-filter-mark"><a href="#" class="js-btn-remove-mark"><svg class="icon icon-close"><use xlink:href="/wp-content/themes/High-Performance-Framework/images/sprite.svg#icon-close"></use></svg></a> <span class="filter-mark-text"></span></li>',
        animDuration: 500,
      },
      options
    );
    this.init();
  }
  AjaxFilter.prototype = {
    init: function () {
      this.findElements();
      this.addEvents();
      this.makeCallback("onInit", this);
    },
    findElements: function () {
      this.holder = $(this.options.holder);
      this.targetBlock = this.holder.find(this.options.targetBlock);
      this.filtersTargetBlock = this.holder.find(
        this.options.filtersTargetBlock
      );
      this.form = this.holder.find(this.options.form);
      this.mainFilters = this.holder.find(this.options.mainFilter);
      this.searchInput = this.holder.find(this.options.searchInput);

      this.loading = false;
    },
    refreshCustomFormElems: function (elems) {
      elems.each(function () {
        var elem = jQuery(this);
        var instance;
        if (window.jcf) {
          instance = jcf.getInstance(elem);
          if (instance) instance.refresh();
        }
      });
    },
    addEvents: function () {
      var self = this;

      this.refreshContent = function (state) {
        if (!this.loading) {
          this.removeContent(
            false,
            function () {
              this.loadContent();
            },
            state
          );
        }
      };

      this.onFormSubmit = function (e) {
        e.preventDefault();
        self.filter = self.form.serialize();
        self.url = self.form.attr("action");
        self.refreshContent(true);
      };

      this.changeContent = function () {
        var filter = jQuery(this);
        var otherMainFilter = self.mainFilters.not(filter);
        otherMainFilter.prop("checked", false);
        self.refreshCustomFormElems(otherMainFilter);

        if (filter.prop("checked")) {
          self.filter = "mainFilter=" + filter.val();
          self.url = self.form.attr("action");
        } else {
          self.filter = "mainFilter=none";
          self.url = self.form.data("all-items-url");
        }

        self.refreshContent(true);
      };

      this.onSubfilterChange = function () {
        var select = jQuery(this);
        self.createMark(select);
        self.refreshCustomFormElems(select);
        self.filter = self.form.serialize();
        self.url = self.form.data("content-url");
        self.refreshContent();
      };

      this.onRemoveMark = function (e) {
        e.preventDefault();
        var target = jQuery(e.target);
        var mark = jQuery(this);
        var elem = mark.data("elem");
        var tagName = elem.prop("tagName");
        var state = false;

        if (!target.closest(".js-btn-remove-mark").length) {
          return;
        }

        if (tagName === "SELECT") {
          elem.prop("selectedIndex", 0);
          mark.remove();
          self.filter = self.form.serialize();
          self.url = self.form.data("content-url");
        } else if (tagName === "INPUT") {
          elem.prop("checked", false);
          self.filter = "mainFilter=none";
          self.url = self.form.data("all-items-url");
          state = true;
        }

        self.refreshCustomFormElems(elem);
        self.refreshContent(state);
      };

      this.holder.on("click", this.options.btnsFiltering, function (e) {
        e.preventDefault();
        var link = jQuery(this);
        var option = $("#" + link.data("filter"));

        option.trigger("click");
      });

      this.form.on("submit", this.onFormSubmit);
      this.mainFilters.on("change", this.changeContent);
      this.holder.on("change", this.options.subFilter, this.onSubfilterChange);
      this.holder.on("click", this.options.elemFilterMark, this.onRemoveMark);
    },
    removeContent: function (noAmim, callback, clearAllContainers) {
      var self = this;
      this.holder.css({
        height: this.holder.outerHeight(true),
      });

      this.targetBlock.animate(
        {
          opacity: 0,
        },
        noAmim ? 0 : this.options.animDuration,
        function () {
          self.targetBlock.html("");
          if (typeof callback === "function") {
            self.loadContent(noAmim);
          }
        }
      );

      if (clearAllContainers) {
        this.filtersTargetBlock.css({
          height: this.filtersTargetBlock.outerHeight(true),
        });
        this.filtersTargetBlock.animate(
          {
            opacity: 0,
          },
          noAmim ? 0 : this.options.animDuration,
          function () {
            self.filtersTargetBlock.html("");
          }
        );
      }
    },
    loadContent: function (noAmim) {
      var self = this;
      this.loading = true;
      this.holder.addClass(this.options.loadingClass);
      if (this.ajaxRequest) {
        this.ajaxRequest.abort();
      }

      this.ajaxRequest = $.ajax({
        url: this.url,
        data: this.filter,
        type: "get",
        dataType: "text",
        success: function (data) {
          var newContent = jQuery("<div>", {
            html: data,
          });
          var newItems = newContent
            .find(self.options.loadItemsContainer)
            .css({
              opacity: 0,
            })
            .appendTo(self.targetBlock);
          var newFilters = null;

          if (newContent.find(self.options.loadFiltersContainer).length) {
            newFilters = newContent
              .find(self.options.loadFiltersContainer)
              .css({
                opacity: 0,
              })
              .appendTo(self.filtersTargetBlock);
          }

          setTimeout(function () {
            var newImages = newContent.find("img");
            var newImagesCount = newImages.length;
            var loadedCount = 0;
            if (newImagesCount) {
              newImages.each(function () {
                var image = jQuery(this);
                var img = new Image();
                img.onload = function () {
                  loadedCount++;
                  if (loadedCount == newImagesCount)
                    loadComplete(newItems, newFilters);
                };
                img.onerror = function () {
                  loadedCount++;
                  if (loadedCount == newImagesCount)
                    loadComplete(newItems, newFilters);
                };
                img.src = image.attr("src");
              });
            } else {
              loadComplete(newItems, newFilters);
            }
          }, 50);
        },
      });

      function loadComplete(newItems, newFilters) {
        if (newItems) {
          newItems
            .add(self.targetBlock)
            .add(self.filtersTargetBlock)
            .animate(
              {
                opacity: 1,
              },
              noAmim ? 0 : self.options.animDuration,
              function () {
                self.holder.css({
                  height: "",
                });
                self.filtersTargetBlock.css({
                  height: "",
                });
                newItems
                  .add(self.targetBlock)
                  .add(self.filtersTargetBlock)
                  .css({
                    opacity: "",
                  });
              }
            );
          self.loading = false;
        }

        if (newFilters) {
          newFilters.animate(
            {
              opacity: 1,
            },
            noAmim ? 0 : self.options.animDuration,
            function () {
              newFilters.css({
                opacity: "",
              });
            }
          );
          self.loading = false;
          self.createFiltersMarks(newFilters);
          self.url = self.form.data("content-url");
          self.filter = self.form.serialize();
          self.loadContent();
          self.searchInput.val("");
        }

        if (window.jcf) jcf.replaceAll();
        self.holder.removeClass(self.options.loadingClass);
      }
    },
    createMark: function (elem) {
      var tagName = elem.prop("tagName");
      if (tagName === "SELECT") {
        if (elem.prop("selectedIndex")) {
          if (elem.data("selected-mark")) {
            elem.data("selected-mark").remove();
          }
          this.newMark(elem);
        }
      } else if (tagName === "INPUT") {
        if (elem.prop("checked")) {
          this.newMark(elem, true);
        }
      }
    },
    newMark: function (elem, isInput) {
      var newMark = jQuery(this.options.filterMarkTmp);
      var text;
      elem.data("selected-mark", newMark);
      newMark.data("elem", elem);

      if (isInput) {
        text = jQuery("[for=" + elem.attr("id") + "]").text();
      } else {
        text = elem.find("option:selected").text();
      }
      if (
        typeof this.marksHolder != "undefined" ||
        this.marksHolder == "undefined" ||
        !undefined
      ) {
        this.marksHolder = jQuery(".js-filters-marks-container");
      }
      newMark.find(this.options.markText).text(text);
      newMark.appendTo(this.marksHolder);
    },
    createFiltersMarks: function (holder) {
      var self = this;
      this.marksHolder = this.holder.find(this.options.filtersMarksContainer);
      this.mainFilters.each(function () {
        var filter = jQuery(this);
        self.createMark(filter);
      });
      holder.find(this.options.subFilter).each(function () {
        var subFilter = jQuery(this);
        self.createMark(subFilter);
      });
    },
    makeCallback: function (name) {
      if (typeof this.options[name] === "function") {
        var args = Array.prototype.slice.call(arguments);
        args.shift();
        this.options[name].apply(this, args);
      }
    },
  };

  // jquery plugin
  $.fn.ajaxFilter = function (opt) {
    return this.each(function () {
      $(this).data(
        "AjaxFilter",
        new AjaxFilter(
          $.extend(opt, {
            holder: this,
          })
        )
      );
    });
  };
})(jQuery);

// custom map init
function CustomMap(opt) {
  this.options = jQuery.extend(
    true,
    {
      holder: null,
      map: ".map-canvas",
      locationHolder: ".locations",
      startCooords: [-33.512065, 143.125073],
      templateLocationsID: "new_location",
      mapOptions: {
        zoomControl: true,
        disableDefaultUI: true,
        maxZoom: 12,
        zoom: 6,
        //minZoom: 2
      },
    },
    opt
  );
  this.init();
}
CustomMap.prototype = {
  init: function () {
    if (this.options.holder) {
      this.findElements();
      this.createMap();
      this.attachEvents();
      this.makeCallback("onInit", this);
    }
  },
  findElements: function () {
    this.holder = jQuery(this.options.holder);
    this.map = this.holder.find(this.options.map);
    this.locationHolder = this.holder.find(this.options.locationHolder);
  },
  createMap: function () {
    var self = this;
    this.mapOptions = jQuery.extend({}, this.options.mapOptions);
    this.mapOptions.center = new google.maps.LatLng(
      this.options.startCooords[0],
      this.options.startCooords[1]
    );
    this.mapCanvas = new google.maps.Map(this.map[0], this.mapOptions);

    this.loadFile(
      this.map.attr("data-markers"),
      function (data) {
        self.markers = data.markers;
        self.prepareMarkers();

        self.loadFile(
          self.map.attr("data-states"),
          function (data) {
            self.states = data;
            self.createStatesPolygons();
          },
          "xml"
        );
      },
      "json"
    );
  },
  attachEvents: function () {
    var self = this;

    this.resizeHandler = function () {
      if (self.bounds) {
        self.mapCanvas.fitBounds(self.bounds);
      }
    };

    jQuery(window).on("resize orientationchange", this.resizeHandler);
  },
  createStatesPolygons: function () {
    var states = jQuery(this.states).find("state");
    this.polys = [];
    this.labels = [];

    for (var a = 0; a < states.length; a++) {
      // get any state attributes
      var label = states[a].getAttribute("name");
      var colour = states[a].getAttribute("colour");
      // read each point on that line
      var points = states[a].getElementsByTagName("point");
      var pts = [];
      for (var i = 0; i < points.length; i++) {
        pts[i] = new google.maps.LatLng(
          parseFloat(points[i].getAttribute("lat")),
          parseFloat(points[i].getAttribute("lng"))
        );
      }
      var poly = new google.maps.Polygon({
        paths: pts,
        strokeColor: colour,
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: colour,
        fillOpacity: 0.1,
      });
      this.polys.push(poly);
      this.labels.push(label);
    }
    this.drowPolygons();
  },
  drowPolygons: function () {
    for (var i = 0; i < this.acitveStates.length; i++) {
      for (var j = 0; j < this.labels.length; j++) {
        if (this.labels[j] === this.acitveStates[i]) {
          this.polys[j].setMap(this.mapCanvas);
        }
      }
    }
  },
  loadFile: function (url, complete, type) {
    jQuery.get(
      url,
      function (data) {
        complete(data);
      },
      type
    );
  },
  prepareMarkers: function () {
    var self = this;
    var activeStatesNumber = -1;
    this.bounds = null;
    this.acitveStates = [];
    this.states = {};
    jQuery.each(this.markers, function (key, marker) {
      var locationsElem = jQuery(
        tmpl(self.options.templateLocationsID, marker)
      );
      var markerCooeds = new google.maps.LatLng(
        marker.coords[0],
        marker.coords[1]
      );
      var newMarker = new google.maps.Marker({
        position: markerCooeds,
        icon: "/wp-content/themes/parkhillsmithcoo/images/marker_image.jpg",
        url: "http://maps.google.com/?q=" + marker.address,
        map: self.mapCanvas,
      });

      if (!self.states[marker.state]) {
        self.states[marker.state] = [];
      }
      self.states[marker.state].push(marker);

      if (!self.bounds) {
        self.bounds = new google.maps.LatLngBounds();
      }
      self.bounds.extend(markerCooeds);

      self.locationHolder.append(locationsElem);
      google.maps.event.addListener(newMarker, "click", function () {
        window.open(newMarker.url);
      });
    });

    for (key in this.states) {
      if (this.states[key].length > activeStatesNumber) {
        this.acitveStates = [];
        this.acitveStates.push(key);
        activeStatesNumber = this.states[key].length;
      } else if (this.states[key].length === activeStatesNumber) {
        this.acitveStates.push(key);
      }
    }

    if (self.bounds) {
      self.mapCanvas.fitBounds(self.bounds);
    }
    this.mapCanvas.setZoom(5);
  },
  makeCallback: function (name) {
    if (typeof this.options[name] === "function") {
      var args = Array.prototype.slice.call(arguments);
      args.shift();
      this.options[name].apply(this, args);
    }
  },
};

(function () {
  var cache = {};
  this.tmpl = function tmpl(str, data) {
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str)
      ? (cache[str] =
          cache[str] || tmpl(document.getElementById(str).innerHTML))
      : // Generate a reusable function that will serve as a template
        // generator (and which will be cached).
        new Function(
          "obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +
            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +
            // Convert the template into pure JavaScript
            str
              .replace(/[\r\t\n]/g, " ")
              .split("<%")
              .join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t")
              .join("');")
              .split("%>")
              .join("p.push('")
              .split("\r")
              .join("\\'") +
            "');}return p.join('');"
        );

    // Provide some basic currying to the user
    return data ? fn(data) : fn;
  };
})();
