export default class SingleLeadership {
  constructor() {
    this.enableFunFactSlider();
  }

  enableFunFactSlider() {
    const section = document.querySelector(".fun-fact-slick");
    if (section != null) {
      jQuery(".fun-fact-slick").slick();
    }
  }
}
