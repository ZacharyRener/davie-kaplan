import React, { Component } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import LoadingBar from "./../_loadingBar";

function inViewport(el) {
  var r, html;
  if (!el || 1 !== el.nodeType) {
    return false;
  }
  html = document.documentElement;
  r = el.getBoundingClientRect();

  return (
    !!r &&
    r.bottom >= 0 &&
    r.right >= 0 &&
    r.top <= html.clientHeight &&
    r.left <= html.clientWidth
  );
}

interface AppProps {}

interface AppState {
  services: any;
  title: string;
  excerpt: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  sectionCount: any;
  automate: boolean;
  interval: any;
}

export default class SpireServices extends Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      services: [],
      title: "",
      excerpt: "",
      buttonText: "",
      buttonLink: "",
      image: "",
      sectionCount: 0,
      automate: true,
      interval: 2,
    };

    this.loadServices = this.loadServices.bind(this);
    this.handleSectionClick = this.handleSectionClick.bind(this);
    this.automateServiceSlider = this.automateServiceSlider.bind(this);
    this.loadServices();
    this.automateServiceSlider();
  }

  automateServiceSlider() {
    console.log("in automateServiceSlider");
    window.addEventListener("scroll", () => {
      if (inViewport(document.querySelector("#services-root"))) {
        this.setState({ automate: true });
      }
    });

    // every 5 seconds, move onto the next section
    //let nextInterval = 2;
    setInterval(() => {
      console.log("in interval");
      console.log("starting interval:", this.state.interval);
      if (this.state.interval == 5) {
        this.setState({ interval: 1 });
        console.log("interval reset to: ", this.state.interval);
      }
      if (this.state.automate) {
        console.log("automate true");
        // @ts-ignore
        jQuery(
          `#reactive-services .section-header:nth-child(${this.state.interval})`
        ).click();

        console.log(
          `clicked: #reactive-services .section-header:nth-child(${this.state.interval})`
        );

        this.setState({ interval: this.state.interval + 1 });
        console.log("new interval:", this.state.interval);

        if (this.state.interval == 5) {
          this.setState({ interval: 1 });
          console.log("interval reset to: ", this.state.interval);
        }
      }
    }, 5000);
    //
  }

  loadServices() {
    fetch("/wp-json/wp/v2/pages/207")
      .then((response) => response.json())
      .then((data) => {
        let count = 0;
        data.acf.services.forEach((service) => {
          service["isActive"] = count == 0 ? true : false;
          service["count"] = count + 1;
          if (count == 0) {
            this.setState({ title: service.title });
            this.setState({ excerpt: service.excerpt });
            this.setState({ buttonText: service.button_text });
            this.setState({ buttonLink: service.button_link });
            this.setState({ image: service.image });
          }

          this.setState({
            services: [...this.state.services, service],
          });
          count++;
        });
      });
  }

  handleSectionClick(service: any) {
    this.setState({ title: service.title });
    this.setState({ excerpt: service.excerpt });
    this.setState({ buttonText: service.button_text });
    this.setState({ buttonLink: service.button_link });
    this.setState({ image: service.image });

    let servicesClone = [...this.state.services];
    servicesClone.forEach((serviceClone) => {
      serviceClone.isActive = false;
    });

    service.isActive = true;
    servicesClone[service.count - 1] = service;
    this.setState({ services: servicesClone });
  }

  render() {
    return (
      <section id="reactive-services">
        <div className="top-section">
          <div className="container d-flex">
            {this.state.services.map((service, id) => {
              //this.setState({sectionCount: this.state.sectionCount + 1})
              const activeClass = service.isActive ? "active" : "";

              return (
                <div
                  className={"section-header " + activeClass}
                  onMouseEnter={() => {
                    this.handleSectionClick(service);
                    this.setState({ automate: false });
                    this.setState({ interval: id + 2 });
                  }}
                  onMouseLeave={() => {
                    this.setState({ automate: true });
                  }}
                  onClick={() => this.handleSectionClick(service)}
                  key={id}
                >
                  <div className="wrapper d-flex">
                    <div>0{service.count}.</div>
                    <div>{service.title}</div>
                  </div>
                  <div className={"loading-bar-wrapper section-" + id}>
                    <LoadingBar cap={"5s"} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bottom-section d-flex">
          <div className="left-side">
            <p className="title mobileOnly">{this.state.title}</p>
            <img src={this.state.image} />
          </div>
          <div className="right-side">
            <p className="title desktopOnly">{this.state.title}</p>
            <p className="excerpt">{this.state.excerpt}</p>
            <a className="button arrow red" href={this.state.buttonLink}>
              {this.state.buttonText}
            </a>
          </div>
        </div>
      </section>
    );
  }
}
